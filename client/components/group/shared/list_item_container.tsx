import React from "react";
import { StyleSheet, View } from "react-native";
import { generateShadow } from "react-native-shadow-generator";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    ...generateShadow(10),
    margin: "2%",
  },
});
const ListItemContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
export default ListItemContainer;
