import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Overlay } from "react-native-elements";
import { generateShadow } from "react-native-shadow-generator";
const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  arrow: {
    color: "black",
    fontSize: 40,
    left: "2%",
    position: "absolute",
    top: 0,
    zIndex: 1
  },
  image: {
    flex: 1,
    position: "relative",
    resizeMode: "cover",
  },
});
const CustomModal: React.FC<{ visible: boolean; setVisible: (bool: boolean) => void; children: React.ReactNode; style?: ViewStyle }> = ({ visible, setVisible, children, style }) => {
  return (
    <Overlay isVisible={visible} onDismiss={() => setVisible(false)} onBackdropPress={() => setVisible(false)}>
      <React.Fragment>
        <Ionicons style={styles.arrow} onPress={() => setVisible(false)} name="ios-arrow-round-back" />
        {children}
      </React.Fragment>
    </Overlay>
  );
};
export default CustomModal;
