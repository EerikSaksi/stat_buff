import React, { useCallback, useState } from "react";
import { gql, useLazyQuery, useQuery} from "@apollo/client";
import BattlePicker from "./battle_picker";
import { View, StyleSheet, Text, Switch, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ListItemContainer from "../../list_item_container";

const ALL_WORKOUTS = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      nodeId
      battlesByGroupname {
        nodes {
          nodeId
          workoutsByGroupnameAndBattleNumber {
            nodes {
              nodeId
              totalDamage
              username
            }
          }
        }
      }
    }
  }
`;
const MEMBERS = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      nodeId
      usersByGroupname {
        nodes {
          nodeId
          username
        }
      }
    }
  }
`;
const WORKOUTS_BY_BATTLE = gql`
  query($groupname: String!, $battleNumber: Int!) {
    battle(groupname: $groupname, battleNumber: $battleNumber) {
      nodeId
      workoutsByGroupnameAndBattleNumber {
        nodes {
          nodeId
          username
          totalDamage
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
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    flex: 2,
  },
  listContainer: {
    flex: 10,
  },
  listText: {
    fontSize: 20,
    textAlign: "center",
  },
  listHeading: {
    fontSize: 30,
    textAlign: "center",
  },
});

//convert all passed workout nodes to [username, totalDamage] pairs ordered by totalDamage
type workoutNode = { username: string; totalDamage: number };
const sortByTotalDamage = (data: any, members: string[]) => {
  var dict = {};
  //initialize all members to 0 damage
  members.forEach((username) => (dict[username] = 0));
  //accumulate damage
  data.forEach((node: workoutNode) => {
    dict[node.username] += node.totalDamage;
  });
  // Create items array
  var asArray = Object.keys(dict).map((username): [string, number] => {
    return [username, dict[username].toFixed(2)];
  });
  //sort descending by total damage
  asArray.sort((a, b) => b[1] - a[1]);
  return asArray;
};

type NavigationProps = { params: { groupname: string } };
const Members: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { groupname } = route.params;
  const [battleNumber, setBattleNumber] = useState<number | undefined>(undefined);
  const [showAllStats, setShowAllStats] = useState<boolean>(false);
  const [usersOrderedByDamage, setUsersOrderedByDamage] = useState<[string, number][]>();

  //fetch the workouts by current battle by default
  const [fetchWorkoutsByBattle] = useLazyQuery(WORKOUTS_BY_BATTLE, {
    variables: { groupname, battleNumber: battleNumber },
    onCompleted: (data) => {
      const memberUsernames = memberData.group.usersByGroupname.nodes.map((node) => node.username);
      setUsersOrderedByDamage(sortByTotalDamage(data.battle.workoutsByGroupnameAndBattleNumber.nodes, memberUsernames));
    },
  });
  const [fetchAllWorkouts] = useLazyQuery(ALL_WORKOUTS, {
    variables: { groupname, battleNumber },
    onCompleted: (data) => {
      const allWorkouts = data.group.battlesByGroupname.nodes.flatMap((node) => node.workoutsByGroupnameAndBattleNumber.nodes);
      const memberUsernames = memberData.group.usersByGroupname.nodes.map((node) => node.username);
      setUsersOrderedByDamage(sortByTotalDamage(allWorkouts, memberUsernames));
    },
  });
  const { data: memberData } = useQuery(MEMBERS, {
    variables: { groupname },
  });
  useFocusEffect(
    useCallback(() => {
      if (memberData) {
        //if we have a valid battleNumber and we want stats on that battle
        if (battleNumber && !showAllStats) {
          fetchWorkoutsByBattle();
        } else if (showAllStats) {
          fetchAllWorkouts();
        }
      }
    }, [battleNumber, showAllStats, memberData])
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text>All battles</Text>
            </View>
            <View style={styles.col}>
              <Switch value={showAllStats} onValueChange={(v) => setShowAllStats(v)} />
            </View>
          </View>
        </View>
        <View style={styles.picker}>
          <BattlePicker battleNumber={battleNumber} setBattleNumber={setBattleNumber} groupname={groupname} />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={usersOrderedByDamage}
          keyExtractor={(item, index) => item[0] + item[1].toString()}
          renderItem={({ item }) => (
            <ListItemContainer>
              <View style={styles.row}>
                <Text style={styles.listHeading}>{`${item[0]}`}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.listText}>{`${item[1]} damage in ${showAllStats ? "all battles" : "Battle " + battleNumber} `}</Text>
              </View>
            </ListItemContainer>
          )}
        />
      </View>
    </View>
  );
};
export default Members;
