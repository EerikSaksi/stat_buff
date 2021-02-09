import React, { useEffect, useState } from "react";
import {CheckBox} from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
const questions = [
  "I understand that this app is being used to investigate the effectiveness of collaborativeness in activity trackers",
  "I understand that I will be asked to conduct a survey in two or so weeks (if I have not withdrawn)",
  "I understand that exercise has inherent risks, and to mitigate this, I will conduct research from credible sources and/or consult a medical professional",
  "I consent to my data being used as a part of the study (including chat messages) and understand that I can request to delete my data and withdraw at any time, and ask any questions by emailing saksi.eerik@gmail.com",
  "I am over the age of 16",
];
const CheckBoxes: React.FC<{ setAllChecksFilled: (arg: boolean) => void }> = ({ setAllChecksFilled }) => {
  const [checks, setChecks] = useState([false, false, false, false, false]);

  //check all are filled
  useEffect(() => {
    if (checks.every((check) => check)) {
      setAllChecksFilled(true);
    }
  }, [checks]);
  return (
    <SafeAreaView style={styles.row}>
      {questions.map((question, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.text}>{question}</Text>
          <CheckBox
            checked={checks[index]}
            onPress={() =>
              setChecks(() => {
                var toReturn = [...checks];
                toReturn[index] = !toReturn[index];
                return toReturn;
              })
            }
          />
        </View>
      ))}
    </SafeAreaView>
  );
};
export default CheckBoxes;
