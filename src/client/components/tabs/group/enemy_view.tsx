import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import SpriteSelector from "../../../sprites/sprite_selector";
import Loading from "../../../util_components/loading";
import TimeAgo from "react-timeago";

const ENEMY_STATS = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      battlesByGroupnameAndBattleNumber {
        nodes {
          enemyLevel
          battleNumber
          currentHealth
          createdAt
          enemyByEnemyLevel {
            maxHealth
            name
          }
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
  },
  heading: {
    fontSize: 30,
    zIndex: 1,
  },
  subheading: {
    fontSize: 20,
  },
  time: {
    fontSize: 16,
  },
});
const pad = (val: number): string => {
  if (val < 10) {
    return "0" + val.toString();
  }
  return val.toString();
};

type NavigationProps = { params: { groupname: string } };
const EnemyView: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { groupname } = route.params;
  const [seconds, setSeconds] = useState<number | undefined>(undefined);
  const [displayDate, setDisplayDate] = useState<Date | undefined>(undefined);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds ? seconds - 1 : undefined));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const { data } = useQuery(ENEMY_STATS, {
    variables: { groupname },
    onCompleted: () => {
      var expiry = new Date(data.group.battlesByGroupnameAndBattleNumber.nodes[0].createdAt);
      expiry.setDate(expiry.getDate() + 7);
      setDisplayDate(expiry);
    },
  });
  if (!data) {
    return <Loading />;
  }
  const { currentHealth, enemyLevel, enemyByEnemyLevel } = data.group.battlesByGroupnameAndBattleNumber.nodes[0];
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>{`Level ${enemyLevel}: ${enemyByEnemyLevel.name}`}</Text>
      </View>
      <View style={styles.sprite}>
        <SpriteSelector spriteName={enemyByEnemyLevel.name} />
      </View>
      <View style={styles.container}>
        <Text style={styles.subheading}>{`Health: ${currentHealth} / ${enemyByEnemyLevel.maxHealth}`}</Text>
        <View style = { styles.row }>
          <Text>Resets </Text>
          {displayDate ? <TimeAgo date={displayDate!} component={Text} /> : undefined}
          <Text> (if not yet killed)</Text>
        </View>
      </View>
    </View>
  );
};
export default EnemyView;
