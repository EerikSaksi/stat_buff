import React from "react";
import { List, Button } from "react-native-paper";
import { WorkoutDayFragment } from "generated/graphql";
import {useNavigation} from "@react-navigation/native";
type Route = {
  params: {
    days: WorkoutDayFragment[];
  };
};

const WorkoutDayPicker: React.FC<{route: Route}> = ({route}) => {
  const navigation = useNavigation()
  return (
    <List.Section>
      {route.params.days.map((day, i) => (
        <List.Item
          left={(props) => <List.Icon {...props} icon="arm-flex" />}
          key={day.name}
          title={day.name}
          titleStyle={{ fontSize: 24 }}
          descriptionStyle={{ fontSize: 16 }}
          description={`${day.workoutExercises.length} exercises`}
          right={() => <Button icon="arrow-right" onPress = {() => navigation.navigate('Workout', {exercises: route.params.days[i]})}>Start</Button>}
        ></List.Item>
      ))}
    </List.Section>
  );
};
export default WorkoutDayPicker;
