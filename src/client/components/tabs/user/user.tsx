import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Text, View, StatusBar, StyleSheet, Linking } from "react-native";
import Loading from "../../../util_components/loading";
import ExerciseModal from "./exercise_modal";
import SpriteSelector from "../../../sprites/sprite_selector";
import BodyStatsModal from "./bodystats_modal";
import { Button } from "react-native-elements";
import useSkillTitle from "../../../hooks/use_skill_title";
import WorkoutModal from "../../workout_modal";

const USER_BODY_STATS = gql`
  query($username: String!) {
    bodystat(username: $username) {
      nodeId
      ismale
    }
  }
`;

const USER = gql`
  query user_query($username: String!) {
    user(username: $username) {
      username
      nodeId
    }
  }
`;
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
    top: StatusBar.currentHeight,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  updateBodyStats: {
    flex: 1,
    zIndex: 100,
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
});
type NavigationProps = { params: { username: string } };
const User: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { username } = route.params;
  const [strengthModalVisible, setStrengthModalVisible] = useState(false);
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const { data } = useQuery(USER, {
    variables: { username },
  });
  const [fetchStrength, { data: exerciseData, loading }] = useLazyQuery(STRENGTH);
  const [fetchBodyStats, { data: userBodyStats }] = useLazyQuery(USER_BODY_STATS, {
    variables: { username },
  });
  useEffect(() => {
    fetchBodyStats();
    fetchStrength();
  }, []);
  const { skillTitle } = useSkillTitle(exerciseData && exerciseData.calculateStrengthStats ? exerciseData.calculateStrengthStats.dph : undefined);
  if (!data) {
    return <Loading />;
  }
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Button style={styles.updateBodyStats} title="Update Body Stats" onPress={() => setBodystatsModalVisible(true)} />
        <Button style={styles.flexOne} disabled={!(userBodyStats && userBodyStats.bodystat)} title="Update Lifts" onPress={() => setStrengthModalVisible(true)} />
      </View>
      <View style={styles.flexOne}>
        {exerciseData && exerciseData.calculateStrengthStats ? (
          <View>
            <Text style={styles.dph}>{`${username} has DPH: ${exerciseData.calculateStrengthStats.dph} (${skillTitle})`}</Text>
            <Text style={styles.explanation}>{`Damage Per Hit = Stronger than ${exerciseData.calculateStrengthStats.averageStrength}% * ${exerciseData.calculateStrengthStats.numExercises} exercise${
              exerciseData.calculateStrengthStats.numExercises === 1 ? "" : "'s"
            } tracked`}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.row}>
        <Text style={{ textAlign: "center", color: 'black' }}>
          If you have any question related to the app or the study (e.g. to withdraw) don't hesitate to contact me:{" "}
          <Text style={{ color: "blue", textAlign: "center" }} onPress={() => Linking.openURL("mailto:saksi.eerik@gmail.com")}>
            saksi.eerik@gmail.com
          </Text>
        </Text>
      </View>
      <ExerciseModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} refetchParent={fetchStrength} />
      <BodyStatsModal visible={bodystatsModalVisible} setVisible={setBodystatsModalVisible} username={username} refetchParent={fetchBodyStats} />
      <WorkoutModal visible={workoutModalVisible} setVisible={setWorkoutModalVisible} username={username} skillTitle={'noob'} />
      <View style={styles.sprite}>{(exerciseData && exerciseData.averageStrength) || !loading ? <SpriteSelector spriteName={skillTitle} /> : <Loading />}</View>
      <View style={styles.trackWorkout}>
        <Button disabled={!(exerciseData && exerciseData.calculateStrengthStats)} title="Log workout" onPress={() => setWorkoutModalVisible(true)} />
      </View>
    </View>
  );
};
export default User;
