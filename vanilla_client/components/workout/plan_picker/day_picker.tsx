import React, {useCallback} from 'react';
import {List, Button, ActivityIndicator} from 'react-native-paper';
import {RootStackParamList} from '../../workout';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {
  useWorkoutPlanByIdQuery,
  useDeleteDayMutation,
  useRenameDayMutation
} from '../../../generated/graphql';

type WorkoutDayPickerRouteProp = RouteProp<
  RootStackParamList,
  'Select Workout Day'
>;

type WorkoutDayPickerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Select Workout Day'
>;
type Props = {
  route: WorkoutDayPickerRouteProp;
  navigation: WorkoutDayPickerNavigationProp;
};

const WorkoutDayPicker: React.FC<Props> = ({navigation, route}) => {
  const {data} = useWorkoutPlanByIdQuery({
    variables: {id: route.params.workoutPlanId},
    fetchPolicy: 'no-cache',
  });
  const [renameDay] = useRenameDayMutation()
  const onRename = useCallback((id: number, newName: string) => {
    renameDay({
      variables: {
        name: newName,
        dayId: id
      },
      optimisticResponse: {
        updateWorkoutPlanDay: {
          __typename: 'UpdateWorkoutPlanDayPayload',
          workoutPlanDay: {
            __typename: 'WorkoutPlanDay',
            name: newName,
            id: id,
          },
        },
      },
    });
  }, []);
  const [deleteDay] = useDeleteDayMutation();
  const onDelete = useCallback((id: number) => {
    deleteDay({
      variables: {
        dayId: id,
      },
      update(cache, {data}) {
        if (data?.deleteWorkoutPlanDay?.workoutPlanDay) {
          cache.evict({
            id: cache.identify(data.deleteWorkoutPlanDay.workoutPlanDay),
          });
        }
      },
    });
  }, []);
  if (!data?.workoutPlan) {
    return <ActivityIndicator />;
  }
  return (
    <List.Section>
      {data.workoutPlan.workoutPlanDays.nodes.map(day => (
        <List.Item
          left={props => <List.Icon {...props} icon="arm-flex" />}
          key={day.name}
          title={day.name}
          titleStyle={{fontSize: 24}}
          descriptionStyle={{fontSize: 16}}
          description={`${day.workoutPlanExercises.totalCount} exercises`}
          right={() => (
            <Button
              icon="arrow-right"
              onPress={() =>
                navigation.navigate('Workout', {dayId: day.id, name: day.name})
              }>
              Start
            </Button>
          )}></List.Item>
      ))}
    </List.Section>
  );
};
export default WorkoutDayPicker;
