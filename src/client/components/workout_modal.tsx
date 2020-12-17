import { gql, useMutation, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, TextInput, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { generateShadow } from "react-native-shadow-generator";
import WorkoutModalAttack from "./workout_modal_attack";

const CREATE_WORKOUT = gql`
  mutation($rir: Int!, $sets: Int!, $username: String!) {
    createWorkout(input: { workout: { averageRir: $rir, sets: $sets, username: $username } }) {
      workout {
        hits
      }
    }
  }
`;

const ENEMY_STATS = gql`
  query($username: String!) {
    user(username: $username) {
      username
      groupByGroupname {
        battleByNameAndBattleNumber {
          enemyLevel
          battleNumber
          currentHealth
          createdAt
          enemyByEnemyLevel {
            name
            maxHealth
          }
        }
      }
    }
  }
`;
const styles = StyleSheet.create({
  modal: {
    margin: "3%",
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
  input: {
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
  },
});
const WorkoutModal: React.FC<{ username: string; visible: boolean; setVisible: (val: boolean) => void, skillTitle: string | undefined,  }> = ({ username, visible, setVisible, skillTitle }) => {
  const [rir, setRir] = useState<number | undefined>(2);
  const [sets, setSets] = useState<number | undefined>(10);
  const [createWorkout, { data: mutationData }] = useMutation(CREATE_WORKOUT, {
    variables: { username, rir, sets },
  });
  useEffect(() => {
    createWorkout()
  }, [])


  //we want to fetch the enemy data before we call the createWorkout mutation, otherwise we might show them data after the attack
  const { data } = useQuery(ENEMY_STATS, {
    variables: { username },
  });

  useEffect(() => {
    //createWorkout() 
  }, [])
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"} transparent={true}>
      {mutationData ? (
        <View style={styles.modal}>
          <WorkoutModalAttack username = {username} hits = {mutationData.createWorkout.workout.hits} skillTitle = {skillTitle} setVisible = {setVisible} data = {data}/>
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
            <Button disabled={!rir || !sets || !data} title="Save Workout" style={styles.row} onPress={() => createWorkout()} />
          </View>
        </View>
      )}
    </Modal>
  );
};
export default WorkoutModal;
