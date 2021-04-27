import React from "react";
import { List, TextInput} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const Workout: React.FC = () => (
  <SafeAreaView>
    <List.Section>
      <List.Item title="Squat" right = {() => <TextInput/>}/>
    </List.Section>
  </SafeAreaView>
);
export default Workout;
