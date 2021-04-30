import React from "react";
import { List, TextInput, Subheading} from "react-native-paper";
import { View} from "react-native";
const WorkoutExercise: React.FC<{ name: string; sets: number; reps: number; id: number}> = ({ name, sets, reps, id}) => {
  return (
    <List.Accordion id = {id} title={`${name}: ${sets} sets of ${reps} reps`} >
      <View style={{ flex: 0 }}>
        {Array.from({ length: sets }).map((_, i) => (
          <View style={{ flex: 1, flexDirection: "row", height: 100, justifyContent: 'center', alignItems: 'center', margin: '2%', marginBottom: '10%'}}>
            <View style={{ flex: 1, margin: '5%', height: 50,  justifyContent: 'center', }}>
              <Subheading >Set {i}</Subheading>
            </View>
            <View style={{ flex: 2, margin: '5%', height: 50, justifyContent: 'center', }}>
              <TextInput placeholder="Weight" dense={true} mode = 'outlined'/>
            </View>
            <View style={{ flex: 2, margin: '5%',  height: 50,  justifyContent: 'center', }}>
              <TextInput placeholder="Reps" dense={true} mode="outlined" />
            </View>
          </View>
        ))}
      </View>
    </List.Accordion>
  );
};
export default WorkoutExercise;
