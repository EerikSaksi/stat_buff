import React, { useState } from "react";
import { List, Searchbar, Button } from "react-native-paper";
import { useExerciseSearchQuery } from "../../../../../generated/graphql";
import { RootStackParamList } from "../../../../workout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import useInsertExerciseInPlanMutationCached from "./use_insert_exercise_in_plan_mutation_cached";

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
  const [insertExerciseInPlan] = useInsertExerciseInPlanMutationCached(
    {
      onCompleted: () => {
        navigation.goBack();
      },
    },
    route.params.workoutPlanDayData.workoutPlanDay!.id
  );

  return (
    <>
      <Searchbar value={query} onChangeText={(v) => setQuery(v)} autoFocus />
      <List.Section>
        {data?.exercises?.nodes.map((exercise) => (
          <List.Item
            title={exercise.name}
            key={exercise.id}
            disabled={!route.params.workoutPlanDayData.workoutPlanDay}
            right={() => (
              <Button
                icon="plus-thick"
                onPress={() => {
                  //first get all orderings
                  const listOfOrderings = route.params.workoutPlanDayData!.workoutPlanDay!.workoutPlanExercises.nodes.map(
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
