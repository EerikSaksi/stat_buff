import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import SpriteSelector from "../../sprites/sprite_selector";
import SpriteBattle from "../../sprites/sprite_battle";
const styles = StyleSheet.create({
  threeCharacters: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  spriteContainer: {
    flex: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spriteAlignedEnd: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  topContainer: {
    width: "100%",
    top: StatusBar.currentHeight,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
const AttackingCharacters: React.FC = () => {
  const [noviceAttacking, setNoviceAttacking] = useState<boolean | undefined>(true);
  const [deliveredHits, setDeliveredHits] = useState(0);
  //this is the main driver for transitions. It activates the current transition with a switch statement and then sets the transition to next
  useEffect(() => {
    const swapAttacker = async () => {
      if (noviceAttacking && deliveredHits === 4) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDeliveredHits(0);
        setNoviceAttacking(false);
      }
      //no one is attacking
      else if (!noviceAttacking && deliveredHits === 3){
        await new Promise((resolve) => setTimeout(resolve, 500));
        setNoviceAttacking(undefined);
      }
    };
    swapAttacker();
  }, [deliveredHits, noviceAttacking]);
  return (
    <React.Fragment>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Join a team and track workouts to fight your team's enemy!</Text>
      </View>
      <View style={styles.spriteContainer}>
        <View style={styles.spriteAlignedEnd}>
          {noviceAttacking ? (
            <SpriteBattle deliveredHits={deliveredHits} dph={1.8} enemyName="Fire Devil" maxHealth={10} currentHealth={10} skillTitle="advanced" setDeliveredHits={setDeliveredHits} hits={4} />
          ) : (
            <SpriteSelector aspectRatio={0.7} spriteName={"advanced"} />
          )}
        </View>
        <View style={styles.spriteAlignedEnd}>
          {noviceAttacking === false ? (
            <SpriteBattle deliveredHits={deliveredHits} dph={1.2} enemyName="Fire Devil" maxHealth={10} currentHealth={2.8} skillTitle="novice" setDeliveredHits={setDeliveredHits} hits={3} />
          ) : (
            <SpriteSelector aspectRatio={0.7} spriteName={"novice"} />
          )}
        </View>
      </View>
    </React.Fragment>
  );
};
export default AttackingCharacters;
