import { gql, useMutation } from "@apollo/client";
import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import SpriteSelector from "../../../sprites/sprite_selector";
import Loading from "../../../util_components/loading";
import TimeAgo from "react-timeago";
import SpriteHealthBar from "../../../sprites/sprite_health_bar";
import { useFocusEffect } from "@react-navigation/native";
import globalStyles from "../../../style/global";

const ENEMY_STATS = gql`
  mutation {
    getBattleAndCheckExpiry(input: {}) {
      battle{
        nodeId
        enemyLevel
        battleNumber
        currentHealth
        createdAt
        maxHealth
        enemyByEnemyLevel {
          nodeId
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
  sprite: {
    flex: 2,
    justifyContent: "flex-end",
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    zIndex: 1,
    textAlign: "center",
  },
  subheading: {
    fontSize: 20,
  },
  time: {
    fontSize: 16,
  },
});

const EnemyView: React.FC = () => {
  useFocusEffect(
    useCallback(() => {
      fetchEnemyStats();
    }, [])
  );
  const [displayDate, setDisplayDate] = useState<Date | undefined>(undefined);
  const [fetchEnemyStats, { data }] = useMutation(ENEMY_STATS, {
    onCompleted: (data) => {
      if (data.getBattleAndCheckExpiry.battle) {
        var expiry = new Date(data.getBattleAndCheckExpiry.battle.createdAt);
        expiry.setDate(expiry.getDate() + 7);
        setDisplayDate(expiry);
      }
    },
  });
  if (!data) {
    return <Loading />;
  }
  if (!data.getBattleAndCheckExpiry.battle) {
    return (
      <View style={styles.container}>
        <Text>You need at least two members to start a battle.</Text>
      </View>
    );
  }
  const { currentHealth, enemyLevel, enemyByEnemyLevel, maxHealth } = data.getBattleAndCheckExpiry.battle;
  return (
    <View style={styles.container}>
      <View style={globalStyles.row}>
        <Text style={styles.heading}>{`Level ${enemyLevel}: ${enemyByEnemyLevel.name}`}</Text>
      </View>
      <View style={styles.sprite}>
        <SpriteHealthBar currentHealth={currentHealth} maxHealth={maxHealth} />
        <SpriteSelector spriteName={enemyByEnemyLevel.name} />
      </View>
      <View style={styles.container}>
        <View style={globalStyles.row}>
          <Text>Resets </Text>
          {displayDate ? <TimeAgo date={displayDate!} component={Text} /> : undefined}
          <Text> (if not yet killed)</Text>
        </View>
      </View>
    </View>
  );
};
export default EnemyView;
