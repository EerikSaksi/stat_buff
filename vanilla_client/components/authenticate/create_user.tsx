import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useCreateUserMutation,
  useAuthenticateLazyQuery,
} from '../../generated/graphql';
import {View} from 'react-native';
import {TextInput, Button, Switch, Text} from 'react-native-paper';
import {cache} from '../../App';
import {gql} from '@apollo/client';

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(true);

  const [createUser] = useCreateUserMutation({
    variables: {
      username,
      password,
    },
    onCompleted: data => {
      //succesfully created user
      if (data.createUser?.appUser?.id) {
        authenticate();
      }
    },
  });
  const [authenticate] = useAuthenticateLazyQuery({
    variables: {
      username,
      password,
    },
    onCompleted: async (data) => {
      if (data.authenticate) {
        await AsyncStorage.setItem('jwt_token', data.authenticate.token);
        cache.writeQuery({
          query: gql`
            query {
              activeUser {
                id
              }
            }
          `,
          data: {
            activeUser: {
              id: data.authenticate.appUserId,
            },
          },
        });
      }
    },
  });

  const onPress = () => {
    if (signingUp) {
      createUser();
    } else {
      authenticate();
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: .1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <Text>{signingUp ? 'Signing up' : 'Logging in'}</Text>
        <Switch value={signingUp} onValueChange={v => setSigningUp(v)} />
      </View>
      <View style = {{ flex: .9 }}>
        <TextInput placeholder="Username" onChangeText={t => setUsername(t)} />
        <TextInput placeholder="Password" onChangeText={t => setPassword(t)} />
        <Button disabled = {!username || !password} onPress={onPress}>{signingUp ? 'Sign up' : 'Login'}</Button>
      </View>
    </View>
  );
};
export default CreateUser;
