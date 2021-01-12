import React, { useState } from "react";
import { Text, Switch, View, Modal, TextInput} from "react-native";
import ExerciseSearch from "./exercise_search";
import { Ionicons } from "@expo/vector-icons";
const ExerciseModal: React.FC<{ visible: boolean; setVisible: (b: boolean) => void; username: string; refetchParent: () => void }> = ({ visible, setVisible, username, refetchParent }) => {
  const [exerciseInput, setExerciseInput] = useState("");
  const [onlyShowTracked, setOnlyShowTracked] = useState(false);
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"}>
      <Ionicons onPress={() => setVisible(false)} name="arrow-back-sharp" style={{ color: "black", fontSize: 40, left: "2%", position: "absolute" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <View style={{ flex: 2, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginRight: "2%" }}>Only show exercises you've tracked</Text>
          <Switch value={onlyShowTracked} onValueChange={(v) => setOnlyShowTracked(v)} />
        </View>
      </View>
      <View style={{ flex: 10, justifyContent: "center", alignItems: "center" }}>
        <View>
          <TextInput value={exerciseInput} onChangeText={(t) => setExerciseInput(t)} placeholder="Search for exercises" />
        </View>
        <ExerciseSearch refetchParent={refetchParent} input={exerciseInput} username={username} onlyShowTracked={onlyShowTracked} />
      </View>
    </Modal>
  );
};
export default ExerciseModal;
