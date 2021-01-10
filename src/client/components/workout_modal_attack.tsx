import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import SpriteBattle from "../sprites/sprite_battle";
import Loading from "../util_components/loading";

const STRENGTH = gql`
  query {
    calculateStrengthStats {
      dph
    }
  }
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
    width: "80%",
  },
});
const WorkoutModalAttack: React.FC<{ hits: number; skillTitle: string | undefined; setVisible: (val: boolean) => void; data: any }> = ({ hits, skillTitle, setVisible, data }) => {
  //fetch strength stats. If we also loaded enemy starts, then start hitting
  const { data: strengthData } = useQuery(STRENGTH, {
    fetchPolicy: "no-cache",
  });
  const [deliveredHits, setDeliveredHits] = useState(0);
  if (!strengthData) {
    return <Loading />;
  }
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.text}>{`${deliveredHits} hit${deliveredHits === 1 ? "" : "s"}: ${(strengthData.calculateStrengthStats.dph * deliveredHits).toFixed(2)} total damage.`}</Text>
        <SpriteBattle
          deliveredHits={deliveredHits}
          setDeliveredHits={setDeliveredHits}
          skillTitle={skillTitle}
          dph={strengthData.calculateStrengthStats.dph}
          currentHealth={data.getBattleAndCheckExpiry.battle.currentHealth}
          maxHealth={data.getBattleAndCheckExpiry.battle.maxHealth}
          enemyName={data.getBattleAndCheckExpiry.battle.enemyByEnemyLevel.name}
          hits={hits}
          removeFlex
        />
      {hits === deliveredHits ? <Button title="Close" onPress={() => setVisible(false)} /> : <Button title="Skip animations" onPress={() => setDeliveredHits(hits)} />}
    </View>
  );
};
export default WorkoutModalAttack;
