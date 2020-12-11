import {gql, useQuery} from "@apollo/client";
import React, {useCallback, useState} from "react";
import { View, StyleSheet} from "react-native";
import SpriteSelector from "../sprites/sprite_selector";
import Loading from "../util_components/loading";

const styles = StyleSheet.create({
  sprites: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'flex-end',
    right: '10%'
  },
  sprite: {
    flex: 1,
    justifyContent: 'flex-end'
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
            }
          }
        }
      }
    }
  }
`;

type Animation = "idle" | "onHit" | "attackOrDie";
const WorkoutModalAttack: React.FC<{hits: number, skillTitle: string | undefined, username: string}> = ({hits, skillTitle, username}) => {
  const {data} = useQuery(ENEMY_STATS, {
    variables: {username}
  })
  const [playerAnimations, setPlayerAnimations] = useState<[Animation, number][]>([["attackOrDie", 2]])
  const [enemyAnimations, setEnemyAnimations] = useState<[Animation, number][]>([])
  const enemyTakesHit = useCallback(() => {
    setEnemyAnimations([['onHit', 1]])
  }, [])
  if (!data){
    return (<Loading/>)
  }
  return (
    <View style={styles.sprites}>
      <View style={styles.sprite}>
        <SpriteSelector aspectRatio={0.7} spriteName={skillTitle}  animationsToComplete = {playerAnimations} parentFinishedCallback = {enemyTakesHit} />
      </View>
      <View style={styles.sprite}>
        <SpriteSelector aspectRatio={0.7} spriteName={data.user.groupByGroupname.battlesByGroupnameAndBattleNumber.nodes[0].enemyByEnemyLevel.name} animationsToComplete = {enemyAnimations} />
      </View>
    </View>
  );
};
export default WorkoutModalAttack;

