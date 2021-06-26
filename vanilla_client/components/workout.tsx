import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutPlanPicker from './workout/plan_picker';
import WorkoutDayPicker from './workout/plan_picker/day_picker';
import WorkoutDay from './workout/plan_picker/day_picker/day';
import ExerciseSearch from './workout/plan_picker/day_picker/edit_day/add_exercise';
import {
  WorkoutPlanDayByIdQuery,
  WorkoutPlanFragment,
  CompletedWorkoutExerciseFragment,
} from '../generated/graphql';
import PostWorkout from './workout/plan_picker/day_picker/post_workout/post_workout';
export type RootStackParamList = {
  'Select Workout': undefined;
  'Select Day': {workoutPlan: WorkoutPlanFragment};
  Workout: {dayId: number; name: string};
  'Select Exercise': {workoutPlanDayData: WorkoutPlanDayByIdQuery};
  'Workout Complete!': {
    completedWorkoutExercises: CompletedWorkoutExerciseFragment[];
  };
};
const Stack = createStackNavigator<RootStackParamList>();

const Workout: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Select Workout"
        component={WorkoutPlanPicker}
        options={{headerLeft: () => null}}
      />
      <Stack.Screen name="Select Day" component={WorkoutDayPicker} />
      <Stack.Screen name="Workout" component={WorkoutDay} />
      <Stack.Screen name="Select Exercise" component={ExerciseSearch} />
      <Stack.Screen
        name="Workout Complete!"
        component={PostWorkout}
        options={{headerLeft: () => null}}
      />
    </Stack.Navigator>
  );
};
export default Workout;
