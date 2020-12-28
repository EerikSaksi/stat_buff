import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import AttackingCharacters from "./attacking_characters";
import StrongerCharacter from "./stronger_character";
import CreateUser from '../create_user'
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  view: {
    width: width,
  },
});

const AppDemo: React.FC<{refetchUser: () => void}> = ({refetchUser}) => {
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
