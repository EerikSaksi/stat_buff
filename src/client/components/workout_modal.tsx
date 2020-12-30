import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import CustomModal from "../util_components/custom_modal";
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
      nodeId
      groupByGroupname {
        nodeId
        battleByNameAndBattleNumber {
          nodeId
          enemyLevel
          battleNumber
          currentHealth
          createdAt
          maxHealth
          enemyByEnemyLevel {
            nodeId
            name
          }
        }
      }
    }
  }
`;
const styles = StyleSheet.create({
  row: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },
  input: {
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
  },
});
const WorkoutModal: React.FC<{ username: string; visible: boolean; setVisible: (val: boolean) => void; skillTitle: string | undefined }> = ({ username, visible, setVisible, skillTitle }) => {
  const [rir, setRir] = useState<number | undefined>(2);
  const [sets, setSets] = useState<number | undefined>(10);
  const [createWorkout, { data: mutationData }] = useMutation(CREATE_WORKOUT, {
    variables: { username, rir, sets },
  });
  const navigation = useNavigation();

  //we want to fetch the enemy data before we call the createWorkout mutation, otherwise we might show them data after the attack
  const { data } = useQuery(ENEMY_STATS, {
    variables: { username },
    fetchPolicy: 'cache-and-network'
  });
  useEffect(() => {
    createWorkout()
  }, [])

  var content: undefined | React.ReactNode = undefined;
  if (mutationData) {
    content = (
        <WorkoutModalAttack username={username} hits={mutationData.createWorkout.workout.hits} skillTitle={skillTitle} setVisible={setVisible} data={data} />
    );
  } else if (data && data.user) {
    //query finished but no group
    if (!data.user.groupByGroupname) {
      content = (
        <React.Fragment>
          <Text style={styles.heading}>You need to be a part of a team before you track a workout.</Text>
          <Button title="Join Group" onPress={() => navigation.navigate("Group")} />
        </React.Fragment>
      );
    }
    //no battle so lacking members
    else if (!data.user.groupByGroupname.battleByNameAndBattleNumber) {
      content = (
          <Text style={styles.heading}>You need at least two members before you can track workouts</Text>
      );
    } else {
      content = (
        <React.Fragment>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={rir?.toString()}
              onChangeText={(v) => (v.length ? setRir(parseInt(v)) : setRir(undefined))}
              placeholder="Average Reps in Reserve"
              keyboardType={"numeric"}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={sets?.toString()}
              onChangeText={(v) => (v.length ? setSets(parseInt(v)) : setSets(undefined))}
              placeholder="Number of Sets Completed"
              keyboardType={"numeric"}
            />
          </View>
          <View style={styles.row}>
            <Button disabled={!rir || !sets || !data} title="Save Workout" style={styles.row} onPress={() => createWorkout()} />
          </View>
        </React.Fragment>
      );
    }

  }
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      {content}
    </CustomModal>
  );
};
export default WorkoutModal;
