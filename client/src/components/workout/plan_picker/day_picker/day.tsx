import React, { useCallback, useState, useLayoutEffect } from "react";
import { List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBodyStatQuery, useWorkoutPlanDayByIdQuery } from "../../../../generated/graphql";
import WorkoutExerciseSet from "./exercise_set";
import WorkoutTimer from "./workout_timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "components/workout";
import { ActivityIndicator } from "react-native-paper";
import {Text} from 'react-native'

type WorkoutDayRouteProp = RouteProp<RootStackParamList, "Workout">;

type WorkoutDayNavigationProp = StackNavigationProp<RootStackParamList, "Workout">;
type Props = {
  route: WorkoutDayRouteProp;
  navigation: WorkoutDayNavigationProp;
};

export type ConditionalVolume = {
  weight: number | undefined | null;
  reps: number | undefined | null;
};
export type ExerciseSetVolumes = {
  [workoutPlanExerciseId: number]: {
    exerciseId: number;
    volumes: ConditionalVolume[];
  };
};

const Day: React.FC<Props> = ({ route, navigation }) => {
  const [expandedId, setExpandedId] = useState(1);

  //volumes stores the sets and reps for various exercises. For instance
  const [exerciseSetVolumes, setExerciseSetVolumes] = useState<ExerciseSetVolumes | undefined>();

  const { data: workoutPlanDayData } = useWorkoutPlanDayByIdQuery({
    variables: { id: route.params.workoutPlanDay.id },
    onCompleted: () => {
      if (workoutPlanDayData?.workoutPlanDay) {
        const newExerciseSetVolumes: ExerciseSetVolumes = {};
        workoutPlanDayData?.workoutPlanDay.workoutPlanExercises.nodes.forEach((workoutPlanExercise) => {
          newExerciseSetVolumes[workoutPlanExercise.id] = {
            exerciseId: workoutPlanExercise.exercise!.id,
            volumes: new Array(workoutPlanExercise.sets).fill({ weight: undefined, reps: undefined }),
          };
        });
        setExerciseSetVolumes(newExerciseSetVolumes);
      }
    },
    fetchPolicy: 'cache-only'
  });
  const { data: bodyStatData } = useBodyStatQuery();

  //useEffect(() => {
  //  //if the local per exercise volumes do not match the number of exercises in the plan
  //  if (workoutPlanDayData?.workoutPlanDay) {
  //    const exercises = workoutPlanDayData.workoutPlanDay.workoutPlanExercises.nodes;

  //    //mismatch between local volume state and number of exercises from query, amend
  //    if (volumes && volumes.length !== exercises.length) {
  //      var volumesCopy = [...volumes];

  //      //more than needed, then slice the array
  //      if (exercises.length < volumesCopy.length) {
  //        volumesCopy = volumesCopy.slice(exercises.length);
  //      }
  //      //otherwise we add empty volumes until they match
  //      else {
  //        for (var i = volumes.length; i < exercises.length; i++) {
  //          volumesCopy.push(new Array(exercises[i].sets).fill({ weight: undefined, reps: undefined }));
  //        }
  //      }
  //    }
  //  }
  //}, [workoutPlanDayData, volumes]);

  const updateVolumes = useCallback((workoutPlanExerciseId: number, setIndex: number, volume: ConditionalVolume) => {
    setExerciseSetVolumes((old) => {
      if (old) {
        const copy = { ...old };
        copy[workoutPlanExerciseId][setIndex] = volume;
        return copy;
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (workoutPlanDayData?.workoutPlanDay) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            icon="square-edit-outline"
            onPress={() => navigation.navigate("Select Exercise", { dayId: route.params.workoutPlanDay.id })}
          >
            Edit workout
          </Button>
        ),
      });
    }
  }, [navigation, route]);

  if (!workoutPlanDayData?.workoutPlanDay || !exerciseSetVolumes) {
    return <ActivityIndicator />;
  }


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
        {workoutPlanDayData.workoutPlanDay.workoutPlanExercises.nodes.map((workoutPlanExercise) => (
          exerciseSetVolumes[workoutPlanExercise.id.toString()] ? (
            <List.Accordion
              key={workoutPlanExercise.id}
              id={workoutPlanExercise.id + 1}
              title={`${workoutPlanExercise.exercise?.name}: ${workoutPlanExercise.sets} sets of ${workoutPlanExercise.reps} reps`}
            >
              {exerciseSetVolumes[workoutPlanExercise.id].volumes.map((volume, setIndex) => (
                <WorkoutExerciseSet
                  key={`${workoutPlanExercise.id} ${setIndex}`}
                  updateVolumes={updateVolumes}
                  setIndex={setIndex}
                  workoutPlanExerciseId={workoutPlanExercise.id}
                  volume={volume}
                  exerciseId={workoutPlanExercise.exercise.id}
                  bodystat={bodyStatData?.activeUser?.bodystat ? bodyStatData.activeUser.bodystat : undefined}
                />
              ))}
            </List.Accordion>
          ) : undefined
        ))}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Day;
