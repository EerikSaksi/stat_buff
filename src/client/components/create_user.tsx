import React, { useState, useEffect, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Text, StyleSheet, Animated, ImageBackground } from "react-native";
import CenteredView from "../util_components/centered_view";
import { generateShadow } from "react-native-shadow-generator";
import { Button, Input, SocialIcon } from "react-native-elements";
import { getCurrentUser, signInAsync } from "expo-google-sign-in";
import CheckBoxes from "./check_boxes";
const CREATE_USER = gql`
  mutation createuser($username: String!, $idToken: String!) {
    createUser(username: $username, idToken: $idToken)
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
  socialIcon: {
    width: "50%",
    ...generateShadow(24),
  },
  imageBackground: {
    zIndex: -1,
  },
});

const AnimatedInput = Animated.createAnimatedComponent(Input);

const CreateUser: React.FC<{ refetchUser: () => void; googleLoggedIn: boolean; setGoogleLoggedIn: (arg: boolean) => void }> = ({ refetchUser, googleLoggedIn, setGoogleLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [allChecksFilled, setAllChecksFilled] = useState(false);
  const greenPixelValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [error, setError] = useState("No error yet");
  const ref = useRef<Input | null>();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref, googleLoggedIn]);

  //if succesfully created then user data exists for the current google user
  const [createUser] = useMutation(CREATE_USER, {
    variables: { username, idToken: getCurrentUser()?.auth?.idToken },
    onCompleted: (data) => {
      if (data.createUser) {
        refetchUser();
      }
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
    if (error.length === 0 && username.length !== 0) {
      createUser();
    }
  };
  useEffect(() => {
    //animate to red green or white depending on the current
    if (!username.length) {
      Animated.timing(greenPixelValue, { toValue: 0, useNativeDriver: false }).start();
    } else if (error.length !== 0) {
      Animated.timing(greenPixelValue, { toValue: 2, useNativeDriver: false }).start();
    } else {
      Animated.timing(greenPixelValue, { toValue: 1, useNativeDriver: false }).start();
    }
  }, [error, username]);

  const backgroundColor =
    username.length === 0
      ? "white"
      : greenPixelValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: ["white", "lime", "red"],
        });

  const content = allChecksFilled ? (
    googleLoggedIn ? (
      <CenteredView>
        <Text style={styles.text}>{error}</Text>
        <AnimatedInput onSubmitEditing={submit} style={{ backgroundColor, opacity: 0.8 }} ref={ref} value={username} placeholder="Enter username" onChangeText={(e) => setUsername(e)} />
        <Button title="Submit" disabled={error.length !== 0 || username.length === 0} onPress={submit} />
      </CenteredView>
    ) : (
      <CenteredView>
        <SocialIcon
          type="google"
          title={"Sign in with Google"}
          button
          style={styles.socialIcon}
          onPress={async () => {
            //try sign in, on success
            await signInAsync()
              .then((result) => {
                if (result.type === "success") {
                  setGoogleLoggedIn(true);
                  refetchUser();
                }
              })
              .catch((error) => alert(error));
          }}
        />
      </CenteredView>
    )
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
