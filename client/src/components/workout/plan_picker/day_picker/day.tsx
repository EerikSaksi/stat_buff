import React, { useCallback, useState, useLayoutEffect } from "react";
import { List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBodyStatQuery} from "../../../../generated/graphql";
import WorkoutExerciseSet from "./exercise_set";
import WorkoutTimer from "./workout_timer";


import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {RootStackParamList} from "components/workout";

type WorkoutDayRouteProp = RouteProp<
  RootStackParamList,
  'Workout'
>;

type WorkoutDayNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workout'
>;
type Props = {
  route: WorkoutDayRouteProp;
  navigation: WorkoutDayNavigationProp;
};


export type ConditionalVolume = {
  weight: number | undefined | null;
  reps: number | undefined | null;
}

const Day: React.FC<Props> = ({route, navigation}) => {
  const [expandedId, setExpandedId] = useState(1);
  const [volumes, setVolumes] = useState<ConditionalVolume[][]>(() =>
    route.params.workoutDay.workoutPlanExercises.nodes.map((exercise) => new Array(exercise.sets).fill({ weight: undefined, reps: undefined }))
  );

  const updateVolumes = useCallback((row: number, column: number, volume: ConditionalVolume) => {
    setVolumes((old) => {
      const copy = [...old];
      copy[row][column] = volume;
      return copy;
    });
  }, []);

  const { data } = useBodyStatQuery();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="square-edit-outline" onPress = {() => navigation.navigate("Select Exercise", {planId: route.params.workoutDay.id})}>Edit workout</Button>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <List.AccordionGroup
        expandedId={expandedId}
        onAccordionPress={(expandedId) => {
          if (typeof expandedId === "number") {
            setExpandedId((oldExpandedId) => (oldExpandedId === expandedId ? 0 : expandedId));
          }
        }}
      >
        {route.params.workoutDay.workoutPlanExercises.nodes.map((workoutExercise, row) => (
          <List.Accordion
            key={row}
            id={row + 1}
            title={`${workoutExercise.exercise?.name}: ${workoutExercise.sets} sets of ${workoutExercise.reps} reps`}
          >
            {Array.from({ length: workoutExercise.sets || 0 }).map((_, col) => (
              <WorkoutExerciseSet
                key={`${row} ${col}`}
                row={row}
                col={col}
                updateVolumes={updateVolumes}
                volume={volumes[row][col]}
                exerciseId={workoutExercise?.exercise?.id || -1}
                bodystat={data?.activeUser?.bodystat ? data.activeUser.bodystat : undefined}
              />
            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
      <WorkoutTimer volumes={volumes} exerciseIds = {route.params.workoutDay.workoutPlanExercises.nodes.map(workoutExercise => workoutExercise.exercise!.id)}/>
    </SafeAreaView>
  );
};
export default Day;
