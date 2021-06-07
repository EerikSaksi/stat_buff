import React, { useState, useLayoutEffect } from "react";
import { List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBodyStatQuery, useWorkoutPlanDayByIdQuery} from "../../../../generated/graphql";
import WorkoutExerciseSet from "./exercise_set";
import WorkoutTimer from "./workout_timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../workout";
import { ActivityIndicator } from "react-native-paper";
import useLocalVolumes from "./use_local_volumes";
import EditExerciseButtons from "./edit_day/edit_exercise_buttons";

type WorkoutDayRouteProp = RouteProp<RootStackParamList, "Workout">;

type WorkoutDayNavigationProp = StackNavigationProp<RootStackParamList, "Workout">;
type Props = {
  route: WorkoutDayRouteProp;
  navigation: WorkoutDayNavigationProp;
};

const Day: React.FC<Props> = ({ route, navigation }) => {
  const [expandedId, setExpandedId] = useState(1);

  const { data: workoutPlanDayData } = useWorkoutPlanDayByIdQuery({
    variables: { id: route.params.dayId },
    //fetchPolicy: 'cache-and-network'
  });
  const { exerciseSetVolumes, updateVolumes } = useLocalVolumes(workoutPlanDayData);

  const { data: bodyStatData } = useBodyStatQuery();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="square-edit-outline"
          onPress={() => {
            if (workoutPlanDayData) navigation.navigate("Select Exercise", { workoutPlanDayData });
          }}
        >
          Add exercise
        </Button>
      ),
      title: route.params.name,
    });
  }, []);

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
        {workoutPlanDayData.workoutPlanDay.workoutPlanExercises.nodes.map((workoutPlanExercise) =>
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
              <EditExerciseButtons workoutPlanExercise = {workoutPlanExercise}/>
            </List.Accordion>
          ) : undefined
        )}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Day;
