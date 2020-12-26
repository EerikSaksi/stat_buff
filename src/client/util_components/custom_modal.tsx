import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Modal, View, ViewStyle } from "react-native";
import { generateShadow } from "react-native-shadow-generator";
const styles = StyleSheet.create({
  innerContainer: {
    margin: "10%",
    marginTop: "30%",
    marginBottom: "30%",
    flex: 1,
    backgroundColor: "white",
    ...generateShadow(24),
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    color: "black",
    fontSize: 40,
    left: "2%",
    position: "absolute",
    top: 0,
  },
});
const CustomModal: React.FC<{ visible: boolean; setVisible: (bool: boolean) => void; children: React.ReactNode; style?: ViewStyle }> = ({ visible, setVisible, children, style }) => {
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"} transparent={true}>
      <View style={{ ...styles.innerContainer, ...style }}>
        <Ionicons style={styles.arrow} onPress={() => setVisible(false)} name="ios-arrow-round-back" />
        {children}
      </View>
    </Modal>
  );
};
export default CustomModal;
