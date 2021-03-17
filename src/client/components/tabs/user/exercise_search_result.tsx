import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, } from "react-native";
import { unslugify } from "../../../util_components/slug";
import { Button } from "react-native-elements";
import { gql, useLazyQuery, useMutation} from "@apollo/client";
import {Ionicons} from "@expo/vector-icons";

const CALCULATE_STRENGTH = gql`
  query($liftmass: Float!, $exerciseSlug: String!, $repetitions: Int!) {
    calculateStrength(liftmass: $liftmass, exercise: $exerciseSlug, repetitions: $repetitions)
  }
`;

const CREATE_USER_EXERCISE = gql`
  mutation($exerciseSlug: String!, $username: String!, $repetitions: Int!, $percentage: Int!, $liftmass: Float!) {
    createUserExercise(input: { userExercise: { slugName: $exerciseSlug, username: $username, repetitions: $repetitions, strongerpercentage: $percentage, liftmass: $liftmass } }) {
      clientMutationId
    }
  }
`;

const UPDATE_USER_EXERCISE = gql`
  mutation($exerciseSlug: String!, $username: String!, $repetitions: Int!, $percentage: Int!, $liftmass: Float!) {
    updateUserExercise(input: { slugName: $exerciseSlug, username: $username, patch: { repetitions: $repetitions, strongerpercentage: $percentage, liftmass: $liftmass } }) {
      userExercise {
        nodeId
        repetitions
        liftmass
        strongerpercentage
        updatedAt
      }
    }
  }
`;
const DELETE_USER_EXERCISE = gql`
  mutation($exerciseSlug: String!, $username: String!) {
    deleteUserExercise(input: { slugName: $exerciseSlug, username: $username }) {
      clientMutationId
    }
  }
`;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  flexOne: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    textAlign: "center",
  },
  recalculate: {
    flex: 9,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});
const ExerciseSearchResult: React.FC<{ exerciseSlug: string; username: string; bodyweight: boolean, userExercise: any }> = ({ exerciseSlug, bodyweight, username, userExercise }) => {
  //these are set by saved data (as they might have been filled before) and also by the user inputs in case the user wants to change them
  const [liftmass, setLiftmass] = useState<undefined | string>(userExercise?.liftmass);
  const [repetitions, setRepetitions] = useState<undefined | number>(userExercise?.repetitions);

  const [fetchCalculateStrength, { data: calcData, loading }] = useLazyQuery(CALCULATE_STRENGTH, {
    variables: { liftmass: liftmass ? parseFloat(liftmass) : 0.0, exerciseSlug, repetitions },
  });


  //provide mutations for updating and updating lift stats. These are offered based on whether data exists in the database, and both trigger a refetch to keep the data updated
  const [createUserExercise] = useMutation(CREATE_USER_EXERCISE, {
    variables: { exerciseSlug, username, repetitions, calcData, liftmass: parseFloat(liftmass!) },
  });
  const [updateUserExercise] = useMutation(UPDATE_USER_EXERCISE, {
    variables: { exerciseSlug, username, repetitions, calcData, liftmass: parseFloat(liftmass!) },
  });
  const [deleteUserExercise] = useMutation(DELETE_USER_EXERCISE, {
    variables: { exerciseSlug, username },
  });

  var button: React.ReactNode;

  if (loading) {
    button = <Button title={"Loading..."} onPress={() => null} />;
  }

  return (
    <View key={exerciseSlug} style={styles.root}>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text>{unslugify(exerciseSlug)}</Text>
        </View>
        <TextInput onChangeText={(t) => setLiftmass(t)} keyboardType="numeric" value={liftmass} style={styles.textInput} placeholder={bodyweight ? "Additional Weight (kg)" : "Weight (kg)"} />
        <TextInput onChangeText={(t) => setRepetitions(parseInt(t))} keyboardType="numeric" value={repetitions ? repetitions.toString() : undefined} style={styles.textInput} placeholder={"Reps"} />
      </View>
      <View style={styles.row}>
        <Button
          onPress={() => {
            fetchCalculateStrength();
          }}
          containerStyle={styles.recalculate}
        />
        <Button icon={<Ionicons name="md-trash" size={24} />} buttonStyle={styles.deleteButton} containerStyle={styles.flexOne} onPress={() => deleteUserExercise()} />
      </View>
    </View>
  );
};
export default ExerciseSearchResult;
