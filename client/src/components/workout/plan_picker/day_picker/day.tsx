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
export type ExerciseSetVolume = {
  workoutPlanExerciseId: number;
  exerciseId: number;
  volumes: ConditionalVolume[];
};

const Day: React.FC<Props> = ({ route, navigation }) => {
  const [expandedId, setExpandedId] = useState(1);

  //volumes stores the sets and reps for various exercises. For instance
  const [volumes, setVolumes] = useState<ExerciseSetVolume[] | undefined>();

  const { data: workoutPlanDayData } = useWorkoutPlanDayByIdQuery({
    variables: { id: route.params.workoutPlanDay.id },
    onCompleted: () => {
      if (workoutPlanDayData?.workoutPlanDay) {
        setVolumes(
          workoutPlanDayData?.workoutPlanDay.workoutPlanExercises.nodes.map((workoutPlanExercise) => {
            return {
              workoutPlanExerciseId: workoutPlanExercise.id,
              exerciseId: workoutPlanExercise.exercise.id,
              volumes: new Array(workoutPlanExercise.sets).fill({ weight: undefined, reps: undefined }),
            };
          })
        );
      }
    },
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

  const updateVolumes = useCallback((row: number, column: number, volume: ConditionalVolume) => {
    setVolumes((old) => {
      if (old) {
        const copy = [...old];
        copy[row][column] = volume;
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
            onPress={() => navigation.navigate("Select Exercise", { planId: route.params.workoutPlanDay.id })}
          >
            Edit workout
          </Button>
        ),
      });
    }
  }, [navigation, route]);

  if (!workoutPlanDayData?.workoutPlanDay || !volumes) {
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
        {workoutPlanDayData.workoutPlanDay.workoutPlanExercises.nodes.map((workoutExercise, row) => {
          volumes[row] ? (
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
                  bodystat={bodyStatData?.activeUser?.bodystat ? bodyStatData.activeUser.bodystat : undefined}
                />
              ))}
            </List.Accordion>
          ) : undefined;
        })}
      </List.AccordionGroup>
      <WorkoutTimer volumes={volumes} />
    </SafeAreaView>
  );
};
export default Day;
