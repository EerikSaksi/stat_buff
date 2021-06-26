import React, { useState } from "react";
import { List, Searchbar, Button } from "react-native-paper";
import {
  useExerciseSearchQuery,
  useInsertExerciseInPlanMutation,
  WorkoutPlanExerciseFragmentDoc,
} from "../../../../../generated/graphql";
import { RootStackParamList } from "../../../../workout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type ExerciseSearchRouteProp = RouteProp<RootStackParamList, "Select Exercise">;

type ExerciseSearchNavigationProp = StackNavigationProp<RootStackParamList, "Select Exercise">;
type Props = {
  route: ExerciseSearchRouteProp;
  navigation: ExerciseSearchNavigationProp;
};

const ExerciseSearch: React.FC<Props> = ({ navigation, route }) => {
  const [query, setQuery] = useState("");
  const { data } = useExerciseSearchQuery({
    variables: { query },
  });
  const [insertExerciseInPlan] = useInsertExerciseInPlanMutation({
    update(cache, { data }) {
      if (route.params.workoutPlanDayData.workoutPlanDay?.id) {
        cache.modify({
          //modify the workout plan from which this was opened
          id: `WorkoutPlanDay:${route.params.workoutPlanDayData.workoutPlanDay.id}`,
          fields: {
            workoutPlanExercises(existingWorkoutPlanExercises = []) {
              //if succesfully created
              if (data?.createWorkoutPlanExercise?.workoutPlanExercise) {
                const newWorkoutPlanExercise = cache.writeFragment({
                  data: data.createWorkoutPlanExercise.workoutPlanExercise,
                  fragment: WorkoutPlanExerciseFragmentDoc,
                });
                //insert into the end of the plan
                return [...existingWorkoutPlanExercises, newWorkoutPlanExercise];
              }
            },
          },
        });
      }
    },
    onCompleted: () => {
      navigation.goBack();
    },
  });
  return (
    <>
      <Searchbar value={query} onChangeText={(v) => setQuery(v)} autoFocus />
      <List.Section>
        {data?.exercises?.map((exercise) => (
          <List.Item
            title={exercise.name}
            key={exercise.id}
            disabled={!route.params.workoutPlanDayData.workoutPlanDay}
            right={() => (
              <Button
                icon="plus-thick"
                onPress={() => {
                  //first get all orderings
                  const listOfOrderings = route.params.workoutPlanDayData!.workoutPlanDay!.workoutPlanExercises.map(
                    (exercise) => exercise.ordering
                  );

                  //if no exercises, insert ordering 0, else add to the end of the list
                  const ordering = listOfOrderings.length ? Math.max(...listOfOrderings) + 1 : 0;
                  insertExerciseInPlan({
                    variables: {
                      reps: 5,
                      sets: 5,
                      ordering,
                      exerciseId: exercise.id,
                      workoutPlanDayId: route.params.workoutPlanDayData.workoutPlanDay!.id,
                    },
                  });
                }}
              >
                Add
              </Button>
            )}
          />
        ))}
      </List.Section>
    </>
  );
};

export default ExerciseSearch;
