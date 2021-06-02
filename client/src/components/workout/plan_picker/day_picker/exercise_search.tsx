import React, { useState } from "react";
import { List, Searchbar, Button } from "react-native-paper";
import { useExerciseSearchQuery, useInsertExerciseInPlanMutation, useExercisesByWorkoutPlanIdQuery } from "../../../../generated/graphql";
import {RootStackParamList} from "components/workout";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {cache} from '../../../../apollo/cache'

type ExerciseSearchRouteProp = RouteProp<
  RootStackParamList,
  'Select Exercise'
>;

type ExerciseSearchNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Select Exercise'
>;
type Props = {
  route: ExerciseSearchRouteProp;
  navigation: ExerciseSearchNavigationProp;
};


const ExerciseSearch: React.FC<Props> = ({navigation, route}) => {
  const [query, setQuery] = useState("");
  
  const {data: planExercisesData} = useExercisesByWorkoutPlanIdQuery({
    variables: {id: route.params.planId}
  })
  const { data } = useExerciseSearchQuery({
    variables: { query },
    fetchPolicy: "cache-first",
  });
  const [insertExerciseInPlan] = useInsertExerciseInPlanMutation({
    onCompleted: () => {navigation.goBack(); console.log(cache.data.data['WorkoutPlanDay:1'])}
  })
  return (
    <>
      <Searchbar value={query} onChangeText={(v) => setQuery(v)} autoFocus />
      <List.Section>
        {data?.exercises?.nodes.map((exercise) => (
          <List.Item
            title={exercise.name}
            key={exercise.id}
            disabled = {!planExercisesData}
            right={() => (
              <Button
                icon="plus-thick"
                onPress = {() => {
                  if (planExercisesData){
                    //first get all orderings
                    const listOfOrderings = planExercisesData.workoutPlanDay?.workoutPlanExercises.nodes.map(exercise => exercise.ordering)

                    //if no exercises, insert ordering 0, else add to the end of the list
                    const ordering = listOfOrderings ? Math.max(...listOfOrderings) + 1 : 0
                    insertExerciseInPlan({variables: {reps: 5, sets:5, ordering, exerciseId: exercise.id, workoutPlanDayId: route.params.planId }})
                  }
                }
                }
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
