import React, { useState } from "react";
import { Text, Switch, View, Modal, TextInput, StyleSheet } from "react-native";
import ExerciseSearch from "./exercise_search";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../../style/global";
import { SafeAreaView } from "react-native-safe-area-context";
const styles = StyleSheet.create({
  paddingWrap: { paddingTop: "5%", flex: 1 },
  arrow: { color: "black", fontSize: 40, left: 0, position: "absolute" },
  text: { marginRight: "2%" },
  listContainer: { flex: 10, justifyContent: "center", alignItems: "center" },
});
const ExerciseModal: React.FC<{ visible: boolean; setVisible: (b: boolean) => void; username: string; refetchParent: () => void }> = ({ visible, setVisible, username, refetchParent }) => {
  const [exerciseInput, setExerciseInput] = useState("");
  const [onlyShowTracked, setOnlyShowTracked] = useState(false);
  const [onlyBodyweight, setOnlyBodyweight] = useState(false);
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"}>
      <SafeAreaView>
        <Ionicons onPress={() => setVisible(false)} name="arrow-back-sharp" style={styles.arrow} />
        <View style={styles.paddingWrap}>
          <View style={globalStyles.row}>
            <View style={globalStyles.row}>
              <View style={globalStyles.container}>
                <Text style={styles.text}>Only tracked exercises</Text>
                <Switch value={onlyShowTracked} onValueChange={(v) => setOnlyShowTracked(v)} />
              </View>
              <View style={globalStyles.container}>
                <Text style={styles.text}>Only bodyweight</Text>
                <Switch value={onlyBodyweight} onValueChange={(v) => setOnlyBodyweight(v)} />
              </View>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View>
              <TextInput value={exerciseInput} onChangeText={(t) => setExerciseInput(t)} placeholder="Search for exercises" />
            </View>
            <ExerciseSearch refetchParent={refetchParent} input={exerciseInput} username={username} onlyShowTracked={onlyShowTracked} onlyBodyweight={onlyBodyweight} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default ExerciseModal;
