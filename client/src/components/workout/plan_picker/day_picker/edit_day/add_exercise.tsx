import React, { useState } from "react";
import { List, Searchbar, Button } from "react-native-paper";
import {
  useExerciseSearchQuery,
  useInsertExerciseInPlanMutation,
  useExerciseOrderingsByWorkoutPlanIdQuery,
  WorkoutPlanExerciseFragmentDoc
} from "../../../../../generated/graphql";
import { RootStackParamList } from "components/workout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { cache } from "../../../../../apollo/cache";

type ExerciseSearchRouteProp = RouteProp<RootStackParamList, "Select Exercise">;

type ExerciseSearchNavigationProp = StackNavigationProp<RootStackParamList, "Select Exercise">;
type Props = {
  route: ExerciseSearchRouteProp;
  navigation: ExerciseSearchNavigationProp;
};

const ExerciseSearch: React.FC<Props> = ({ navigation, route }) => {
  const [query, setQuery] = useState("");

  const { data: orderingData } = useExerciseOrderingsByWorkoutPlanIdQuery({
    variables: { id: route.params.dayId },
    fetchPolicy: "cache-only",
  });
  const { data } = useExerciseSearchQuery({
    variables: { query },
  });
  const [insertExerciseInPlan] = useInsertExerciseInPlanMutation({
    update(cache, { data }) {
      cache.modify({
        id: `WorkoutPlanDay:${route.params.dayId}`,
        fields: {
          workoutPlanExercises(existingWorkoutPlanExercises = { nodes: [] }) {
            if (data?.createWorkoutPlanExercise?.workoutPlanExercise) {
              const newWorkoutPlanExercise = cache.writeFragment({
                data: data.createWorkoutPlanExercise.workoutPlanExercise,
                fragment: WorkoutPlanExerciseFragmentDoc
              });
              return {nodes: [...existingWorkoutPlanExercises.nodes, newWorkoutPlanExercise]};
            }
          },
        },
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
  });
  return (
    <>
      <Searchbar value={query} onChangeText={(v) => setQuery(v)} autoFocus />
      <List.Section>
        {data?.exercises?.nodes.map((exercise) => (
          <List.Item
            title={exercise.name}
            key={exercise.id}
            disabled={!orderingData}
            right={() => (
              <Button
                icon="plus-thick"
                onPress={() => {
                  if (orderingData?.workoutPlanDay) {
                    //first get all orderings
                    const listOfOrderings = orderingData.workoutPlanDay.workoutPlanExercises.nodes.map((exercise) => exercise.ordering);

                    //if no exercises, insert ordering 0, else add to the end of the list
                    const ordering = listOfOrderings.length ? Math.max(...listOfOrderings) + 1 : 0;
                    insertExerciseInPlan({
                      variables: { reps: 5, sets: 5, ordering, exerciseId: exercise.id, workoutPlanDayId: route.params.dayId },
                    });
                  }
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
