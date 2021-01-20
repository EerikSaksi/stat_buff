import React, { useEffect, useState } from "react";
import elements from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
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
  "I consent to my data being used as a part of the study, and that I can request to delete this data and withdraw from the study for any reason by contacting saksi.eerik@gmail.com",
  "I am over the age of 16",
  "I will consult a medical professional before making any changes in my exercise habits",
];
const CheckBoxes: React.FC<{ setAllChecksFilled: (arg: boolean) => void }> = ({ setAllChecksFilled }) => {
  const [checks, setChecks] = useState([false, false, false, false]);

  //check all are filled
  useEffect(() => {
    if (checks.every((check) => check)) {
      setAllChecksFilled(true);
    }
  }, [checks]);
  console.log({elements})
  return (
    <View style={styles.row}>
      {questions.map((question, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.text}>{question}</Text>
          <elements.CheckBox
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
    </View>
  );
};
export default CheckBoxes;
