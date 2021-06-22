import React, { useState} from "react";
import { TextInput, Portal, Dialog, Button } from "react-native-paper";
import useDuplicateValidation from "./use_duplicate_validation";
const NewListItemDialog: React.FC<{ existingNames: string[], onCreate: (newName: string) => void, listItemType: string}> = ({ existingNames, onCreate, listItemType }) => {
  const [newName, setNewName] = useState<undefined | string>();
  const closeDialog = () => setNewName(undefined);
  const { duplicateError } = useDuplicateValidation(existingNames, newName, undefined);
  return (
    <>
      <Button icon="table-row-plus-after" onPress={() => setNewName("")}>
        Create New {listItemType}
      </Button>
      <Portal>
        <Dialog visible={newName !== undefined} onDismiss={closeDialog}>
          <Dialog.Title>Enter New {listItemType} Name</Dialog.Title>
          <Dialog.Content>
            <TextInput
              autoFocus
              dense
              mode="outlined"
              error={duplicateError}
              label={duplicateError ? `${newName} already exists` : undefined}
              value={newName}
              onChangeText={(t) => setNewName(t)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button
              disabled={newName === undefined || !newName.length || duplicateError}
              mode="contained"
              onPress={() => {
                closeDialog()
                onCreate(newName!)
              }}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
export default NewListItemDialog 
