import React, { useState, useRef, Suspense } from "react";
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import AttackingCharacters from "./attacking_characters";
import CreateUser from "../create_user";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const StrongerCharacter = React.lazy(() => import("./stronger_character"));
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
const EmptyWidthView = () => <View style={styles.view} />;
const AppDemo: React.FC<{ refetchUser: () => void }> = ({ refetchUser }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={({ nativeEvent }) => setScrollOffset(nativeEvent.contentOffset.x)}
      horizontal={true}
      decelerationRate={0}
      snapToInterval={width}
      snapToAlignment={"center"}
      persistentScrollbar
    >
      <CreateUser refetchUser={refetchUser} />
    </ScrollView>
  );
};
export default AppDemo;
