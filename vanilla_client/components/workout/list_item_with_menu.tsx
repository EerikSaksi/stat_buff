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
import useDuplicateValidation from './use_duplicate_validation';

type DefaultsData = {
  this: boolean;
  onSet: (id: number) => void;
};
const ListItemWithMenu: React.FC<{
  id: number;
  name: string;
  workoutPlanNames: string[];
  defaults: DefaultsData | undefined;
  onPress: (id: number) => void;
  onRename: (id: number, newName: string) => void;
  onDelete: (id: number, options: {onCompleted: () => void}) => void;
}> = ({id, name, workoutPlanNames, defaults, onPress, onRename, onDelete}) => {
  const [visible, setVisible] = useState(false);
  const [newPlanName, setNewPlanName] = useState<undefined | string>();
  const {duplicateError} = useDuplicateValidation(
    workoutPlanNames,
    newPlanName,
    name,
  );
  return (
    <TouchableRipple onPress={() => onPress(id)}>
      <List.Item
        title={newPlanName === undefined ? name : ''}
        titleStyle={{padding: 4}}
        left={() => (
          <>
            <List.Icon
              icon={defaults?.this ? 'clipboard-check' : 'clipboard-list'}
              color={defaults?.this ? DefaultTheme.colors.primary : undefined}
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
                      onRename(id, newPlanName);
                      setNewPlanName(undefined);
                    }
                  }}></TextInput>
                <View style={{justifyContent: 'center'}}>
                  <Button
                    icon="check"
                    disabled={duplicateError || newPlanName === ''}
                    labelStyle={{fontSize: 24}}
                    onPress={() => {
                      onRename(id, newPlanName);
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
            {defaults ? (
              <Menu.Item
                onPress={() => {
                  setVisible(false);
                }}
                disabled={defaults.this}
                title="Set as default"
                icon="clipboard-check"
              />
            ) : undefined}
            <Menu.Item
              onPress={() => {
                setNewPlanName(name);
                setVisible(false);
              }}
              title="Rename"
              icon="rename-box"
            />
            <Menu.Item
              onPress={() => {
                onDelete(id, {
                  onCompleted: () => setVisible(false)
                });
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
