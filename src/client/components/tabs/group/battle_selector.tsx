import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import {Picker} from "@react-native-picker/picker";
import {useFocusEffect} from "@react-navigation/native";
import React, {useCallback} from "react";
import Loading from "../../../util_components/loading";

const BATTLE_NUMBER = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      nodeId
      name
      battleNumber
    }
  }
`;
const BattlePicker: React.FC<{ battleNumber: number | undefined; setBattleNumber: (val: number | undefined) => void; groupname: string }> = ({ battleNumber, setBattleNumber, groupname }) => {
  //get the current battle number
  const [fetchBattleNumber, { data }] = useLazyQuery(BATTLE_NUMBER, {
    variables: { groupname },
    onCompleted: ({ group }) => {
      //we want to trigger a refetch of stats, regardless of if the battle number changes.
      setBattleNumber(undefined);
      setBattleNumber(group.battleNumber);
    },
  });
  useFocusEffect(
    useCallback(() => {
      fetchBattleNumber()
    }, [])
  );
  if (!data){
    return <Loading/>
  }
  return (
    <Picker
      selectedValue={battleNumber}
      onValueChange={(v) => {
        if (typeof v === "number") setBattleNumber(v);
      }}
      mode="dropdown"
    >
    {
      Array.from({ length: data.group.battleNumber }, (v, i) => i + 1).map((battleNumber) => (
        <Picker.Item key={battleNumber} label={`Battle ${battleNumber}`} value={battleNumber} />
      ))
    }
    </Picker>
  );
};
export default BattlePicker;
