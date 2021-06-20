import React, {Suspense, lazy} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useCheckTokenQuery} from '../../generated/graphql';
const CreateUser = lazy(() => import('./create_user'));
import App from '../App';

const Authenticator: React.FC = () => {
  const {data, loading} = useCheckTokenQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-only',
  });

  //user token in valid
  if (loading || data?.activeUser?.id) {
    return <App />;
  }

  //fetch complete but not valid token, show sign in
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <CreateUser />
    </Suspense>
  );
};
export default Authenticator;
