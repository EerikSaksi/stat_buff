import React, {useState} from 'react';
import {
  Button,
  Menu,
  List,
  TouchableRipple,
  DefaultTheme,
  TextInput,
} from 'react-native-paper';
import {View} from 'react-native';
import {
  WorkoutPlanFragment,
  useUpdateUserCurrentWorkoutPlanMutation,
  useRenameWorkoutPlanMutation,
  useDeleteWorkoutPlanMutation,
} from '../../generated/graphql';
import useDuplicateValidation from './use_duplicate_validation';

const ListItemWithMenu: React.FC<{
  workoutPlan: WorkoutPlanFragment;
  onPress: (WorkoutPlanFragment: any) => void;
  userId: number;
  isDefault: boolean;
  workoutPlanNames: string[];
  onRename: (id: number, newName: string) => void;
}> = ({
  workoutPlan,
  onPress,
  userId,
  isDefault,
  workoutPlanNames,
  onRename,
}) => {
  const [visible, setVisible] = useState(false);
  const [newPlanName, setNewPlanName] = useState<undefined | string>();
  const [updateUserCurrentWorkout] = useUpdateUserCurrentWorkoutPlanMutation();
  const {duplicateError} = useDuplicateValidation(
    workoutPlanNames,
    newPlanName,
    workoutPlan.name,
  );
  const [deleteWorkoutPlan] = useDeleteWorkoutPlanMutation({
    variables: {
      workoutPlanId: workoutPlan.id,
    },
    update(cache, {data}) {
      if (data?.deleteWorkoutPlan?.workoutPlan) {
        cache.evict({id: cache.identify(data.deleteWorkoutPlan.workoutPlan)});
      }
    },
  });
  return (
    <TouchableRipple onPress={() => onPress(workoutPlan)}>
      <List.Item
        title={newPlanName === undefined ? workoutPlan.name : ''}
        titleStyle={{padding: 4}}
        left={() => (
          <>
            <List.Icon
              icon={isDefault ? 'clipboard-check' : 'clipboard-list'}
              color={isDefault ? DefaultTheme.colors.primary : undefined}
            />
            {newPlanName === undefined ? null : (
              <>
                <TextInput
                  value={newPlanName}
                  onChangeText={t => setNewPlanName(t)}
                  autoFocus
                  dense
                  style={{height: 55}}
                  error={duplicateError || newPlanName === ''}
                  onBlur={() => {
                    if (!duplicateError && newPlanName) {
                      onRename(workoutPlan.id, newPlanName);
                      setNewPlanName(undefined);
                    }
                  }}></TextInput>
                <View style={{justifyContent: 'center'}}>
                  <Button
                    icon="check"
                    disabled={duplicateError || newPlanName === ''}
                    labelStyle={{fontSize: 24}}
                    onPress={() => {
                      onRename(workoutPlan.id, newPlanName);
                      setNewPlanName(undefined);
                    }}>
                    {''}
                  </Button>
                </View>
              </>
            )}
          </>
        )}
        right={() => (
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{alignItems: 'center', justifyContent: 'center'}}
            anchor={
              <View style={{justifyContent: 'center', flex: 1}}>
                <Button
                  icon="dots-vertical"
                  onPress={() => {
                    setVisible(true);
                  }}>
                  {''}
                </Button>
              </View>
            }>
            <Menu.Item
              onPress={() => {
                updateUserCurrentWorkout({
                  variables: {currentWorkoutPlanId: workoutPlan.id, userId},
                  optimisticResponse: {
                    updateUser: {
                      __typename: 'UpdateUserPayload',
                      user: {
                        __typename: 'User',
                        id: userId,
                        currentWorkoutPlanId: workoutPlan.id,
                      },
                    },
                  },
                });

                setVisible(false);
              }}
              disabled={isDefault}
              title="Set as default"
              icon="clipboard-check"
            />
            <Menu.Item
              onPress={() => {
                setNewPlanName(workoutPlan.name);
                setVisible(false);
              }}
              title="Rename"
              icon="rename-box"
            />
            <Menu.Item
              onPress={() => {
                deleteWorkoutPlan();
                setVisible(false);
              }}
              title="Delete"
              icon="delete-circle"
            />
          </Menu>
        )}>
        {''}
      </List.Item>
    </TouchableRipple>
  );
};
export default ListItemWithMenu;
