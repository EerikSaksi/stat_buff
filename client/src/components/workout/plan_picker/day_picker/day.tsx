import React, { useState} from "react";
import { List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBodyStatQuery, useWorkoutPlanDayByIdQuery, } from "../../../../generated/graphql";
import WorkoutExerciseSet from "./exercise_set";
import WorkoutTimer from "./workout_timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../../workout";
import { ActivityIndicator } from "react-native-paper";
import useLocalVolumes from "./use_local_volumes";
import {cache} from "../../../../apollo/cache";


type WorkoutDayRouteProp = RouteProp<RootStackParamList, "Workout">;

type WorkoutDayNavigationProp = StackNavigationProp<RootStackParamList, "Workout">;
type Props = {
  route: WorkoutDayRouteProp;
  navigation: WorkoutDayNavigationProp;
};

const Day: React.FC<Props> = ({ route, navigation }) => {
  const [expandedId, setExpandedId] = useState(1);

  console.log(cache.data.data[`WorkoutPlanDay:${route.params.dayId}`])

  const { data: workoutPlanDayData } = useWorkoutPlanDayByIdQuery({
    variables: { id: route.params.dayId },
  });
  const {exerciseSetVolumes, updateVolumes} = useLocalVolumes(workoutPlanDayData)

  const { data: bodyStatData } = useBodyStatQuery();


  useFocusEffect(() => {
    if (workoutPlanDayData?.workoutPlanDay) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            icon="square-edit-outline"
            onPress={() => navigation.navigate("Select Exercise", {workoutPlanDayData})}
          >
            Edit workout
          </Button>
        ),
      });
    }
  });

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
