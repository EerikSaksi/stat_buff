import React, { useEffect } from "react";
import CustomModal from "../../../util_components/custom_modal";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import { gql, useSubscription, useLazyQuery } from "@apollo/client";

const MESSAGE_SUBSCRIPTION = gql`
  subscription($topic: String!) {
    listen(topic: $topic) {
      relatedNode {
        ... on ChatMessage {
          nodeId
          username
          textContent
          createdAt
        }
      }
    }
  }
`;

const MESSAGES = gql`
  query($groupname: String!) {
    group(name: $groupname) {
      nodeId
      chatMessagesByGroupname {
        nodes {
          nodeId
          username
          textContent
          createdAt
        }
      }
    }
  }
`;
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
const ChatModal: React.FC<{ visible: boolean; setVisible: (arg: boolean) => void; groupname: string; username: string }> = ({ visible, setVisible, groupname, username }) => {
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { topic: `message_${groupname}` },
    onSubscriptionData: () => fetchAllMessages(),
  });

  //initially fetch messages from network, but subsequent fetches will be gotten from the subscriptions cache
  const [fetchAllMessages, { data }] = useLazyQuery(MESSAGES, {
    variables: { groupname },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
  useEffect(() => {
    fetchAllMessages();
  }, []);
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
        {data
          ? data.group.chatMessagesByGroupname.nodes.map((node) => (
              <Text>
                {node.username}: {node.textContent}
              </Text>
            ))
          : undefined}
    </CustomModal>
  );
};
export default ChatModal;
