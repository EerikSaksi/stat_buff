import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Text, View, StatusBar, StyleSheet, Linking, SafeAreaView } from "react-native";
import Loading from "../../../util_components/loading";
import ExerciseModal from "./exercise_modal";
import SpriteSelector from "../../../sprites/sprite_selector";
import BodyStatsModal from "./bodystats_modal";
import { Button } from "react-native-elements";
import useSkillTitle from "../../../hooks/use_skill_title";
import WorkoutModal from "../../workout_modal";
import useUserAnalytics from "../../../hooks/analytics/use_user_analytics";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../../style/global";

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
    marginTop: '5%'
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
});
type NavigationProps = { params: { username: string } };
const User: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { username } = route.params;
  const [strengthModalVisible, setStrengthModalVisible] = useState(false);
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  useUserAnalytics({ strengthModalVisible, bodystatsModalVisible, workoutModalVisible });

  const { data } = useQuery(USER, {
    variables: { username },
  });
  const [fetchStrength, { data: exerciseData, loading }] = useLazyQuery(STRENGTH);
  const [fetchBodyStats, { data: userBodyStats }] = useLazyQuery(USER_BODY_STATS, {
    variables: { username },
    onCompleted: (data) => {
      if (!data.bodystat) {
        setBodystatsModalVisible(true);
      }
    },
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
    <SafeAreaView style={styles.root}>
      <Ionicons style={styles.icon} onPress={() => setBodystatsModalVisible(true)} size={25} name="settings-sharp" />
      <View style={styles.row}>
        <Button style={styles.flexOne} disabled={!(userBodyStats && userBodyStats.bodystat)} title="Strengthen Character" onPress={() => setStrengthModalVisible(true)} />
        <Button disabled={!(userBodyStats && userBodyStats.bodystat)} title="Deal Damage" onPress={() => setWorkoutModalVisible(true)} />
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
        <Text style={globalStyles.text}>
          If you have any question related to the app or the study (e.g. to withdraw) don't hesitate to contact me:{" "}
          <Text style={styles.emailText} onPress={() => Linking.openURL("mailto:saksi.eerik@gmail.com")}>
            saksi.eerik@gmail.com
          </Text>
        </Text>
      </View>
      <ExerciseModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} refetchParent={fetchStrength} />
      <BodyStatsModal visible={bodystatsModalVisible} setVisible={setBodystatsModalVisible} username={username} refetchParent={fetchBodyStats} />
      <WorkoutModal visible={workoutModalVisible} setVisible={setWorkoutModalVisible} username={username} skillTitle={"noob"} />
      <View style={styles.sprite}>{(exerciseData && exerciseData.averageStrength) || !loading ? <SpriteSelector aspectRatio={1.2} spriteName={skillTitle} /> : <Loading />}</View>
    </SafeAreaView>
  );
};
export default User;
