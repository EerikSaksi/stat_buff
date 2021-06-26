import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../workout';
import {List, Button} from 'react-native-paper';

type PostWorkoutRouteProp = RouteProp<RootStackParamList, 'Workout Complete!'>;

type PostWorkoutNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workout Complete!'
>;
type Props = {
  route: PostWorkoutRouteProp;
  navigation: PostWorkoutNavigationProp;
};

const PostWorkout: React.FC<Props> = ({route, navigation}) => {
  return (
    <>
      <List.Section>
        {route.params.completedWorkoutExercises.map(cwe => (
          <List.Item key = {cwe.id} title={`${cwe.exercise.name}`} />
        ))}
      </List.Section>
      <Button onPress = {() => navigation.navigate('Select Workout')}>
        Done
      </Button>
    </>
  );
};
export default PostWorkout;
