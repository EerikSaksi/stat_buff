import React, { useState } from "react";
import { Button } from "react-native-elements";
import {TextInput, StyleSheet} from "react-native" 
const styles = StyleSheet.create({
  button: {
    paddingTop: 0,
    paddingBottom: 0,
  }
})
const PasswordProtectedGroup: React.FC<{ joinGroup: (arg: any) => void; groupName: string }> = ({ joinGroup, groupName }) => {
  const [password, setPassword] = useState("");
  return (
    <React.Fragment>
      <TextInput style = {{margin: '2%'}} value={password} onChangeText={(v) => setPassword(v)} placeholder="Enter password" secureTextEntry = {true} textContentType = "password"/>
      <Button buttonStyle =  {styles.button} disabled = {!password.length} title = "✓" onPress={() => joinGroup({ variables: { inputGroupname: groupName, inputPassword: password } })}/>
    </React.Fragment>
  );

};
export default PasswordProtectedGroup;
