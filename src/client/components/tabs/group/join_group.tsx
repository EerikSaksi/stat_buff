import React, { useCallback, useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Text, TextInput, View, FlatList, StyleSheet, ScrollView } from "react-native";
import TopView from "../../../util_components/top_view";
import { usernameVar } from "../../../apollo/cache";
import { Button } from "react-native-elements";
import ListItemContainer from "../../list_item_container";
import { Alert } from "react-native";
import PasswordProtectedGroup from "./password_protected_group";

const SEARCH_GROUPS = gql`
  query search_groups($query: String!) {
    groups(filter: { name: { startsWithInsensitive: $query } }, first: 5) {
      nodes {
        nodeId
        name
        isPasswordProtected
        usersByGroupname {
          totalCount
        }
        battleByNameAndBattleNumber {
          nodeId
          enemyLevel
        }
      }
    }
  }
`;
const JOIN_GROUP = gql`
  mutation($inputGroupname: String!, $inputPassword: String) {
    joinGroup(input: { inputGroupname: $inputGroupname, inputPassword: $inputPassword }) {
      boolean
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  listItemText: {
    textAlign: "center",
    fontSize: 15,
  },
  memberCount: {
    textAlign: "center",
    fontSize: 12,
  },
  col: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: "1%",
  },
  flatList: {
    width: "100%",
  },
});
const JoinGroup: React.FC<{ refetchParentGroup: () => void }> = ({ refetchParentGroup }) => {
  const [query, setQuery] = useState("Team");
  const [showJoinCreate, setShowJoinCreate] = useState(true);
  const username = useReactiveVar(usernameVar);
  const ref = useRef<TextInput | null>(null);

  //used to search for groups (don't search if no query)
  const { data: searchData } = useQuery(SEARCH_GROUPS, {
    variables: { query },
    skip: query === "",
  });

  const [joinGroup] = useMutation(JOIN_GROUP, {
    onCompleted: (data) => {
      if (data.joinGroup.boolean) {
        refetchParentGroup();
      }
      else {
        alert("Incorrect password.")
      }
    },
  });
  return (
    <View style={styles.container}>
      <TopView>
        <TextInput
          onEndEditing={() => ref.current?.blur()}
          onFocus={() => setShowJoinCreate(false)}
          onBlur={() => setShowJoinCreate(false)}
          ref={ref}
          placeholder="Search for teams"
          value={query}
          onChangeText={(t) => setQuery(t)}
        />
        <FlatList
          data={searchData ? searchData.groups.nodes : []}
          style={styles.flatList}
          keyExtractor={(group) => group.name}
          renderItem={({ item: group }) => (
            <ListItemContainer>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.listItemText}>{group.name}</Text>
                  <View style={styles.row}>
                    <Text style={styles.memberCount}>{group.usersByGroupname.totalCount} members</Text>
                    {group.battleByNameAndBattleNumber ? <Text style={styles.memberCount}>, level {group.battleByNameAndBattleNumber.enemyLevel}</Text> : undefined}
                  </View>
                </View>
                <View style={styles.col}>
                  {group.isPasswordProtected ? (
                    <View style={styles.row}>
                      <PasswordProtectedGroup joinGroup={joinGroup} groupName={group.name} />
                    </View>
                  ) : (
                    <Button onPress={() => joinGroup({ variables: { inputGroupname: group.name } })} title="Join" />
                  )}
                </View>
              </View>
            </ListItemContainer>
          )}
        />
      </TopView>
      {query === "" ? (
        showJoinCreate ? (
          <View style={{ ...styles.container }}>
            <View style={styles.button}>
              <Button onPress={() => ref.current?.focus()} style={styles.button} title="Join Team" />
            </View>
            <Button title="Create Team" />
          </View>
        ) : (
          <Button onPress={() => ref.current?.focus()} style={styles.button} title="Join Random Public Team" />
        )
      ) : undefined}
    </View>
  );
};
export default JoinGroup;
