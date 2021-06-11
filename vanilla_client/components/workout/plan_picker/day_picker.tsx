import React from "react";
import { List, Button, ActivityIndicator } from "react-native-paper";
import { RootStackParamList } from "../../workout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useWorkoutPlanByIdQuery } from "../../../generated/graphql";

type WorkoutDayPickerRouteProp = RouteProp<RootStackParamList, "Select Workout Day">;

type WorkoutDayPickerNavigationProp = StackNavigationProp<RootStackParamList, "Select Workout Day">;
type Props = {
  route: WorkoutDayPickerRouteProp;
  navigation: WorkoutDayPickerNavigationProp;
};
//PERF: fix

const WorkoutDayPicker: React.FC<Props> = ({ navigation, route }) => {
  const { data } = useWorkoutPlanByIdQuery({ variables: { id: route.params.workoutPlanId }, fetchPolicy: 'no-cache' });
  if (!data?.workoutPlan) {
    return <ActivityIndicator />;
  }
  return (
    <List.Section>
      {data.workoutPlan.workoutPlanDays.nodes.map((day) => (
        <List.Item
          left={(props) => <List.Icon {...props} icon="arm-flex" />}
          key={day.name}
          title={day.name}
          titleStyle={{ fontSize: 24 }}
          descriptionStyle={{ fontSize: 16 }}
          description={`${day.workoutPlanExercises.totalCount} exercises`}
          right={() => (
            <Button icon="arrow-right" onPress={() => navigation.navigate("Workout", { dayId: day.id, name: day.name })}>
              Start
            </Button>
          )}
        ></List.Item>
      ))}
    </List.Section>
  );
};
export default WorkoutDayPicker;
