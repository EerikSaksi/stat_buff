import React, { useState } from "react";
import { Text, Switch, View, Modal, TextInput, StyleSheet, SafeAreaView } from "react-native";
import ExerciseSearch from "./exercise_modal/exercise_search";
import { Ionicons } from "@expo/vector-icons";
const styles = StyleSheet.create({
  paddingWrap: { paddingTop: "10%", flex: 1 },
  arrow: { color: "black", fontSize: 40, position: "absolute", top: "2%" },
  text: { marginRight: "2%" },
  listContainer: { flex: 10, justifyContent: "center", alignItems: "center" },
  safeArea: { height: "100%" },
});
const ExerciseModal: React.FC<{ visible: boolean; setVisible: (b: boolean) => void; username: string; refetchParent: () => void }> = ({ visible, setVisible, username, refetchParent }) => {
  const [exerciseInput, setExerciseInput] = useState("");
  const [onlyShowTracked, setOnlyShowTracked] = useState(false);
  const [onlyBodyweight, setOnlyBodyweight] = useState(false);
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"}>
      <SafeAreaView style = { styles.safeArea }>
        <View style={styles.paddingWrap}>
          <Ionicons onPress={() => setVisible(false)} name="arrow-back-sharp" style={styles.arrow} />
          <View >
            <View >
              <View >
                <Text style={styles.text}>Only tracked exercises</Text>
                <Switch value={onlyShowTracked} onValueChange={(v) => setOnlyShowTracked(v)} />
              </View>
              <View >
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
