import React, { Suspense, useRef, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Text, View, FlatList, StyleSheet } from "react-native";
import TopView from "../../../util_components/top_view";
import { Button, SearchBar } from "react-native-elements";
import ListItemContainer from "../../list_item_container";
import PasswordProtectedGroup from "./password_protected_group";
import Loading from "../../../util_components/loading";
const CreateGroup = React.lazy(() => import("./create_group"));

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
const JOIN_RANDOM_PUBLIC_GROUP = gql`
  mutation {
    joinRandomPublicGroup(input: { clientMutationId: null }) {
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
  searchBar: {
    width: "100%",
  },
});
const JoinGroup: React.FC<{ refetchParentGroup: () => void }> = ({ refetchParentGroup }) => {
  const [query, setQuery] = useState("");
  const [showJoinCreate, setShowJoinCreate] = useState(true);
  const [createGroupVisible, setCreateGroupVisible] = useState(false);
  const ref = useRef<SearchBar | null>(null);

  //used to search for groups (don't search if no query)
  const { data: searchData } = useQuery(SEARCH_GROUPS, {
    variables: { query },
    skip: query === "",
  });

  const [joinGroup] = useMutation(JOIN_GROUP, {
    onCompleted: (data) => {
      if (data.joinGroup.boolean) {
        refetchParentGroup();
      } else {
        alert("Incorrect password.");
      }
    },
  });
  const [joinRandomPublicGroup] = useMutation(JOIN_RANDOM_PUBLIC_GROUP, {
    onCompleted: (data) => {
      if (data.joinRandomPublicGroup.boolean) {
        refetchParentGroup();
      } else {
        alert("No groups found.");
      }
    },
  });
  return (
    <View style={styles.container}>
      {createGroupVisible ? (
        <Suspense fallback={<Loading />}>
          <CreateGroup visible={createGroupVisible} setVisible={setCreateGroupVisible} refetchParentGroup={refetchParentGroup} />
        </Suspense>
      ) : undefined}
      <TopView>
        <SearchBar
          onFocus={() => setShowJoinCreate(false)}
          onBlur={() => setShowJoinCreate(true)}
          lightTheme={true}
          ref={ref}
          placeholder="Search for teams"
          round={true}
          value={query}
          onChangeText={(t) => setQuery(t)}
          containerStyle={styles.searchBar}
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
                    <Text style={styles.memberCount}>{group.usersByGroupname.totalCount} Members</Text>
                    {group.battleByNameAndBattleNumber ? <Text style={styles.memberCount}>, Level {group.battleByNameAndBattleNumber.enemyLevel}</Text> : undefined}
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
        <View style={{ ...styles.container }}>
          <View style={styles.button}>
            {showJoinCreate ? (
              <Button onPress={() => ref.current?.focus()} style={styles.button} title="Join Team" />
            ) : (
              <Button onPress={() => joinRandomPublicGroup()} style={styles.button} title="Join Random Public Team" />
            )}
          </View>
          <Button title="Create Team" onPress={() => setCreateGroupVisible(true)} />
        </View>
      ) : undefined}
    </View>
  );
};
export default JoinGroup;
