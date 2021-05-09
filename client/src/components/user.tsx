import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Text, View, StyleSheet, Linking } from "react-native";
import {ActivityIndicator} from 'react-native-paper'
import ExerciseModal from "./user/exercise_modal";
import SpriteSelector from "./sprites/sprite_selector";
import BodyStatsModal from "./user/bodystats_modal";
import { Button } from "react-native-elements";
import WorkoutModal from "./user/workout_modal";
import useUserAnalytics from "./analytics/use_user_analytics";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "./style/global";
import { SafeAreaView } from "react-native-safe-area-context";



const STRENGTH = gql`
  query {
    calculateStrengthStats {
      averageStrength
      numExercises
      dph
    }
  }
`;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    flex: 10,
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  flexOne: {
    flex: 1,
  },
  welcomeBack: {
    fontSize: 30,
    textAlign: "center",
  },
  dph: {
    textAlign: "center",
    fontSize: 20,
  },
  explanation: {
    textAlign: "center",
    fontSize: 12,
    overflow: "scroll",
  },
  sprite: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: -1,
  },
  trackWorkout: {
    flex: 1,
    width: "30%",
  },
  icon: {
    position: "absolute",
    right: "1%",
    top: "1%",
  },
  emailText: {
    color: "blue",
    textAlign: "center",
  },
  button: {
    fontSize: 14,
  },
});
type NavigationProps = { params: { username: string } };
const User: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { username } = route.params;
  const [strengthModalVisible, setStrengthModalVisible] = useState(false);
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  useUserAnalytics({ strengthModalVisible, bodystatsModalVisible, workoutModalVisible });

  const [fetchStrength, { data: exerciseData, loading }] = useLazyQuery(STRENGTH);
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.row}>
        <Ionicons style={styles.icon} onPress={() => setBodystatsModalVisible(true)} size={25} name="settings-sharp" />
      </View>
      <View style={styles.flexOne}>
        {exerciseData && exerciseData.calculateStrengthStats ? (
          <View>
            <Text style={styles.explanation}>{`Damage Per Hit = Stronger than ${exerciseData.calculateStrengthStats.averageStrength}% * ${exerciseData.calculateStrengthStats.numExercises} exercise${
              exerciseData.calculateStrengthStats.numExercises === 1 ? "" : "'s"
            } tracked`}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.row}>
        <Text style={globalStyles.text}>
          If you have any question related to the app or the study (e.g. to withdraw) don't hesitate to contact me:{" "}
          <Text style={styles.emailText} onPress={() => Linking.openURL("mailto:saksi.eerik@gmail.com")}>
            saksi.eerik@gmail.com
          </Text>
        </Text>
      </View>
      <ExerciseModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} refetchParent={fetchStrength} />
      <WorkoutModal visible={workoutModalVisible} setVisible={setWorkoutModalVisible} username={username} skillTitle={"intermediate"} />
      <View style={styles.sprite}>{(exerciseData && exerciseData.averageStrength) || !loading ? <SpriteSelector aspectRatio={1.2} spriteName={"intermediate"} /> : <ActivityIndicator />}</View>
    </SafeAreaView>
  );
};
export default User;
