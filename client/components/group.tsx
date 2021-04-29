import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import {ActivityIndicator} from "react-native-paper"
import YourGroup from "./group/your_group"
import JoinGroup from "./group/join_group"

const GROUP_INFO = gql`
  query group_info($username: String!) {
    user(username: $username) {
      nodeId
      groupname
    }
  }
`;

type NavigationProps = { params: { username: string } };
const Group: React.FC<{ route: NavigationProps }> = ({ route }) => {
  const { username } = route.params;
  const [checkGroupStatus, { data }] = useLazyQuery(GROUP_INFO, {
    variables: { username },
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    checkGroupStatus();
  }, []);

  if (!data || !data.user) {
    return <ActivityIndicator />;
  }
  if (data.user.groupname) {
    return (
        <YourGroup groupname={data.user.groupname} username={username} refetchParentGroup = {checkGroupStatus} />
    );
  }
  return (
      <JoinGroup refetchParentGroup={checkGroupStatus} />
  );
};
export default Group;
