import React, { lazy, Suspense, useEffect } from "react";

import { gql, useLazyQuery} from "@apollo/client";
import Loading from "../../../util_components/loading";
const YourGroup = lazy(() => import("./your_group"));
const JoinGroup = lazy(() => import("./join_group"));

const GROUP_INFO = gql`
  query group_info($username: String!) {
    user(username: $username) {
      nodeId
      groupname
    }
  }

`;

type NavigationProps = { params: { username: string } };
const Group: React.FC <{route: NavigationProps}> = ({route}) => {
  const {username} = route.params
  const [checkGroupStatus, { data }] = useLazyQuery(GROUP_INFO, {
    variables: { username },
    fetchPolicy: 'cache-and-network'
  });
  useEffect(() => {
    checkGroupStatus();
  }, []);

  if (!data) {
    return <Loading />;
  }
  if (data.user.groupname) {
    return (
      <Suspense fallback={<Loading />}>
        <YourGroup groupname = {data.user.groupname}/>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <JoinGroup refetchParentGroup={checkGroupStatus} />
    </Suspense>
  );
};
export default Group;
