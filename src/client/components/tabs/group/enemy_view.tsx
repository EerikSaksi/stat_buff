import { gql, useLazyQuery, useQuery, } from "@apollo/client";
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import SpriteSelector from "../../../sprites/sprite_selector";
import Loading from "../../../util_components/loading";
import TimeAgo from "react-timeago";
import SpriteHealthBar from "../../../sprites/sprite_health_bar";
import { useFocusEffect } from '@react-navigation/native';

const ENEMY_STATS = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      nodeId
      battleByNameAndBattleNumber{
        nodeId
        enemyLevel
        battleNumber
        currentHealth
        createdAt
        enemyByEnemyLevel {
          nodeId
          maxHealth
          name
        }
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
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  sprite: {
    flex: 2,
    justifyContent: "flex-end",
    textAlign: 'center'
  },
  heading: {
    fontSize: 30,
    zIndex: 1,
    textAlign: 'center'
  },
  subheading: {
    fontSize: 20,
  },
  time: {
    fontSize: 16,
  },
});

type NavigationProps = { params: { groupname: string } };
const EnemyView: React.FC<{ route: NavigationProps }> = ({ route }) => {
  
  useFocusEffect(
    useCallback(() => {
      console.log('fetched')
      fetchEnemyStats()
    }, [])
  );
  const { groupname } = route.params;
  const [displayDate, setDisplayDate] = useState<Date | undefined>(undefined);
  const [fetchEnemyStats, { data }] = useLazyQuery(ENEMY_STATS, {
    variables: { groupname },
    onCompleted: () => {
      var expiry = new Date(data.group.battleByNameAndBattleNumber.createdAt);
      expiry.setDate(expiry.getDate() + 7);
      setDisplayDate(expiry);
    },
  });

  if (!data) {
    return <Loading />;
  }
  const { currentHealth, enemyLevel, enemyByEnemyLevel } = data.group.battleByNameAndBattleNumber;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>{`Level ${enemyLevel}: ${enemyByEnemyLevel.name}`}</Text>
      </View>
      <View style={styles.sprite}>
        <SpriteHealthBar currentHealth={currentHealth} maxHealth={enemyByEnemyLevel.maxHealth} />
        <SpriteSelector spriteName={enemyByEnemyLevel.name} />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Resets </Text>
          {displayDate ? <TimeAgo date={displayDate!} component={Text} /> : undefined}
          <Text> (if not yet killed)</Text>
        </View>
      </View>
    </View>
  );
};
export default EnemyView;
