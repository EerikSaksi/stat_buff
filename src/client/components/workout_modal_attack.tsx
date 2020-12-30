import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import SpriteBattle from "../sprites/sprite_battle";
import Loading from "../util_components/loading";

const STRENGTH = gql`
  query($username: String) {
    calculateStrengthStats(inputUsername: $username) {
      dph
    }
  }
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
    width: '80%'
  },
});
const WorkoutModalAttack: React.FC<{ hits: number; skillTitle: string | undefined; username: string; setVisible: (val: boolean) => void; data: any }> = ({
  hits,
  skillTitle,
  username,
  setVisible,
  data,
}) => {
  //fetch strength stats. If we also loaded enemy starts, then start hitting
  const { data: strengthData } = useQuery(STRENGTH, {
    variables: { username },
    fetchPolicy: "no-cache",
  });
  const [deliveredHits, setDeliveredHits] = useState(0);
  if (!strengthData) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <View style={{  justifyContent: 'center', alignItems: 'center', width: '80%', height: '80%' }}>
        <Text style={styles.text}>{`${deliveredHits} hit${deliveredHits === 1 ? "" : "s"}: ${(strengthData.calculateStrengthStats.dph * deliveredHits).toFixed(2)} total damage.`}</Text>
        <SpriteBattle
          deliveredHits={deliveredHits}
          setDeliveredHits={setDeliveredHits}
          skillTitle={skillTitle}
          dph={strengthData.calculateStrengthStats.dph}
          currentHealth={data.user.groupByGroupname.battleByNameAndBattleNumber.currentHealth}
          maxHealth={data.user.groupByGroupname.battleByNameAndBattleNumber.maxHealth}
          enemyName={data.user.groupByGroupname.battleByNameAndBattleNumber.enemyByEnemyLevel.name}
          hits={hits}
        />
        {hits === deliveredHits ? <Button title="Close" onPress={() => setVisible(false)} /> : <Button title="Skip animations" onPress={() => setDeliveredHits(hits)} />}
      </View>
    </React.Fragment>
  );
};
export default WorkoutModalAttack;
