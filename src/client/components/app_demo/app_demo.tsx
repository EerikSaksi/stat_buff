import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import AttackingCharacters from "./attacking_characters";
import StrongerCharacter from "./stronger_character";
import CreateUser from '../create_user'
import {useEffect} from "react";
import {gql, useLazyQuery} from "@apollo/client";
import {initAsync, GoogleSignInAuthResult, signInAsync, getCurrentUserAsync, isSignedInAsync} from 'expo-google-sign-in'
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  view: {
    width: width,
  },
});

const USERNAME = gql`query{
  username
}`
const AppDemo: React.FC<{refetchUser: () => void}> = ({refetchUser}) => {
  const [googleID, setGoogleID] = useState<string | undefined>('wowa')

  //when starting try check if user logged in and fetch their token
  useEffect(() => {
    const tryGetToken = async () => {
      await initAsync()
      if (await isSignedInAsync()) {
        const result = await getCurrentUserAsync()
        fetchUsername({variables: {googleID: result?.uid}})
      }
    }
    tryGetToken()
  }, [])

  const [fetchUsername, {data}] = useLazyQuery(USERNAME, {
    fetchPolicy: 'network-only'
  })
  const [scrollOffset, setScrollOffset] = useState(0);
  return (
    <ScrollView onScroll={({ nativeEvent }) => setScrollOffset(nativeEvent.contentOffset.x)} horizontal={true} decelerationRate={0} snapToInterval={width} snapToAlignment={"center"}>
      <View style={styles.view}>
        <StrongerCharacter inView={scrollOffset < width} />
      </View>
      <View style={styles.view}>
        <AttackingCharacters inView={width * 0.5 <= scrollOffset} />
      </View>
      <View style={styles.view}>
        <CreateUser refetchUser = {refetchUser}/>
      </View>
    </ScrollView>
  );
};
export default AppDemo;
