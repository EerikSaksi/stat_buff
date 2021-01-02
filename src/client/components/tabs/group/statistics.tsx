import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, Text, StyleSheet, View } from "react-native";
import TimeAgo from "react-timeago";
import { unslugify } from "../../../util_components/slug";
import Loading from "../../../util_components/loading";
import BattlePicker from "./battle_picker";
import ListItemContainer from "../../list_item_container";
const STATS = gql`
  query($groupname: String!, $battleNumber: Int!) {
    battle(groupname: $groupname, battleNumber: $battleNumber) {
      nodeId
      workoutsByGroupnameAndBattleNumber {
        nodes {
          nodeId
          createdAt
          averageRir
          sets
          username
          hits
          totalDamage
        }
      }
      userExercisesByGroupnameAndBattleNumber {
        nodes {
          nodeId
          username
          slugName
          createdAt
          repetitions
          liftmass
          strongerpercentage
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  col: {
    flex: 1,
  },
  centeredText: {
    textAlign: "center",
  },
  listTitle: {
    fontSize: 16,
  },
});

function sort_by_date(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

type NavigationProps = { params: { groupname: string } };
const Statistics: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { groupname } = route.params;

  const [statsList, setStatsList] = useState<any[]>([]);
  const [battleNumber, setBattleNumber] = useState<undefined | number>();

  const { loading } = useQuery(STATS, {
    variables: { groupname, battleNumber },
    //we need to sort the data with respect to updatedAt or createdAt
    onCompleted: (data) => {
      const allStats = data.battle.userExercisesByGroupnameAndBattleNumber.nodes.concat(data.battle.workoutsByGroupnameAndBattleNumber.nodes);
      allStats.sort(sort_by_date);
      setStatsList(allStats);
    },
    skip: !battleNumber,
    fetchPolicy: "cache-and-network",
  });
  return (
    <React.Fragment>
      <BattlePicker battleNumber={battleNumber} setBattleNumber={setBattleNumber} groupname={groupname} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={statsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            item["__typename"] === "Workout" ? (
              <ListItemContainer>
                <View style={styles.row}>
                  <Text style={styles.listTitle}>{`${item.username} dealt ${item.totalDamage} damage `}</Text>
                  {/*@ts-ignore*/}
                  <TimeAgo date={item.createdAt} component={Text} style={styles.listTitle} />
                </View>
                <View style={styles.row}>
                  {[`${item.averageRir} reps in reserve`, `${item.sets} sets`, `${item.hits} enemy hits`].map((text, i) => (
                    <View key={i} style={styles.col}>
                      <Text style={styles.centeredText}>{text}</Text>
                    </View>
                  ))}
                </View>
              </ListItemContainer>
            ) : (
              <ListItemContainer>
                <View style={styles.row}>
                  <Text style={styles.listTitle}>{`${unslugify(item.slugName)} updated by ${item.username} `}</Text>
                  {/*@ts-ignore*/}
                  <TimeAgo date={item.createdAt} component={Text} style={styles.listTitle} />
                </View>
                <View style={styles.row}>
                  {[`Stronger than ${item.strongerpercentage}%`, `${item.liftmass}kg`, `${item.repetitions} reps`].map((text, i) => (
                    <View key={i} style={styles.col}>
                      <Text style={styles.centeredText}>{text}</Text>
                    </View>
                  ))}
                </View>
              </ListItemContainer>
            )
          }
        />
      )}
    </React.Fragment>
  );
};
export default Statistics;
