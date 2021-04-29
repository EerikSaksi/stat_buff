import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import SpriteBattle from "../../sprites/sprite_battle";

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
    width: "80%",
  },
});
const WorkoutModalAttack: React.FC<{ hits: number; skillTitle: string | undefined; setVisible: (val: boolean) => void; data: any, dph: number }> = ({ hits, skillTitle, setVisible, data, dph }) => {
  const [deliveredHits, setDeliveredHits] = useState(0);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", }}>
      <Text style={styles.text}>{`${deliveredHits} hit${deliveredHits === 1 ? "" : "s"}: ${(dph * deliveredHits).toFixed(2)} total damage.`}</Text>
        <SpriteBattle
          deliveredHits={deliveredHits}
          setDeliveredHits={setDeliveredHits}
          skillTitle={skillTitle}
          dph={dph}
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
