import React from "react";
import { StyleSheet, Modal, View } from "react-native";
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
});
const CustomModal: React.FC<{ visible: boolean; setVisible: (boolean) => void; children: React.ReactNode }> = ({ visible, setVisible, children }) => {
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"} transparent={true}>
      <View style={styles.innerContainer}>
        {children}
      </View>
    </Modal>
  );
};
export default CustomModal;
