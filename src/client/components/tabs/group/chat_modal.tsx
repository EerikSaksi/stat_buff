import React, { useEffect, useState } from "react";
import CustomModal from "../../../util_components/custom_modal";
import { StyleSheet, View } from "react-native";
import { gql, useSubscription, useLazyQuery, useMutation } from "@apollo/client";
import Loading from "../../../util_components/loading";
import { Modal } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {IMessage} from "react-native-gifted-chat/lib/Models";
import {GiftedChat} from "react-native-gifted-chat/lib/GiftedChat";

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
const SEND_MESSAGE = gql`
  mutation($username: String!, $messageInput: String!) {
    createChatMessage(input: { chatMessage: { username: $username, textContent: $messageInput } }) {
      clientMutationId
    }
  }
`;
const styles = StyleSheet.create({
  arrow: {
    color: "black",
    fontSize: 40,
    left: "2%",
    position: "absolute",
    top: 0,
    zIndex: 1
  },
});
const ChatModal: React.FC<{ visible: boolean; setVisible: (arg: boolean) => void; groupname: string; username: string, setNewMessages: (arg: number) => void }> = ({ visible, setVisible, groupname, username, setNewMessages }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([])
  const [sendMessage, {client}] = useMutation(SEND_MESSAGE, {
    variables: { username, messageInput },
  });

  //get the number of cached messages by running the messages query against the 
  const [numCachedMessages, setNumCachedMessages] = useState<undefined | number>(undefined)

  useEffect(() => {
    const {group} = client.readQuery({query: MESSAGES, variables: {groupname}})
    setNumCachedMessages(group.chatMessagesByGroupname.nodes.length)
  }, [])

  //doesn't need to fetch data. querying a message adds the node id to our cache, which will then be visible in fetchAllMessages when run with cache-only
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { topic: `message_${groupname}` },
    onSubscriptionData: () => fetchAllMessages(),
  });

  //initially fetch messages from network, but subsequent fetches will be gotten from the subscriptions cache
  const [fetchAllMessages, { data }] = useLazyQuery(MESSAGES, {
    variables: { groupname },
    onCompleted: (data) => {
      setNewMessages(data.group.chatMessagesByGroupname.nodes.length - numCachedMessages!)
      setMessages(
        data.group.chatMessagesByGroupname.nodes    .map((node) => {
        return { user: { name: node.username, _id: node.username }, _id: node.nodeId, createdAt: node.createdAt, text: node.textContent };
        })
        .reverse()
      )
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  useEffect(() => {
    //only fetch new messages once we know how many cached messages, otherwise we might have a race condition
    if (numCachedMessages){
      fetchAllMessages();
    }
  }, [numCachedMessages]);

  if (!data) {
    return <Loading />;
  }
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"}>
      <Ionicons style={styles.arrow} onPress={() => setVisible(false)} name="ios-arrow-round-back" />
      <GiftedChat
        placeholder={`Send a message to "${groupname}"`}
        onInputTextChanged={(v) => setMessageInput(v)}
        user = {{name: username, _id: username}}
        onSend={() => {
          sendMessage();
        }}
        renderUsernameOnMessage
        messages={messages}
      ></GiftedChat>
    </Modal>
  );
};
export default ChatModal;
