import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import SpriteSelector from "../../../sprites/sprite_selector";
import Loading from "../../../util_components/loading";
import TimeAgo from "react-timeago";

const ENEMY_STATS = gql`
  query($groupname: String!) {
    group(name: $groupname){
      battlesByGroupnameAndBattleNumber{
        nodes{
          enemyLevel
          battleNumber
          currentHealth
          createdAt
          enemyByEnemyLevel{
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
    flexDirection: 'row'
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

type NavigationProps = {params: {groupname: string}};
const EnemyView: React.FC<{route: NavigationProps}> = ({route}) => {
  const { groupname } = route.params;
  const [seconds, setSeconds] = useState<number | undefined>(undefined);
  const [displayDate, setDisplayDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds ? seconds - 1 : undefined);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (seconds) {
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const displaySeconds = Math.floor(seconds % 60);
      setDisplayDate(
        `${days} days, ${pad(hours)}h:${pad(minutes)}m:${pad(
          displaySeconds
        )}s left to defeat`
      );
    }
  }, [seconds]);
  const { data } = useQuery(ENEMY_STATS, {
    variables: { groupname },
    onCompleted: () => {
      var expiry = new Date(data.group.battlesByGroupnameAndBattleNumber.nodes[0].createdAt);
      expiry.setDate(expiry.getDate() + 7);
      const currentTime = new Date();
      setSeconds((expiry.getTime() - currentTime.getTime()) / 1000);
    },
  });
  if (!data) {
    return <Loading />;
  }
  const { currentHealth, enemyLevel, enemyByEnemyLevel } = data.group.battlesByGroupnameAndBattleNumber.nodes[0];
  return (
    <View style={styles.container}>
      <View style = { styles.row }>
        <Text style = { styles.heading }>
          {`Level ${enemyLevel}: ${enemyByEnemyLevel.name}`}
        </Text>
      </View>
      <View style={styles.sprite}>
        <SpriteSelector spriteName={enemyByEnemyLevel.name} />
      </View>
      <View style={styles.container}>
        <Text
          style={styles.subheading}
        >{`Health: ${currentHealth} / ${enemyByEnemyLevel.maxHealth}`}</Text>
        <TimeAgo date={data.group.battlesByGroupnameAndBattleNumber.nodes[0].createdAt} component={Text}   />
      </View>
    </View>
  );
};
export default EnemyView;
