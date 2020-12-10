import {gql, useQuery} from "@apollo/client";
import React from "react";
import { View, StyleSheet} from "react-native";
import SpriteSelector from "../sprites/sprite_selector";
import Loading from "../util_components/loading";

const styles = StyleSheet.create({
  sprites: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
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

type Animation = "idle" | "onHit" | "dieOrAttack";
const WorkoutModalAttack: React.FC<{hits: number, skillTitle: string, username: string}> = ({hits, skillTitle, username}) => {
  const {data} = useQuery(ENEMY_STATS, {
    variables: {username}
  })
  if (!data){
    return (<Loading/>)
  }
  return (
    <View style={styles.sprites}>
      <View style={{...styles.sprite, backgroundColor: 'blue'}}>
        <SpriteSelector aspectRatio={0.7} spriteName={skillTitle} animationsToComplete = {[]}/>
      </View>
      <View style={styles.sprite}>
        <SpriteSelector aspectRatio={0.7} spriteName={data.user.groupByGroupname.battlesByGroupnameAndBattleNumber.nodes[0].enemyByEnemyLevel.name} />
      </View>
    </View>
  );
};
export default WorkoutModalAttack;

