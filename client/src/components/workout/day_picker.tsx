import React from "react";
import { List, Button } from "react-native-paper";
import { WorkoutDayFragment } from "generated/graphql";
type Route = {
  params: {
    days: WorkoutDayFragment[];
  };
};

const WorkoutDayPicker: React.FC<{route: Route}> = ({route}) => {
  return (
    <List.Section>
      {route.params.days.map((day) => (
        <List.Item
          left={(props) => <List.Icon {...props} icon="arm-flex" />}
          key={day.name}
          title={day.name}
          style={{ backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "lightgray" }}
          titleStyle={{ fontSize: 24 }}
          descriptionStyle={{ fontSize: 16 }}
          description={`${day.workoutExercises.length} exercises`}
          right={() => <Button icon="arrow-right">Start</Button>}
        ></List.Item>
      ))}
    </List.Section>
  );
};
export default WorkoutDayPicker;
