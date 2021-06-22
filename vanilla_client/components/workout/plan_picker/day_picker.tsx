import React, {useCallback, useState, useEffect} from 'react';
import {List, ActivityIndicator} from 'react-native-paper';
import {RootStackParamList} from '../../workout';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {
  useWorkoutPlanByIdQuery,
  useDeleteDayMutation,
  useRenameDayMutation,
  useCreateWorkoutPlanDayMutation,
  WorkoutPlanDayFragmentDoc,
} from '../../../generated/graphql';
import ListItemWithMenu from '../list_item_with_menu';
import NewListItemDialog from '../new_list_item_dialog';
import {ScrollView} from 'react-native';

type WorkoutDayPickerRouteProp = RouteProp<RootStackParamList, 'Select Day'>;

type WorkoutDayPickerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Select Day'
>;
type Props = {
  route: WorkoutDayPickerRouteProp;
  navigation: WorkoutDayPickerNavigationProp;
};

const WorkoutDayPicker: React.FC<Props> = ({navigation, route}) => {
  const {data} = useWorkoutPlanByIdQuery({
    variables: {id: route.params.workoutPlan.id},
  });
  const [existingNames, setExistingNames] = useState<string[]>([]);

  useEffect(() => {
    if (data?.workoutPlan?.workoutPlanDays) {
      setExistingNames(data.workoutPlan.workoutPlanDays.map(day => day.name));
    }
  }, [data]);

  const [renameDay] = useRenameDayMutation();
  const onListItemPress = useCallback(
    (id: number) => {
      //the callback only gives us the id, so we have to filter to find the name (the name is required so the workout day's name is instantly shown on the header)
      const dayById = data?.workoutPlan?.workoutPlanDays.find(
        day => day.id === id,
      );
      if (dayById) {
        navigation.navigate('Workout', {dayId: id, name: dayById.name});
      }
    },
    [data],
  );

  const onRename = useCallback((id: number, newName: string) => {
    renameDay({
      variables: {
        name: newName,
        dayId: id,
      },
      optimisticResponse: {
        updateWorkoutPlanDay: {
          __typename: 'UpdateWorkoutPlanDayPayload',
          workoutPlanDay: {
            id,
            name: newName,
            __typename: 'WorkoutPlanDay',
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
      optimisticResponse: {
        deleteWorkoutPlanDay: {
          __typename: 'DeleteWorkoutPlanDayPayload',
          workoutPlanDay: {
            id: -1,
            name: '',
            __typename: 'WorkoutPlanDay',
          },
        },
      },
    });
  }, []);

  const [createWorkoutPlanDay] = useCreateWorkoutPlanDayMutation();
  const onCreate = useCallback((newName: string) => {
    createWorkoutPlanDay({
      variables: {
        name: newName,
        workoutPlanId: route.params.workoutPlan.id,
      },
      update(cache, {data: createWorkoutPlanDayData}) {
          cache.modify({
            id: cache.identify(route.params.workoutPlan),
            fields: {
              workoutPlanDays(existingWorkoutPlanDays = []) {
                const newWorkoutPlanDay =
                  createWorkoutPlanDayData?.createWorkoutPlanDay?.workoutPlanDay;
                if (newWorkoutPlanDay) {
                  console.log({newWorkoutPlanDay});
                  const newWorkoutPlanDayFragment = cache.writeFragment({
                    data: newWorkoutPlanDay,
                    fragment: WorkoutPlanDayFragmentDoc,
                  });
                  return [
                    ...existingWorkoutPlanDays,
                    newWorkoutPlanDayFragment,
                  ];
                }
              },
            },
          });
      },
      //optimisticResponse: {
      //  createWorkoutPlanDay: {
      //    __typename: 'CreateWorkoutPlanDayPayload',
      //    workoutPlanDay: {
      //      __typename: 'WorkoutPlanDay',
      //      id: -1,
      //      name: newName,
      //    },
      //  },
      //},
    });
  }, []);
  if (!data?.workoutPlan?.workoutPlanDays) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView>
      <List.Section>
        {data.workoutPlan.workoutPlanDays.map(day => (
          <ListItemWithMenu
            key={day.id}
            id={day.id}
            name={day.name}
            existingNames={existingNames}
            onPress={onListItemPress}
            onDelete={onDelete}
            onRename={onRename}
            defaults={undefined}
          />
        ))}
      </List.Section>
      <NewListItemDialog
        existingNames={existingNames}
        onCreate={onCreate}
        listItemType="Day"
      />
    </ScrollView>
  );
};
export default WorkoutDayPicker;

//<NewListItemDialog existingNames = {existingNames} onCreate = />
