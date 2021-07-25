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
        <List.Subheader>Summary</List.Subheader>
        {route.params.completedWorkoutExercises.map(
          ({exercise, completedSets, id}) => (
            <List.Item
              key={id}
              title={`${exercise.name}`}
              description={`${completedSets.length} set${
                completedSets.length === 1 ? '' : 's'
              }`}
            />
          ),
        )}
      </List.Section>
      <Button onPress={() => navigation.navigate('Select Workout')}>
        Done
      </Button>
    </>
  );
};
export default PostWorkout;
