import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery} from "@apollo/client";
import { Text, View, StatusBar } from "react-native";
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
  query($username: String) {
    calculateStrengthStats(inputUsername: $username) {
      averageStrength
      numExercises
      dph
    }
  }
`;


type NavigationProps = { params: { username: string } };
const User: React.FC<{route: NavigationProps}> = ({route}) => {
  const {username} = route.params
  const [strengthModalVisible, setStrengthModalVisible] = useState(false);
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const { data } = useQuery(USER, {
    variables: { username },
  });

  const [fetchStrength, { data: exerciseData, loading }] = useLazyQuery(STRENGTH, {
    variables: { username },
  });
  const [fetchBodyStats, { data: userBodyStats }] = useLazyQuery(USER_BODY_STATS, {
    variables: { username },
    onCompleted: (data) => {
      //haven't input their body stats, then open the option
      if (!data.bodystat) {
        setBodystatsModalVisible(true);
      }
    },
  });
  useEffect(() => {
    fetchBodyStats();
    fetchStrength();
  }, []);
  //const { skillTitle } = useSkillTitle(exerciseData && exerciseData.calculateStrengthStats ? exerciseData.calculateStrengthStats.dph : undefined);
  const skillTitle = "advanced";
  if (!data) {
    return <Loading />;
  }
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 10,
        alignItems: "center",
        top: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Button style={{ flex: 1, zIndex: 100 }} title="Update Body Stats" onPress={() => setBodystatsModalVisible(true)} />
        <Button style={{ flex: 1 }} disabled={!(userBodyStats && userBodyStats.bodystat)} title="Update Lifts" onPress={() => setStrengthModalVisible(true)} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}> {`Welcome back, ${username}.`} </Text>
        {exerciseData && exerciseData.calculateStrengthStats ? (
          <View>
            <Text style={{ textAlign: "center", fontSize: 20 }}>{`Your character has DPH: ${exerciseData.calculateStrengthStats.dph}`}</Text>
            <Text style={{ textAlign: "center", fontSize: 12, overflow: "scroll" }}>{`Damage Per Hit = Stronger than ${exerciseData.calculateStrengthStats.averageStrength}% * ${
              exerciseData.calculateStrengthStats.numExercises
            } exercise${exerciseData.calculateStrengthStats.numExercises === 1 ? "" : "'s"} tracked`}</Text>
          </View>
        ) : null}
      </View>
      <ExerciseModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} refetchParent={fetchStrength} />
      <BodyStatsModal visible={bodystatsModalVisible} setVisible={setBodystatsModalVisible} username={username} refetchParent={fetchBodyStats} />
      <WorkoutModal visible={workoutModalVisible} setVisible={setWorkoutModalVisible} username={username} skillTitle={skillTitle} />
      <View style={{ flex: 5, justifyContent: "flex-end", alignItems: "center", zIndex: -1 }}>
        {(exerciseData && exerciseData.averageStrength) || !loading ? <SpriteSelector spriteName={skillTitle} /> : <Loading />}
      </View>
      <View style={{ flex: 1, width: "30%" }}>
        <Button disabled={!(exerciseData && exerciseData.calculateStrengthStats)} title="Log workout" onPress={() => setWorkoutModalVisible(true)} />
      </View>
    </View>
  );
};
export default User;
