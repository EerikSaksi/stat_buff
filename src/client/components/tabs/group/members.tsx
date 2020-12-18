import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import BattlePicker from "./battle_selector";

const ALL_WORKOUTS = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      nodeId
      usersByGroupname {
        nodes {
          nodeId
          workoutsByUsername {
            nodes {
              nodeId
              totalDamage
            }
          }
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

const sortByTotalDamage = (data: any) => {
  var dict = {}

  //accumulate damage
  data.forEach((node) => {
    dict[node.username] 
      ?
      dict[node.username] += node.totalDamage
      :
      dict[node.username] = node.totalDamage
  }) 

  // Create items array
  var asArray = Object.keys(dict).map((username) => {
    return [username, dict[username]];
  });
  //sort descending by total damage
  asArray.sort((a, b) => b[1] - a[1])
  return asArray
};

type NavigationProps = { params: { groupname: string } };
const Members: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { groupname } = route.params;
  const [battleNumber, setBattleNumber] = useState<number | undefined>(undefined);
  const [usersOrderedByDamage, setUsersOrderedByDamage] = useState([]);

  //fetch the workouts by current battle by default
  useQuery(WORKOUTS_BY_BATTLE, {
    variables: { groupname, battleNumber: 1 },
    skip: !battleNumber,
    onCompleted: (data) => sortByTotalDamage(data.battle.workoutsByGroupnameAndBattleNumber.nodes),
  })

  //useQuery(ALL_WORKOUTS, {
  //  variables: {groupname, battleNumber},
  //  skip: !battleNumber,
  //  onCompleted: (data) => sortByTotalDamage(data.battle.workoutsByGroupnameAndBattleNumber)
  //})
  return <BattlePicker battleNumber={battleNumber} setBattleNumber={setBattleNumber} groupname={groupname} />;
};
export default Members;
