import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { Text, View, StatusBar } from "react-native";
import Loading from "../../../util_components/loading";
import ExerciseModal from "./exercise_modal";
import { usernameVar } from "../../../apollo/cache";
import SpriteSelector from "../../../sprites/sprite_selector";
import BodyStatsModal from "./bodystats_modal";
import { Button } from "react-native-elements";
import useSkillTitle from "../../../hooks/use_skill_title";
import WorkoutModal from "../../workout_modal";

const USER_BODY_STATS = gql`
  query($username: String!) {
    bodystat(username: $username) {
      ismale
    }
  }
`;

const USER = gql`
  query user_query($username: String!) {
    user(username: $username) {
      username
    }
  }
`;
const STRENGTH = gql`
  query {
    strengthStats {
      averageStrength
      numExercises
      DPH
    }
  }
`;

const User: React.FC = () => {
  const username = useReactiveVar(usernameVar);
  const [strengthModalVisible, setStrengthModalVisible] = useState(false);
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const { data } = useQuery(USER, {
    variables: { username },
  });

  const [fetchStrength, { data: exerciseData, loading, }] = useLazyQuery(STRENGTH, {
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
    fetchBodyStats()
    fetchStrength()
  }, [])
  const { skillTitle } = useSkillTitle(exerciseData && exerciseData.strengthStats ? exerciseData.strengthStats.DPH : undefined);
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
        <Button style={{ flex: 1 }} title="Update Body Stats" onPress={() => setBodystatsModalVisible(true)} />
        <Button style={{ flex: 1 }} disabled={!(userBodyStats && userBodyStats.bodystat)} title="Update Lifts" onPress={() => setStrengthModalVisible(true)} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}> {`Welcome back, ${username}.`} </Text>
        {exerciseData && exerciseData.strengthStats ? (
          <View>
            <Text style={{ textAlign: "center", fontSize: 20 }}>{`Your character has DPH: ${exerciseData.strengthStats.DPH}`}</Text>
            <Text style={{ textAlign: "center", fontSize: 12, overflow: "scroll" }}>{`Damage Per Hit = Stronger than ${exerciseData.strengthStats.averageStrength}% * ${exerciseData.strengthStats.numExercises} exercise ${exerciseData.strengthStats.numExercises === 1 ? '' : 's'} tracked`}</Text>
          </View>
        ) : null}
      </View>
      <ExerciseModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} refetchParent={fetchStrength} />
      <BodyStatsModal visible={bodystatsModalVisible} setVisible={setBodystatsModalVisible} username={username} refetchParent={fetchBodyStats} />
      <WorkoutModal visible={workoutModalVisible} setVisible={setWorkoutModalVisible} username={username}  />
      <View style={{ flex: 5, justifyContent: "flex-end",  }}>{(exerciseData && exerciseData.averageStrength) || !loading ? <SpriteSelector spriteName={skillTitle} /> : <Loading />}</View>
      <View style={{ flex: 1, width: "30%" }}>
        <Button disabled={!(exerciseData && exerciseData.strengthStats)} title="Log workout" onPress={() => setWorkoutModalVisible(true)}/>
      </View>
    </View>
  );
};
export default User;
