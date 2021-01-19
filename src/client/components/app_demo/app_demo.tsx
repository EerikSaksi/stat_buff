import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import AttackingCharacters from "./attacking_characters";
import StrongerCharacter from "./stronger_character";
import CreateUser from "../create_user";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  view: {
    width: width,
  },
  arrow: {
    position: "absolute",
    right: 0,
    top: "50%",
  },
});

const AppDemo: React.FC<{ refetchUser: () => void; googleLoggedIn: boolean; setGoogleLoggedIn: (arg: boolean) => void }> = ({ refetchUser, googleLoggedIn, setGoogleLoggedIn }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={({ nativeEvent }) => setScrollOffset(nativeEvent.contentOffset.x)}
      horizontal={true}
      snapToInterval={width}
      snapToAlignment={"center"}
      persistentScrollbar
    >
      <View style={styles.view}>
        <StrongerCharacter inView={scrollOffset < width} />
        <TouchableOpacity style={styles.arrow} onPress={() => scrollViewRef?.current?.scrollTo({ x: scrollOffset + width, animated: true })}>
          <Ionicons size={40} name="arrow-forward-sharp" />
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <AttackingCharacters inView={width * 0.05 <= scrollOffset && scrollOffset <= width * 1.95} />
        <TouchableOpacity style={styles.arrow} onPress={() => scrollViewRef?.current?.scrollTo({ x: scrollOffset + width, animated: true })}>
          <Ionicons size={40} name="arrow-forward-sharp" />
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <CreateUser refetchUser={refetchUser} googleLoggedIn={googleLoggedIn} setGoogleLoggedIn={setGoogleLoggedIn} inView={width * 1.8 <= scrollOffset} />
      </View>
    </ScrollView>
  );
};
export default AppDemo;
