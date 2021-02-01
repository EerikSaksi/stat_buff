import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, } from "react-native";
import { Overlay } from "react-native-elements";
const styles = StyleSheet.create({
  arrow: {
    color: "black",
    fontSize: 38,
    left: "2%",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
});
const CustomModal: React.FC<{ visible: boolean; setVisible: (bool: boolean) => void; children: React.ReactNode; }> = ({ visible, setVisible, children}) => {
  return (
    <Overlay  isVisible={visible} onDismiss={() => setVisible(false)} onBackdropPress={() => setVisible(false)}>
      <React.Fragment>
        <Ionicons style={styles.arrow} onPress={() => setVisible(false)} name="arrow-back-sharp" />
        {children}
      </React.Fragment>
    </Overlay>
  );
};
export default CustomModal;
