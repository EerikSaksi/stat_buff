import React from "react";
import { List, Button } from "react-native-paper";
import {RootStackParamList} from "components/workout";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";


type WorkoutDayPickerRouteProp = RouteProp<
  RootStackParamList,
  'Select Workout Day'
>;

type WorkoutDayPickerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Select Workout Day'
>;
type Props = {
  route: WorkoutDayPickerRouteProp;
  navigation: WorkoutDayPickerNavigationProp;
};

const WorkoutDayPicker: React.FC<Props> = ({navigation, route}) => {
  return (
    <List.Section>
      {route.params.days.map((day) => (
        <List.Item
          left={(props) => <List.Icon {...props} icon="arm-flex" />}
          key={day.name}
          title={day.name}
          titleStyle={{ fontSize: 24 }}
          descriptionStyle={{ fontSize: 16 }}
          description={`${day.workoutPlanExercises.nodes.length} exercises`}
          right={() => (
            <Button
              icon="arrow-right"
              onPress={() => navigation.navigate("Workout", { workoutDay: day})}
            >
              Start
            </Button>
          )}
        ></List.Item>
      ))}
    </List.Section>
  );
};
export default WorkoutDayPicker;
