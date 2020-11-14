import React, {useState, Suspense, lazy} from 'react';
import {initAsync, GoogleSignInAuthResult, signInAsync} from 'expo-google-sign-in'
import {SocialIcon} from 'react-native-elements'
import Loading from './util_components/loading'
import {useTokenQuery} from './hooks/use_token_query';
const CenteredView = lazy(() => import('./util_components/centered_view'))
const App = lazy(() => import('./App'));
const CreateUser = lazy(() => import('./components/create_user'))



export default function Authenticator() {

  const [tokenID, setTokenID] = useState<string | undefined>(undefined)
  //const {userExists, setUserExists} = useTokenQuery(tokenID)

  const [userExists, setUserExists] = useState(true)

  //don't know if user exists
  if (userExists === null) {
    return (
      <CenteredView>
        <SocialIcon type='google' title={'Sign in with Google'} button
          style={{width: '50%'}}
          onPress={async () => {
            initAsync()
            //get the token id and fetch data with it
            const result: GoogleSignInAuthResult = await signInAsync();
            setTokenID(result.user!.auth?.idToken)
          }
          } />
      </CenteredView>
    );
  }
  if (userExists) {
    return (<Suspense fallback={Loading}>
      <App />
    </Suspense>)
  }
  else {
    return (<Suspense fallback={Loading}>
      <CreateUser setUserExists={setUserExists} />
    </Suspense>)
  }
}
