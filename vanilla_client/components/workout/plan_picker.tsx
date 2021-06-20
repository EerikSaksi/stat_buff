import React, {useCallback, useState, useEffect} from 'react';
import {
  useWorkoutQuery,
  useRenameWorkoutPlanMutation,
  useDeleteWorkoutPlanMutation,
  useUpdateUserCurrentWorkoutPlanMutation,
  WorkoutPlanFragmentDoc,
  useCreateWorkoutPlanMutation,
} from '../../generated/graphql';
import {ActivityIndicator} from 'react-native-paper';
import {List} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../workout';
import NewWorkoutPlanDialog from './new_list_item_dialog';
import {ScrollView} from 'react-native';
import ListItemWithMenu from './list_item_with_menu';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Select Workout'>;
type Props = {
  navigation: NavigationProp;
};

const WorkoutPlanPicker: React.FC<Props> = ({navigation}) => {
  const {data} = useWorkoutQuery();
  const [workoutPlanNames, setWorkoutPlanNames] = useState<string[]>([]);

  useEffect(() => {
    if (data?.activeUser) {
      setWorkoutPlanNames(
        data.activeUser.workoutPlans.map(workoutPlan => workoutPlan.name),
      );
    }
  }, [data]);

  const [renameWorkoutPlan] = useRenameWorkoutPlanMutation({});
  const onRename = useCallback((id: number, newName: string) => {
    renameWorkoutPlan({
      variables: {
        name: newName,
        workoutPlanId: id,
      },
      optimisticResponse: {
        updateWorkoutPlan: {
          __typename: 'UpdateWorkoutPlanPayload',
          workoutPlan: {
            __typename: 'WorkoutPlan',
            name: newName,
            id: id,
          },
        },
      },
    });
  }, []);
  const [deleteWorkoutPlan] = useDeleteWorkoutPlanMutation();
  const onDelete = useCallback((id: number) => {
    deleteWorkoutPlan({
      variables: {
        workoutPlanId: id,
      },
      update(cache, {data}) {
        if (data?.deleteWorkoutPlan?.workoutPlan) {
          cache.evict({id: cache.identify(data.deleteWorkoutPlan.workoutPlan)});
        }
      },
      optimisticResponse: {
        deleteWorkoutPlan: {
          __typename: 'DeleteWorkoutPlanPayload',
          workoutPlan: {
            id: id,
            __typename: 'WorkoutPlan',
          },
        },
      },
    });
  }, []);

  const [updateUserCurrentWorkout] = useUpdateUserCurrentWorkoutPlanMutation();
  const onSetDefault = useCallback(
    (id: number) => {
      if (data?.activeUser?.id) {
        //this toggles the default. if the default was pressed, set to null, otherwise set to this id
        const newId = id === data.activeUser.currentWorkoutPlanId ? null : id 
        updateUserCurrentWorkout({
          variables: {currentWorkoutPlanId: newId, userId: data.activeUser.id},
          optimisticResponse: {
            updateAppUser: {
              __typename: 'UpdateAppUserPayload',
              appUser: {
                __typename: 'AppUser',
                id: data.activeUser.id,
                currentWorkoutPlanId: newId,
              },
            },
          },
        });
      }
    },
    [data],
  );

  const [createWorkoutPlan] = useCreateWorkoutPlanMutation();

  const onCreate = useCallback(
    (newName: string) => {
      if (data?.activeUser)
        createWorkoutPlan({
          variables: {
            appUserId: data.activeUser.id,
            name: newName,
          },
          update(cache, {data: createWorkoutPlanData}) {
            cache.modify({
              id: cache.identify(data!.activeUser!),
              fields: {
                workoutPlans(existingWorkoutPlans = []) {
                  const newWorkoutPlan =
                    createWorkoutPlanData?.createWorkoutPlan?.workoutPlan;
                  if (newWorkoutPlan) {
                    const newWorkoutPlanExercise = cache.writeFragment({
                      data: newWorkoutPlan,
                      fragment: WorkoutPlanFragmentDoc,
                    });
                    return ([
                        ...existingWorkoutPlans,
                        newWorkoutPlanExercise,
                    ])
                  }
                },
              },
            });
          },
          optimisticResponse: {
            createWorkoutPlan: {
              __typename: "CreateWorkoutPlanPayload",
              workoutPlan: {
                __typename: "WorkoutPlan",
                id: -1,
                name: newName
              }
            }
          }
        });
    },
    [data],
  );

  const onListItemPress = useCallback((id: number) => {
    navigation.navigate('Select Day', {workoutPlanId: id});
  }, []);

  if (!data?.activeUser?.id) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
      <List.Section style={{width: '80%'}}>
        {data.activeUser.workoutPlans.map(workoutPlan => (
          <ListItemWithMenu
            id={workoutPlan.id}
            name={workoutPlan.name}
            key={workoutPlan.id}
            defaults={{
              this: workoutPlan.id === data.activeUser!.currentWorkoutPlanId,
              onSet: onSetDefault,
            }}
            existingNames={workoutPlanNames}
            onPress={onListItemPress}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
        <NewWorkoutPlanDialog
          existingNames={workoutPlanNames}
          onCreate = {onCreate}
          listItemType = "Plan"
        />
      </List.Section>
    </ScrollView>
  );
};
export default WorkoutPlanPicker;
