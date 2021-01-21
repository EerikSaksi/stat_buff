import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "react-native-elements";
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
  mutation {
    getBattleAndCheckExpiry(input: {}) {
      battle {
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
`;
const WORKOUTS = gql`
  query($username: String!) {
    workouts(filter: { username: { equalTo: $username } }, last: 1) {
      nodes {
        nodeId
        sets
        averageRir
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
    marginBottom: '5%'
  },
  input: {
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
  },
  text: {
    textAlign: 'center'
  }
});
const WorkoutModal: React.FC<{ username: string; visible: boolean; setVisible: (val: boolean) => void; skillTitle: string | undefined }> = ({ username, visible, setVisible, skillTitle }) => {
  const [rir, setRir] = useState<number | undefined>();
  const [sets, setSets] = useState<number | undefined>();
  const [createWorkout, { data: mutationData }] = useMutation(CREATE_WORKOUT, {
    variables: { username, rir, sets },
  });
  const navigation = useNavigation();


  //we want to fetch the enemy data before we call the createWorkout mutation, otherwise we might show them data after the attack
  useQuery(WORKOUTS, {
    variables: { username },
    onCompleted: (data) => {
      //user has tracked a workout, so we set the rir and sets to the most recent values
      if (data.workouts.nodes.length) {
        setRir(data.workouts.nodes[0].averageRir);
        setSets(data.workouts.nodes[0].sets);
      }
    },
  });
  const [fetchEnemyStats, { data }] = useMutation(ENEMY_STATS);
  useEffect(() => {
    if (visible){
      fetchEnemyStats();
    }
  }, [visible]);

  var content: undefined | React.ReactNode = undefined;
  if (mutationData) {
    content = <WorkoutModalAttack hits={mutationData.createWorkout.workout.hits} skillTitle={skillTitle} setVisible={setVisible} data={data} />;
  } else if (data) {
    //query finished but no group
    if (!data.getBattleAndCheckExpiry.battle) {
      content = (
        <React.Fragment>
          <Text style={styles.heading}>You need to be a part of a team before you track a workout.</Text>
          <Button title="Join Group" onPress={() => navigation.navigate("Group")} />
        </React.Fragment>
      );
    }
    //no battle so lacking members
    else if (!data.getBattleAndCheckExpiry.battle) {
      content = <Text style={styles.heading}>You need at least two members before you can track workouts</Text>;
    } else {
      content = (
        <View style = {{padding: '5%'}}>
          <View style={styles.row}>
            <Text style = { styles.text }>
              How many sets did you complete in total (for all exercises in your entire workout, not including warmup sets.)
            </Text>
            <Input
              style={styles.input}
              value={sets?.toString()}
              onChangeText={(v) => (v.length ? setSets(parseInt(v)) : setSets(undefined))}
              placeholder="Sets"
              keyboardType={"numeric"}
            />
          </View>
          <View style={styles.row}>
            <Text style = { styles.text }>
              If you were to try your hardest, how many more reps would you have been able to do on average over your sets?
            </Text>
            <Input
              style={styles.input}
              value={rir?.toString()}
              onChangeText={(v) => (v.length ? setRir(parseInt(v)) : setRir(undefined))}
              placeholder="Average Reps Left"
              keyboardType={"numeric"}
            />
          </View>
          <View style={styles.row}>
            <Button disabled={!rir || !sets || !data} title="Save Workout" style={styles.row} onPress={() => createWorkout()} />
          </View>
        </View>
      );
    }
  }
  return (
    <CustomModal visible={visible} setVisible={setVisible} >
      {content}
    </CustomModal>
  );
};
export default WorkoutModal;
