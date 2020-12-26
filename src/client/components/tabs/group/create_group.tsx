import { gql, useLazyQuery, useMutation} from "@apollo/client";
import React, { useState } from "react";
import {Text} from "react-native";
import {Button, Input} from "react-native-elements";
import CustomModal from "../../../util_components/custom_modal";
const GROUP_TAKEN = gql`
  mutation($groupName: String!){
    createGroup(input: {group: {name: $groupName }}){
      group{
        name
      }
    }
  }
`;
const CreateGroup: React.FC<{ visible: boolean; setVisible: (arg: boolean) => void }> = ({ visible, setVisible }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [createGroup] = useMutation(GROUP_TAKEN,{
    onCompleted: (data) => {
      if (!data.group){
        alert("Team name has already been taken")
      }
    }
  })
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      <Input value={newGroupName} onChangeText={(v) => setNewGroupName(v)}/>
      <Button title = "Create Team" onPress = {() => createGroup()}/>
    </CustomModal>
  );
};
export default CreateGroup;
