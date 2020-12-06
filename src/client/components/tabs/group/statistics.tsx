import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, Text, StyleSheet, View } from "react-native";
import TimeAgo from "react-timeago";
import { generateShadow } from "react-native-shadow-generator";

const STATS = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      usersByGroupname {
        nodes {
          workoutsByUsername {
            nodes {
              createdAt
              averageRir
              sets
              username
              hits
            }
          }
          userExercisesByUsername {
            nodes {
              username
              slugName
              updatedAt
              repetitions
              liftmass
              strongerpercentage
            }
          }
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    ...generateShadow(10),
    margin: "1%",
  },
  col: {
    flex: 1,
  },
  centeredText:{
    textAlign: 'center'
  }
});

function sort_by_date(a, b) {
  const time_a = a.createdAt ? new Date(a.createdAt).getTime() : new Date(a.updatedAt).getTime();
  const time_b = b.createdAt ? new Date(b.createdAt).getTime() : new Date(b.updatedAt).getTime();
  return time_b - time_a;
}

type NavigationProps = { params: { groupname: string } };
const Statistics: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const [statsList, setStatsList] = useState<any[]>([]);
  const { groupname } = route.params;
  useQuery(STATS, {
    variables: { groupname },
    //we need to sort the data with respect to updatedAt or createdAt
    onCompleted: (data) => {
      //sort the workout entries and user exercise entries with respect to themselves
      //iterate over all users
      //console.log(data.group.usersByGroupname.nodes)
      const allStats = data.group.usersByGroupname.nodes
        .map((user) => {
          return user.workoutsByUsername.nodes.concat(user.userExercisesByUsername.nodes);
        })
        .flat();
      allStats.sort(sort_by_date);
      setStatsList(allStats);
    },
  });
  console.log(statsList);
  return (
    <FlatList
      data={statsList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        item["__typename"] === "Workout" ? (
          <View style={styles.container}>
            <View style={styles.row}>
              <Text>{`Workout by ${item.username} `}</Text>
              <TimeAgo date={item.createdAt} component={Text} />
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style = { styles.centeredText }>{`${item.averageRir} reps in reserve`} </Text>
              </View>
              <View style={styles.col}>
                <Text style = { styles.centeredText }>{`${item.sets} sets`} </Text>
              </View>
              <View style={styles.col}>
                <Text style = { styles.centeredText }>{`${item.hits} enemy hits`} </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.row}>
            <TimeAgo date={item.updatedAt} component={Text} />
          </View>
        )
      }
    />
  );
};
export default Statistics;
