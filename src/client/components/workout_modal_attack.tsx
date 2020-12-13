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
  query {
    strengthStats {
      DPH
    }
  }
`;

type Animation = "idle" | "onHit" | "attackOrDie";
const WorkoutModalAttack: React.FC<{ hits: number; skillTitle: string | undefined; username: string; setVisible: (val: boolean) => void }> = ({ hits, skillTitle, username, setVisible }) => {

  //fetch enemy stats. If we also loaded player strength stats, then start hitting
  const { data } = useQuery(ENEMY_STATS, {
    variables: { username },
    onCompleted: () => {if (strengthData) enemyAnimationFinished()}
  });


  //fetch strength stats. If we also loaded enemy starts, then start hitting
  const { data: strengthData } = useQuery(STRENGTH, {
    onCompleted: () => {if (data) enemyAnimationFinished()}
  });
  const [deliveredHits, setDeliveredHits] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);

  //store total dealt damage (updated whenever the user hits)
  useEffect(() => {
    if (strengthData && strengthData.strengthStats) {
      setTotalDamage(deliveredHits * strengthData.strengthStats.DPH);
    }
  }, [deliveredHits, strengthData]);


  //these denote the current animation that the sprite should perform
  const [playerAnimation, setPlayerAnimation] = useState<Animation | undefined>("idle");
  const [enemyAnimation, setEnemyAnimation] = useState<Animation | undefined>("idle");

  //the onFinish hook of the enemy sprite calls this
  const playerAnimationFinished = useCallback(() => {
    if (data && data.user &&  data.user.groupByGroupname.battleByNameAndBattleNumber.currentHealth < totalDamage){
      setEnemyAnimation("attackOrDie")
    }
    else if (deliveredHits < hits) {
      //set toi idle and back to the animation in order to trigger a state change
      setEnemyAnimation("idle");
      setEnemyAnimation("onHit");
      setDeliveredHits((deliveredHits) => deliveredHits < hits ? deliveredHits + 1 : deliveredHits );
    }
  }, [hits, deliveredHits]);


  //the onFinish hook of the player sprite calls this. This results in a loop where the sprites wait for each others animations to finish
  const enemyAnimationFinished = useCallback(() => {
    setPlayerAnimation("idle");
    setPlayerAnimation("attackOrDie");
    setEnemyAnimation("idle");
  }, []);


  if (!data || !strengthData) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <View style={styles.textView}>
        <Text style={styles.text}>{`${deliveredHits} hit${deliveredHits > 1 ? "s" : ""}: ${totalDamage.toFixed(2)} total damage.`}</Text>
      </View>
      <View style={styles.textView}>
        {
          hits === deliveredHits
          ?
          <Button title="Close" onPress={() => setVisible(false)} />
          :
          <Button title="Skip animations" onPress={() => setDeliveredHits(hits)} />
        }
      </View>
      <View style={styles.sprites}>
        <View style={styles.sprite}>
          <SpriteSelector aspectRatio={0.7} spriteName={skillTitle} currentAnimation={playerAnimation} animationFinished={playerAnimationFinished} />
        </View>
        <View style={styles.sprite}>
          <SpriteHealthBar maxHealth={data.user.groupByGroupname.battleByNameAndBattleNumber.enemyByEnemyLevel.maxHealth} currentHealth={data.user.groupByGroupname.battleByNameAndBattleNumber.currentHealth - totalDamage} style = {{width: '70%' }} />
          <SpriteSelector aspectRatio={0.7} spriteName={"Earth Golem"} currentAnimation={enemyAnimation} animationFinished={enemyAnimationFinished} />
        </View>
      </View>
    </React.Fragment>
  );
};
export default WorkoutModalAttack;
