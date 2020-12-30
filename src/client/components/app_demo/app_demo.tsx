import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import AttackingCharacters from "./attacking_characters";
import StrongerCharacter from "./stronger_character";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  view: {
    width: width,
  },
});

const AppDemo: React.FC = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  return (
    <ScrollView onScroll={({ nativeEvent }) => setScrollOffset(nativeEvent.contentOffset.x)} horizontal={true} decelerationRate={0} snapToInterval={width} snapToAlignment={"center"}>
      <View style={styles.view}>
        <StrongerCharacter inView={scrollOffset < width} />
      </View>
      <View style={styles.view}>
        <AttackingCharacters inView={width * 0.5 <= scrollOffset} />
      </View>
    </ScrollView>
  );
};
export default AppDemo;
