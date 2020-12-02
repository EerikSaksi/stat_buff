import React, {useState, Suspense, lazy, useEffect} from 'react';
import {initAsync, GoogleSignInAuthResult, signInAsync, getCurrentUserAsync, isSignedInAsync} from 'expo-google-sign-in'
import {SocialIcon} from 'react-native-elements'
import Loading from './util_components/loading'
import {useQuery} from '@apollo/client/react/hooks';
import {gql} from '@apollo/client';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {generateShadow} from 'react-native-shadow-generator';
//const App = lazy(() => import('./App'))
import App from './App'
import {usernameVar} from './apollo/cache';
const CenteredView = lazy(() => import('./util_components/centered_view'))
const CreateUser = lazy(() => import('./components/create_user'))


const USERNAME = gql`query{
  username
}`

const styles = StyleSheet.create({
  image: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
  }
})

export default function Authenticator() {
  const [googleID, setGoogleID] = useState<string | undefined>('wowa')

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const {data, loading, refetch} = useQuery(USERNAME, {
    skip: !googleID,
    fetchPolicy: 'network-only'
  })


  //when starting try check if user logged in and fetch their token
  useEffect(() => {
    //const tryGetToken = async () => {
    //  await initAsync()
    //  if (await isSignedInAsync()) {
    //    const result = await getCurrent
    //    UserAsync()
    //    setGoogleID(result?.uid)
    //  }
    //}
    //tryGetToken()
  }, [])
  var content = <Loading />

  if (!loading) {
    //if tokenID is undefined then isSignedInAsync returned false so provide button to login to google
    if (!googleID) {
      content =
        <Suspense fallback={<Loading />}>
          <CenteredView>
            <SocialIcon type='google' title={'Sign in with Google'} button
              style={{width: '50%', ...generateShadow(24)}}
              onPress={async () => {
                setGoogleID('dne')
                //initAsync()
                ////get the token id and fetch data with it
                //const result: GoogleSignInAuthResult = await signInAsync();
                //setGoogleID(result.user!.uid)
              }
              } />
          </CenteredView>
        </Suspense>
    }
    else {
      //user signed in to google, but don't have a username in the database, so provide interface to create one.
      if (!data.username) {
        content = <Suspense fallback={<Loading />}><CreateUser refetchUser={refetch} /></Suspense>
      }
      else {
        usernameVar(data.username)
        return (<App/>)
      }
    }
  }

  return (
    <ImageBackground imageStyle={{zIndex: -1}} style={styles.image} blurRadius={1.5} source={require('./assets/squat.jpeg')}>
      {content}
    </ImageBackground>
  )
}
