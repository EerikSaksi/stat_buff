import React, { useState, useEffect, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Text, StyleSheet, Animated, ImageBackground, View, Switch, Linking, } from "react-native";
import { generateShadow } from "react-native-shadow-generator";
import { Button, Input } from "react-native-elements";
import globalStyles from "../style/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    }
    signedEthicsSheet(username: $username){
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
    fontSize: 18,
  },
  image: {
    flex: 1,
    position: "relative",
    resizeMode: "cover",
  },
  imageBackground: {
    zIndex: -1,
  },
  opacityContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.8,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const AnimatedInput = Animated.createAnimatedComponent(Input);

const CreateUser: React.FC<{ refetchUser: () => void }> = ({ refetchUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const greenPixelValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const greenPixelValuePassword = useRef<Animated.Value>(new Animated.Value(0)).current;
  const ref = useRef<undefined | Input>();

  //set to user if the user tried to create user but needed to sign the ethics form
  const triedToCreateUser = useRef(false)
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
  const [signIn] = useMutation(FETCH_TOKEN, {
    variables: { inputPassword: password, inputUsername: username },
    //if succesful cache the data
    onCompleted: async (serverData) => {
      console.log(
        `await AsyncStorage.setItem(
          'jwt_token',
          ${serverData.authenticate.jwtToken},
        );`
      );
      try {
        await AsyncStorage.setItem("jwt_token", serverData.authenticate.jwtToken);
      } catch (error) {
        console.log(error);
      }
      refetchUser();
    },
  });

  //check if username exists
  const { data: userData, loading: userLoading, refetch } = useQuery(USER, {
    variables: { username },
    skip: username === "",
    onCompleted: () => {
      //if this refetch was triggered by the user refocusing on the app from the ethics form, then create the user
      if (triedToCreateUser.current){
        createUser()
      }
    },
    notifyOnNetworkStatusChange: true
  });
  useEffect(() => {
    Linking.addEventListener('url', () => {
      console.log('refetch')
      refetch()
    }) 
  }, [])

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
      //user has not signed ethics sheet
      if (!userData.signedEthicsSheetByUsername){
        const url = `http://localhost:4000/${username}`
        if (Linking.canOpenURL(url)){
          Linking.openURL(url)
          triedToCreateUser.current = true
        }
        else {
          alert("It seems like you don't have a usable browser.") 
        }
      }
      createUser();
    } else if (signingIn) {
      signIn();
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

  return (
    <ImageBackground imageStyle={{ zIndex: -1 }} blurRadius={ 1.5} style={styles.image} source={require("../assets/squat.jpeg")}>
      <View style={globalStyles.container}>
        <View style={styles.opacityContainer}>
          <View style={styles.container}>
            <Text style={styles.text}>Sign up</Text>
          </View>
          <View style={styles.container}>
            <Switch
              style={{ opacity: 0.8 }}
              value={signingIn}
              onValueChange={(v) => setSigningIn(v)}
              trackColor={{ false: "white", true: "white" }}
              thumbColor="royalblue"
              ios_backgroundColor={"white"}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Sign in</Text>
          </View>
        </View>
        <Text style={styles.text}>{signingIn ? "" : error}</Text>
        <AnimatedInput style={{ backgroundColor, opacity: 0.8 }} ref={ref} value={username} placeholder="Username" onChangeText={(e) => setUsername(e)} autoCapitalize={"none"} />
        <AnimatedInput
          style={{ backgroundColor: passwordBackgroundColor, opacity: 0.8 }}
          value={password}
          placeholder="Password"
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
          autoCapitalize={"none"}
        />
        <Button title={`Sign ${signingIn ? "in" : "up"}`} disabled={(error.length !== 0 && !signingIn) || username.length === 0 || password.length === 0} onPress={submit} />
      </View>
    </ImageBackground>
  );
};
export default CreateUser;
