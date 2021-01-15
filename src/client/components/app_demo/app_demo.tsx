import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, FlatList } from "react-native";
import AttackingCharacters from "./attacking_characters";
import StrongerCharacter from "./stronger_character";
import CreateUser from "../create_user";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  view: {
    width: width,
  },
});

const AppDemo: React.FC<{ refetchUser: () => void; googleID: string | undefined; setGoogleID: (arg: string | undefined) => void }> = ({ refetchUser, googleID, setGoogleID }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  //return (
  //  <View style={styles.view}>
  //    <CreateUser refetchUser={refetchUser} googleID={googleID} setGoogleID={setGoogleID} inView={width * 1.8 <= scrollOffset} />
  //  </View>
  //);
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => setScrollOffset(nativeEvent.contentOffset.x)}
      horizontal={true}
      decelerationRate={0}
      snapToInterval={width}
      snapToAlignment={"center"}
      persistentScrollbar
    >
      <View style={styles.view}>
        <StrongerCharacter inView={scrollOffset < width} />
      </View>
      <View style={styles.view}>
        <AttackingCharacters inView={width * 0.05 <= scrollOffset && scrollOffset <= width * 1.95} />
      </View>
      <View style={styles.view}>
        <CreateUser refetchUser={refetchUser} googleID={googleID} setGoogleID={setGoogleID} inView={width * 1.8 <= scrollOffset} />
      </View>
    </ScrollView>
  );
};
export default AppDemo;
