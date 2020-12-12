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
        battlesByGroupnameAndBattleNumber {
          nodes {
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
  const { data } = useQuery(ENEMY_STATS, {
    variables: { username },
  });
  const { data: strengthData } = useQuery(STRENGTH);
  const [deliveredHits, setDeliveredHits] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);
  useEffect(() => {
    if (strengthData && strengthData.strengthStats) {
      setTotalDamage(deliveredHits * strengthData.strengthStats.DPH);
    }
  }, [deliveredHits, strengthData]);

  const [playerAnimation, setPlayerAnimation] = useState<Animation | undefined>("idle");
  const [enemyAnimation, setEnemyAnimation] = useState<Animation | undefined>("idle");
  const playerAnimationFinished = useCallback(() => {
    if (deliveredHits < hits) {
      setEnemyAnimation("idle");
      setEnemyAnimation("onHit");
      setDeliveredHits((deliveredHits) => deliveredHits < hits ? deliveredHits + 1 : deliveredHits );
    }
  }, [hits, deliveredHits]);

  const enemyAnimationFinished = useCallback(() => {
    setPlayerAnimation("idle");
    setPlayerAnimation("attackOrDie");
    setEnemyAnimation("idle");
  }, []);

  useEffect(() => {
    enemyAnimationFinished();
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
          <SpriteHealthBar maxHealth={data.user.groupByGroupname.battlesByGroupnameAndBattleNumber.nodes[0].enemyByEnemyLevel.maxHealth} currentHealth={data.user.groupByGroupname.battlesByGroupnameAndBattleNumber.nodes[0].currentHealth - totalDamage} style = {{width: '70%' }} />
          <SpriteSelector aspectRatio={0.7} spriteName={"Earth Golem"} currentAnimation={enemyAnimation} animationFinished={enemyAnimationFinished} />
        </View>
      </View>
    </React.Fragment>
  );
};
export default WorkoutModalAttack;
