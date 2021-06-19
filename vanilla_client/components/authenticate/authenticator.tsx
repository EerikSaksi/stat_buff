import React, {Suspense, lazy} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useCheckTokenQuery} from '../../generated/graphql';
const CreateUser = lazy(() => import('./create_user'));
const App = lazy(() => import('../App'));

const Authenticator: React.FC = () => {
  const {data, loading} = useCheckTokenQuery({
    fetchPolicy: 'cache-and-network',
  });

  //while we're loading, we do not know if the user exists or not, so don't show anything
  if (loading) {
    return <ActivityIndicator />;
  }

  //user token in valid
  if (data?.activeUser?.id) {
    <Suspense fallback = {<ActivityIndicator/>}>
      <App />
    </Suspense>
  }

  //fetch complete but not valid token, show sign in
  
  return (
    <Suspense fallback = {<ActivityIndicator/>}>
      <CreateUser/>
    </Suspense>
  )

};
export default Authenticator;
