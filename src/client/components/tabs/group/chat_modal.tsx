import React from "react";
import CustomModal from "../../../util_components/custom_modal";
import { Text } from "react-native";
import {gql, useSubscription} from "@apollo/client";

const MESSAGE_SUBSCRIPTION = gql`subscription($topic: String!) {
  listen(topic: $topic) {
    relatedNode {
      ... on ChatMessage {
        nodeId
        username
        textContent
        id
      }
    }
  }
}`
const ChatModal: React.FC<{ visible: boolean; setVisible: (arg: boolean) => void, groupname: string }> = ({ visible, setVisible, groupname }) => {
  const {data} = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {topic: `message_${groupname}`},
  })
  console.log(data)
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      <Text>hello world</Text>
    </CustomModal>
  );
};
export default ChatModal;
