import React, { useState, useEffect, useRef, Fragment } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Text, StyleSheet, Animated, ImageBackground, View, Switch } from "react-native";
import { generateShadow } from "react-native-shadow-generator";
import { Button, Input } from "react-native-elements";
import CheckBoxes from "./check_boxes";
import globalStyles from "../style/global";
const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password }) {
      clientMutationId
    }
  }
`;
const FETCH_TOKEN = gql`
  mutation($inputUsername: String!, $inputPassword: String!) {
    authenticate(input: { inputUsername: $inputUsername, inputPassword: $inputPassword }) {
      jwtToken
    }
  }
`;
const USER = gql`
  query user($username: String!) {
    user(username: $username) {
      nodeId
      username
    }
  }
`;

var styles = StyleSheet.create({
  input: {
    width: "50%",
    textAlign: "center",
    marginBottom: "2%",
    ...generateShadow(24),
  },
  text: {
    color: "white",
    marginBottom: "2%",
  },
  image: {
    flex: 1,
    position: "relative",
    resizeMode: "cover",
  },
  imageBackground: {
    zIndex: -1,
  },
});

const AnimatedInput = Animated.createAnimatedComponent(Input);

const CreateUser: React.FC<{ refetchUser: () => void }> = ({ refetchUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [allChecksFilled, setAllChecksFilled] = useState(false);
  const greenPixelValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const greenPixelValuePassword = useRef<Animated.Value>(new Animated.Value(0)).current;
  const ref = useRef<undefined | Input>();
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  //if succesfully created then user data exists for the current google user
  const [createUser] = useMutation(CREATE_USER, {
    variables: { username, password },
    onCompleted: (data) => {
      //if succesful, authenticate the user
      if (data.createUser) {
        signIn();
      }
    },
  });
  const [signIn, { client }] = useMutation(FETCH_TOKEN, {
    variables: { inputPassword: password, inputUsername: username },
    //if succesful cache the data
    onCompleted: (serverData) => {
      client.writeQuery({
        query: gql`
          query {
            token
          }
        `,
        data: {
          token: serverData.authenticate.jwtToken,
        },
      });
      refetchUser();
    },
  });

  //check if username exists
  const { data: userData, loading: userLoading } = useQuery(USER, {
    variables: { username },
    skip: username === "",
  });

  useEffect(() => {
    //contains disallowed characters
    if (username.length && username.match(/^[a-zA-Z0-9._]+$/) === null) {
      setError("Only characters, numbers and _ are allowed.");
    } else if (username.length >= 20) {
      setError("Username too long");
    }
    //not checking if userData
    else if (!userLoading && userData && userData.user) {
      setError("Username taken");
    } else {
      setError("");
    }
  }, [username, userData]);

  const submit = async () => {
    if (!signingIn && error.length === 0 && username.length !== 0) {
      createUser();
    }
    else if (signingIn){
      signIn()
    }
  };
  useEffect(() => {
    //animate to red green or white depending on the current
    if (!username.length) {
      Animated.timing(greenPixelValue, { toValue: 0, useNativeDriver: false }).start();
    } else if (error.length !== 0 && !signingIn) {
      Animated.timing(greenPixelValue, { toValue: 2, useNativeDriver: false }).start();
    } else {
      Animated.timing(greenPixelValue, { toValue: 1, useNativeDriver: false }).start();
    }
  }, [error, username, signingIn]);
  useEffect(() => {
    if (password.length) {
      Animated.timing(greenPixelValuePassword, { toValue: 1, useNativeDriver: false }).start();
    } else {
      Animated.timing(greenPixelValuePassword, { toValue: 0, useNativeDriver: false }).start();
    }
  }, [password]);

  const backgroundColor =
    username.length === 0
      ? "white"
      : greenPixelValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: ["white", "lime", "red"],
        });

  const passwordBackgroundColor =
    password.length === 0
      ? "white"
      : greenPixelValuePassword.interpolate({
          inputRange: [0, 1],
          outputRange: ["white", "lime"],
        });

  const content = allChecksFilled ? (
    <View style={globalStyles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.text}>Sign up</Text>
        </View>
        <Switch style={{ opacity: 0.8 }} value={signingIn} onValueChange={(v) => setSigningIn(v)} trackColor={{ false: "white", true: "white" }} thumbColor="royalblue" />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.text}>Sign in</Text>
        </View>
      </View>
      <Text style={styles.text}>{error}</Text>
      <AnimatedInput style={{ backgroundColor, opacity: 0.8 }} ref={ref} value={username} placeholder="Username" onChangeText={(e) => setUsername(e)} />
      <AnimatedInput style={{ backgroundColor: passwordBackgroundColor, opacity: 0.8 }} value={password} placeholder="Password" onChangeText={(e) => setPassword(e)} secureTextEntry={true} />
      <Button title={`Sign ${signingIn? "in" : "up"}`} disabled={(error.length !== 0 && !signingIn) || username.length === 0 || password.length === 0} onPress={submit} />
    </View>
  ) : (
    <CheckBoxes setAllChecksFilled={setAllChecksFilled} />
  );
  return (
    <ImageBackground imageStyle={{ zIndex: -1 }} blurRadius={allChecksFilled ? 1.5 : 3} style={styles.image} source={require("../assets/squat.jpeg")}>
      {content}
    </ImageBackground>
  );
};
export default CreateUser;
