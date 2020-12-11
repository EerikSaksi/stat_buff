import {gql, useQuery} from "@apollo/client";
import React, {useCallback, useState, useEffect} from "react";
import { View, StyleSheet} from "react-native";
import SpriteSelector from "../sprites/sprite_selector";
import Loading from "../util_components/loading";

const styles = StyleSheet.create({
  sprites: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'flex-end',
  },
  sprite: {
    flex: 1,
    justifyContent: 'center',
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
  const [playerAnimation, setPlayerAnimation] = useState<Animation | undefined>('idle')
  const [enemyAnimation, setEnemyAnimation] = useState<Animation | undefined >('idle')
  const playerAnimationFinished = useCallback(() => {
    setEnemyAnimation('idle')
    setEnemyAnimation('onHit')
  }, [])

  const enemyAnimationFinished = useCallback(() => {
    setPlayerAnimation('idle')
    setPlayerAnimation('attackOrDie')
  }, [])
  
  useEffect(() => {
    enemyAnimationFinished()
  }, [])

  if (!data){
    return (<Loading/>)
  }
  return (
    <View style={styles.sprites}>
      <View style={styles.sprite}>
        <SpriteSelector aspectRatio={0.7} spriteName={skillTitle} currentAnimation = {playerAnimation} animationFinished = {playerAnimationFinished} />
      </View>
      <View style={styles.sprite}>
        <SpriteSelector aspectRatio={0.7} spriteName={'Fire Devil'} currentAnimation = {enemyAnimation} animationFinished = {enemyAnimationFinished} />
      </View>
    </View>
  );
};
export default WorkoutModalAttack;

