import React from "react";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { useState } from "react";
import { Text, Switch, View, StyleSheet} from "react-native";
import { Button, Divider, Input } from "react-native-elements";
import CustomModal from "../../util_components/custom_modal";

const CREATE_BODY_STAT = gql`
  mutation($username: String!, $ismale: Boolean!, $bodymass: Int!) {
    createBodystat(input: { bodystat: { username: $username, ismale: $ismale, bodymass: $bodymass } }) {
      clientMutationId
    }
  }
`;

const UPDATE_BODY_STAT = gql`
  mutation($username: String!, $ismale: Boolean!, $bodymass: Int!) {
    updateBodystat(input: { username: $username, patch: { ismale: $ismale, bodymass: $bodymass } }) {
      clientMutationId
    }
  }
`;
const FETCH_BODY_STAT = gql`
  query($username: String!) {
    bodystat(username: $username) {
      nodeId
      ismale
      bodymass
    }
  }
`;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
  },
  text: {
    textAlign: "center",
    margin: "1%",
  },
  modalPadding: {
    padding: "5%",
    paddingBottom: 0
  },
});

const BodyStatsModal: React.FC<{ visible: boolean; setVisible: (b: boolean) => void; username: string; refetchParent: () => void }> = ({ visible, setVisible, username, refetchParent }) => {
  const [bodymass, setBodymass] = useState<number | undefined>(undefined);
  const [isMale, setIsMale] = useState(true);
  const client = useApolloClient();

  //check if the user has created body stats before (and in that case prefill the inputs)
  const { data, loading, refetch } = useQuery(FETCH_BODY_STAT, {
    variables: { username },
    onCompleted: ({ bodystat }) => {
      if (bodystat) {
        setIsMale(bodystat.ismale);
        setBodymass(bodystat.bodymass);
      }
    },
    client,
  });

  const [updateBodyStats] = useMutation(UPDATE_BODY_STAT, {
    variables: { bodymass, ismale: isMale, username },
    onCompleted: () => {
      refetch();
      refetchParent();
      setVisible(false);
    },
  });
  const [createBodyStats] = useMutation(CREATE_BODY_STAT, {
    variables: { bodymass, ismale: isMale, username },
    onCompleted: () => {
      refetch();
      refetchParent();
      setVisible(false);
    },
  });

  //disabled if still fetching existing body stats, and either update or create based on if the user has created stats befoer
  const bodyStatButton =
    loading || !bodymass ? (
      <Button title={loading ? "Loading" : "Enter a weight"} raised={true} disabled={true} />
    ) : data && data.bodystat ? (
      <Button title="Update" raised={true} onPress={() => updateBodyStats()} />
    ) : (
      <Button title="Create" raised={true} onPress={() => createBodyStats()} />
    );

  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      <View style={styles.modalPadding}>
        <Text style={styles.text}>This data is private (needed for strength calculations)</Text>
        <Input style={styles.text} value={bodymass ? bodymass.toString() : undefined} placeholder="Bodyweight (kg)" onChangeText={(text) => setBodymass(parseInt(text))} keyboardType={"numeric"} />
        <Text style={styles.text}>Which dataset would you like to use?</Text>
        <View style={styles.row}>
          <Text>Male</Text>
          <Switch value={!isMale} thumbColor={"white"} trackColor={{ false: "blue", true: "pink" }} onValueChange={(value) => setIsMale(!value)}></Switch>
          <Text>Female</Text>
        </View>
        {bodyStatButton}
        <Divider style={{ backgroundColor: "black" }} />
      </View>
    </CustomModal>
  );
};
export default BodyStatsModal;
