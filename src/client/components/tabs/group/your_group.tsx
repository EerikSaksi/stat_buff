import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SpriteSelector from "../../../sprites/sprite_selector";
import Loading from "../../../util_components/loading";

const ENEMY_STATS = gql`
  query($groupname: String!) {
    activeEnemyStat(groupname: $groupname) {
      currentHealth
      enemyLevel
      enemyByEnemyLevel {
        maxHealth
        name
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sprite: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  heading: {
    fontSize: 30
  },
  subheading: {
    fontSize: 20
  }
});

const YourGroup: React.FC<{ groupname: string }> = ({ groupname }) => {
  const { data } = useQuery(ENEMY_STATS, {
    variables: { groupname },
  });
  if (!data) {
    return <Loading />;
  }
  const { currentHealth, enemyLevel, enemyByEnemyLevel } = data.activeEnemyStat;
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>{`You're a part of "${groupname}"`}</Text>
      </View>
      <View style={styles.container}>
        <Text style = { styles.heading }>{enemyByEnemyLevel.name}</Text>
      </View>
      <View style={styles.container}>
        <Text style = { styles.subheading }>{`Health: ${currentHealth} / ${enemyByEnemyLevel.maxHealth}`}</Text>
      </View>
      <View style={styles.sprite}>
        <SpriteSelector spriteName="fire" />
      </View>
    </View>
  );
};
export default YourGroup;
