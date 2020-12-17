import React, { lazy, Suspense, useEffect } from "react";

import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import Loading from "../../../util_components/loading";
import { usernameVar } from "../../../apollo/cache";

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

const MainView: React.FC = () => {
  const username = useReactiveVar(usernameVar);
  const [checkGroupStatus, { data }] = useLazyQuery(GROUP_INFO, {
    variables: { username },
  });
  useEffect(() => {
    checkGroupStatus();
  }, []);

  if (!data) {
    return <Loading />;
  }
  if (data.user) {
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
export default MainView;
