import React, {useState, Suspense, lazy, useEffect} from 'react';
import {initAsync, GoogleSignInAuthResult, signInAsync, getCurrentUserAsync, isSignedInAsync} from 'expo-google-sign-in'
import {SocialIcon} from 'react-native-elements'
import Loading from './util_components/loading'
import {useQuery} from '@apollo/client/react/hooks';
import {gql} from '@apollo/client';
import {ImageBackground, StyleSheet} from 'react-native';
const CenteredView = lazy(() => import('./util_components/centered_view'))
const App = lazy(() => import('./App'));
const CreateUser = lazy(() => import('./components/create_user'))


const USERNAME_BY_TOKEN_ID = gql`query usernamebytokenid(tokenID: String!){
    usernameByTokenID(tokenID: String!){
    }
}`
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})

export default function Authenticator() {

  const [tokenID, setTokenID] = useState<string | undefined>(undefined)

  //const data = {username: 'orek'}

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const {data, loading} = useQuery(USERNAME_BY_TOKEN_ID, {
    variables: {tokenID},
    skip: !tokenID
  })

  //when starting try check if user logged in and fetch their token
  useEffect(() => {
    const tryGetToken = async () => {
      await initAsync()
      if (await isSignedInAsync()) {
        const result = await getCurrentUserAsync()
        setTokenID(result?.auth?.idToken)
      }
    }
    tryGetToken()
  }, [])

  //content to be rendered inside of the background image content (assume that it is loading initially)
  var content = <Loading />

  if (!loading) {
    //if tokenID is undefined then isSignedInAsync returned false so provide button to login to google
    if (!tokenID) {
      content = <CenteredView>
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
    }
    else {
      //user signed in to google, but don't have a username in the database, so provide interface to create one.
      if (!data) {
        content = <Suspense fallback={<Loading />}><CreateUser /></Suspense>
      }
      else {
        content = <Suspense fallback={<Loading />}> <App username={data.username} /></Suspense>
      }
    }
  }

  return (
    <ImageBackground blurRadius={1.5} style={styles.image} source={require('./assets/squat.jpeg')}>
      {content}
    </ImageBackground>
  )
}
