import React, { useRef, useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { unslugify } from "../../../util_components/slug";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const CALCULATE_STRENGTH = gql`
  query($liftmass: Float!, $exerciseSlug: String!, $repetitions: Int!) {
    calculateStrength(liftmass: $liftmass, exercise: $exerciseSlug, repetitions: $repetitions)
  }
`;

const USER_EXERCISE = gql`
  query($exerciseSlug: String!, $username: String!) {
    userExercise(slugName: $exerciseSlug, username: $username) {
      nodeId
      repetitions
      liftmass
      strongerpercentage
      updatedAt
    }
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
const ExerciseSearchResult: React.FC<{ exerciseSlug: string; username: string; refetchParent: () => void; bodyweight: boolean }> = ({ exerciseSlug, bodyweight, username, refetchParent }) => {
  //these are set by saved data (as they might have been filled before) and also by the user inputs in case the user wants to change them
  const [liftmass, setLiftmass] = useState<undefined | string>(undefined);
  const [repetitions, setRepetitions] = useState<undefined | number>(undefined);

  const [percentage, setPercentage] = useState<undefined | number>(undefined);
  const [askingConfirmation, setAskingConfirmation] = useState(false);

  //this is set to the current values before they are updated so that we can compare them
  const oldUserExerice = useRef({ strongerpercentage: 0, updatedAt: new Date() });
  const [fetchCalculateStrength, { data, loading }] = useLazyQuery(CALCULATE_STRENGTH, {
    variables: { liftmass: liftmass ? parseFloat(liftmass) : 0.0, exerciseSlug, repetitions },
    onCompleted: (data) => {
      setPercentage(data.calculateStrength);
      setAskingConfirmation(true);
    },
  });

  const { data: savedData, refetch } = useQuery(USER_EXERCISE, {
    variables: { username, exerciseSlug },
    onCompleted: (data) => {
      //user has tracked this exercise
      if (data.userExercise && data.userExercise.repetitions) {
        setRepetitions(data.userExercise.repetitions);
        setLiftmass(data.userExercise.liftmass.toString());
        setPercentage(data.userExercise.strongerpercentage);
      }
    },
  });

  //provide mutations for updating and updating lift stats. These are offered based on whether data exists in the database, and both trigger a refetch to keep the data updated
  const [createUserExercise] = useMutation(CREATE_USER_EXERCISE, {
    variables: { exerciseSlug, username, repetitions, percentage, liftmass: parseFloat(liftmass!) },
    onCompleted: () => {
      setAskingConfirmation(false);
      refetch();
      refetchParent();
    },
  });
  const [updateUserExercise] = useMutation(UPDATE_USER_EXERCISE, {
    variables: { exerciseSlug, username, repetitions, percentage, liftmass: parseFloat(liftmass!) },
    onCompleted: (data) => {
      setAskingConfirmation(false);
      //we have not yet refetched so we can extract the old values
      const { strongerpercentage: old_strongerpercentage, updatedAt: old_updatedAt } = oldUserExerice.current;
      const { strongerpercentage, updatedAt } = data.updateUserExercise.userExercise;

      //trigger refetches as we no longer need savedData
      refetch();
      refetchParent();

      console.log({updatedAt, old_updatedAt})
      const hourDiff = (new Date(updatedAt).getTime() - new Date(old_updatedAt).getTime()) / 36e5;
      const percentageDiff = strongerpercentage - old_strongerpercentage;

      //we want atleast 12 hours difference to prevent alerts from wrong values that are later fixed
      if (12 < hourDiff) {
        //if the user has passed 3%/day threshold
        if (percentageDiff / (hourDiff * 24) <= 5) {
          Alert.alert(
            `You've improved your percentile by ${percentageDiff}% over just ${hourDiff} hours.`,
            "Weight shouldn't be added at the expense of form. Would you like a video on technique?",
            [
              {
                text: "I know what I'm doing!",
              },
              {
                text: "Sure",
              },
            ],
            { cancelable: true }
          );
        }
      }
    },
  });
  const [deleteUserExercise] = useMutation(DELETE_USER_EXERCISE, {
    variables: { exerciseSlug, username },
    onCompleted: () => {
      refetch();
      refetchParent();
    },
  });

  var button: React.ReactNode;

  if (loading) {
    button = <Button title={"Loading..."} onPress={() => null} />;
  }

  //user wanted to override their old strength, show the current calculation and ask for confirmation to save
  else if (askingConfirmation) {
    button = (
      <Button
        title={`Stronger than ${data.calculateStrength}%. Tap to save.`}
        onPress={() => {
          if (savedData.userExercise) {
            //cache the old results so that we can compare them once we get the new data
            oldUserExerice.current = savedData.userExercise;
            updateUserExercise();
          } else {
            createUserExercise();
          }
          setAskingConfirmation(false);
        }}
      />
    );
  }

  //user has data in the database for this exercise. Autofill input and allow user to edit and update their stats
  else if (savedData && savedData.userExercise && savedData.userExercise.repetitions) {
    const { strongerpercentage } = savedData.userExercise;
    button = (
      <View style={styles.row}>
        <Button
          title={`Stronger than ${strongerpercentage}%. Tap to recalculate.`}
          onPress={() => {
            fetchCalculateStrength();
          }}
          containerStyle={styles.recalculate}
        />
        <Button icon={<Ionicons name="md-trash" size={24} />} buttonStyle={styles.deleteButton} containerStyle={styles.flexOne} onPress={() => deleteUserExercise()} />
      </View>
    );
  }

  //calculate strength for the first time
  else {
    button = <Button title={"Calculate Relative Strength"} disabled={liftmass === "" || !repetitions} onPress={() => fetchCalculateStrength()} />;
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
        <View style={styles.flexOne}>{button}</View>
      </View>
    </View>
  );
};
export default ExerciseSearchResult;
