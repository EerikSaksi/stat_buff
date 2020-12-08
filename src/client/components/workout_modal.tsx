import { gql, useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, TextInput, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { generateShadow } from "react-native-shadow-generator";
import SpriteSelector from "../sprites/sprite_selector";
const STRENGTH = gql`
  query {
    strengthStats {
      DPH
    }
  }
`;

const ENEMY_STATS = gql`
  query($username: String!) {
    user(username: $username) {
      groupByGroupName {
        battlesByGroupnameAndBattleNumber {
          nodes {
            enemyLevel
            battleNumber
            currentHealth
            createdAt
            enemyByEnemyLevel {
              maxHealth
              name
            }
          }
        }
      }
    }
  }
`;
const CREATE_WORKOUT = gql`
  mutation($rir: Int!, $sets: Int!, $username: String!) {
    createWorkout(input: { workout: { averageRir: $rir, sets: $sets, username: $username } }) {
      workout {
        hits
      }
    }
  }
`;
const styles = StyleSheet.create({
  modal: {
    margin: "10%",
    marginTop: "30%",
    marginBottom: "30%",
    flex: 1,
    backgroundColor: "white",
    ...generateShadow(24),
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    flex: 1,
  },
  sprites: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  leftSprite:{
    left: '-40%',
    flex: 1,
    backgroundColor: 'blue'
  },
  rightSprite:{
    flex: 1,
  },
  input: {
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
  },
});
const WorkoutModal: React.FC<{ username: string; visible: boolean; setVisible: (val: boolean) => void }> = ({ username, visible, setVisible }) => {
  const [rir, setRir] = useState<number | undefined>(undefined);
  const [sets, setSets] = useState<number | undefined>(undefined);
  const [createWorkout, { data }] = useMutation(CREATE_WORKOUT, {
    variables: { username, rir, sets },
  });

  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"} transparent={true}>
      {data ? (
        <View style={styles.modal}>
          <Ionicons onPress={() => setVisible(false)} name="ios-arrow-round-back" style={{ color: "black", fontSize: 40, left: "2%", position: "absolute", top: 0 }} />
          <Text style={styles.heading}>{`You hit the enemy ${data.createWorkout.workout.hits} times`}</Text>
          <Text>{`(10 - ${rir} RIR) / 10 * ${sets} sets = ${data.createWorkout.workout.hits}`}</Text>
        </View>
      ) : (
        <View style={styles.modal}>
          <Ionicons onPress={() => setVisible(false)} name="ios-arrow-round-back" style={{ color: "black", fontSize: 40, left: "2%", position: "absolute", top: 0 }} />
          <View style={styles.row}>
            <TextInput style={styles.input} value={rir?.toString()} onChangeText={(v) => (v.length ? setRir(parseInt(v)) : setRir(undefined))} placeholder="Average Reps in Reserve" keyboardType={"numeric"} />
          </View>
          <View style={styles.row}>
            <TextInput style={styles.input} value={sets?.toString()} onChangeText={(v) => (v.length ? setSets(parseInt(v)) : setSets(undefined))} placeholder="Number of Sets Completed" keyboardType={"numeric"} />
          </View>
          <View style={styles.row}>
            <Button disabled={!rir || !sets} title="Save Workout" style={styles.row} onPress={() => createWorkout()} />
          </View>
          <View style={styles.sprites}>
            <View style = { styles.leftSprite }><SpriteSelector aspectRatio = {0.5} spriteName="Mudcrab" /></View>
            <View style = { styles.rightSprite }><SpriteSelector aspectRatio = {0.5} spriteName="advanced" /></View>
          </View>
        </View>
      )}
    </Modal>
  );
};
export default WorkoutModal;
