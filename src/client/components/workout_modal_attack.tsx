import { gql, useQuery } from "@apollo/client";
import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import SpriteHealthBar from "../sprites/sprite_health_bar";
import SpriteSelector from "../sprites/sprite_selector";
import Loading from "../util_components/loading";

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
  },
  sprites: {
    flexDirection: "row",
    flex: 3,
    alignItems: "flex-end",
  },
  sprite: {
    flex: 1,
    justifyContent: "center",
  },
});

const ENEMY_STATS = gql`
  query($username: String!) {
    user(username: $username) {
      groupByGroupname {
        battleByNameAndBattleNumber {
          enemyLevel
          battleNumber
          currentHealth
          createdAt
          enemyByEnemyLevel {
            name
            maxHealth
          }
        }
      }
    }
  }
`;

const STRENGTH = gql`
  query($username: String) {
    calculateStrengthStats(inputUsername: $username){
      dph
    }
  }
`

type Animation = "idle" | "onHit" | "attackOrDie";
const WorkoutModalAttack: React.FC<{ hits: number; skillTitle: string | undefined; username: string; setVisible: (val: boolean) => void }> = ({ hits, skillTitle, username, setVisible }) => {
  //fetch enemy stats. If we also loaded player strength stats, then start hitting
  const { data } = useQuery(ENEMY_STATS, {
    variables: { username },
    onCompleted: () => {
      if (strengthData) setPlayerAnimation("attackOrDie");
    },
    fetchPolicy: "network-only"
  });

  //fetch strength stats. If we also loaded enemy starts, then start hitting
  const { data: strengthData } = useQuery(STRENGTH, {
    variables: {username},
    onCompleted: () => {
      if (data) setPlayerAnimation("attackOrDie");
    },
  });

  const [deliveredHits, setDeliveredHits] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);

  //store total dealt damage (updated whenever the user hits)
  useEffect(() => {
    if (data && strengthData && strengthData.calculateStrengthStats) {
      setTotalDamage(() => {
        const newDamage = deliveredHits * strengthData.calculateStrengthStats.dph;
        //if we killed the enemy just skip to the end
        if (data.user.groupByGroupname.battleByNameAndBattleNumber.currentHealth < newDamage) {
          setDeliveredHits(hits)
        }
        return newDamage;
      });
    }
  }, [deliveredHits, strengthData]);

  //these denote the current animation that the sprite should perform
  const [playerAnimation, setPlayerAnimation] = useState<Animation | undefined>(undefined);
  const [enemyAnimation, setEnemyAnimation] = useState<Animation | undefined>(undefined);

  //the onFinish hook of the player sprite calls this. This results in a loop where the sprites wait for each others animations to finish
  const playerAnimationFinished = useCallback(async () => {
    setEnemyAnimation("onHit");
    setDeliveredHits((deliveredHits) => deliveredHits < hits ? deliveredHits + 1 : deliveredHits);
  }, [totalDamage, data, strengthData, hits]);
  const enemyAnimationFinished = useCallback(async () => {
    //setting the animation to undefined and back to attack triggers a state change
    setPlayerAnimation(undefined);
    setPlayerAnimation("attackOrDie");
    //we only want to trigger an animation repeatedly if the enemy is not doing a dying animation
    setEnemyAnimation(undefined);
  }, [totalDamage, data]);

  if (!data || !strengthData) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <View style={styles.textView}>
        <Text style={styles.text}>{`${deliveredHits} hit${deliveredHits > 1 ? "s" : ""}: ${totalDamage.toFixed(2)} total damage.`}</Text>
      </View>
      <View style={styles.textView}>{hits === deliveredHits ? <Button title="Close" onPress={() => setVisible(false)} /> : <Button title="Skip animations" onPress={() => setDeliveredHits(hits)} />}</View>
      <View style={styles.sprites}>
        <View style={styles.sprite}>
          <SpriteSelector aspectRatio={0.7} spriteName={skillTitle} currentAnimation={playerAnimation} animationFinished={deliveredHits < hits ? playerAnimationFinished : undefined} />
        </View>
        <View style={styles.sprite}>
          <SpriteHealthBar maxHealth={data.user.groupByGroupname.battleByNameAndBattleNumber.enemyByEnemyLevel.maxHealth} currentHealth={data.user.groupByGroupname.battleByNameAndBattleNumber.currentHealth - totalDamage} style={{ width: "70%" }} />
          <SpriteSelector aspectRatio={0.7} spriteName={data.user.groupByGroupname.battleByNameAndBattleNumber.enemyByEnemyLevel.name} currentAnimation={totalDamage < data.user.groupByGroupname.battleByNameAndBattleNumber.currentHealth ? enemyAnimation  : 'attackOrDie'} animationFinished={deliveredHits < hits - 1 ? enemyAnimationFinished : undefined} />
        </View>
      </View>
    </React.Fragment>
  );
};
export default WorkoutModalAttack;
