import React, { useEffect, useState } from "react";
import CustomModal from "../../../util_components/custom_modal";
import { StyleSheet, View } from "react-native";
import { gql, useSubscription, useLazyQuery, useMutation } from "@apollo/client";
import Loading from "../../../util_components/loading";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMessage } from "react-native-gifted-chat/lib/Models";
import { GiftedChat } from "react-native-gifted-chat/lib/GiftedChat";

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
        ... on Workout {
          nodeId
          totalDamage
          username
          createdAt
          sets
          averageRir
        }
        ... on UserExercise {
          nodeId
          strongerpercentage
          username
          createdAt
          slugName
          repetitions
          liftmass
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
      battlesByGroupname(last: 2) {
        nodes {
          nodeId
          workoutsByGroupnameAndBattleNumber {
            nodes {
              nodeId
              totalDamage
              username
              createdAt
              sets
              averageRir
            }
          }
          userExercisesByGroupnameAndBattleNumber {
            nodes {
              nodeId
              strongerpercentage
              username
              createdAt
              slugName
              repetitions
              liftmass
            }
          }
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
    zIndex: 1,
  },
});
function sort_by_date(a: IMessage, b: IMessage) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
function chatNodeToImessage(node) {
  return { user: { name: node.username, _id: node.username }, _id: node.nodeId, createdAt: node.createdAt, text: node.textContent };
}
function workoutNodeToImessage(workout) {
  return {
    user: { name: workout.username, _id: workout.username },
    _id: workout.nodeId,
    createdAt: workout.createdAt,
    text: `*Completed a workout with ${workout.sets} sets, ${workout.averageRir} reps in reserve for a total of ${workout.totalDamage} damage.*`,
  };
}
function userExerciseNodeToImessage(exercise) {
  return {
    user: { name: exercise.username, _id: exercise.username },
    _id: exercise.nodeId,
    createdAt: exercise.createdAt,
    text: `Hit a new PR: ${exercise.liftmass}kg x ${exercise.repetitions} (stronger than ${exercise.strongerpercentage}%)`,
  };
}

const ChatModal: React.FC<{ visible: boolean; setVisible: (arg: boolean) => void; groupname: string; username: string; setNewMessages: (arg: number) => void }> = ({
  visible,
  setVisible,
  groupname,
  username,
  setNewMessages,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [sendMessage, { client }] = useMutation(SEND_MESSAGE, {
    variables: { username, messageInput },
  });

  //get the number of cached messages by running the messages query against the
  const [numCachedMessages, setNumCachedMessages] = useState<undefined | number>(undefined);

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { topic: `event_${groupname}` },
    onSubscriptionData: ({ subscriptionData }) => {
      const node = subscriptionData.data.listen.relatedNode;
      var newMessage;
      switch (node.__typename) {
        case "ChatMessage":
          newMessage = chatNodeToImessage(node);
          break;
        case "Workout":
          newMessage = workoutNodeToImessage(node);
          break;
        case "UserExercise":
          newMessage = userExerciseNodeToImessage(node)
          break
      }
      setMessages((oldMessages) => [newMessage, ...oldMessages]);
    },
  });
  //initially fetch messages from network, but subsequent fetches will be gotten from the subscriptions cache
  const [fetchAllMessages, { data }] = useLazyQuery(MESSAGES, {
    variables: { groupname },
    onCompleted: (data) => {
      setNewMessages(data.group.chatMessagesByGroupname.nodes.length - numCachedMessages!);
      const chatMessages = data.group.chatMessagesByGroupname.nodes.map((node) => chatNodeToImessage(node)).reverse();
      const workouts =
        //flatten all workouts from all battles in to a one dimensional array
        data.group.battlesByGroupname.nodes
          .flatMap((battle) => battle.workoutsByGroupnameAndBattleNumber.nodes)
          //map each workout to a message
          .map((workout) => workoutNodeToImessage(workout));
      const userExercises =
        //same as above for workouts
        data.group.battlesByGroupname.nodes.flatMap((battle) => battle.userExercisesByGroupnameAndBattleNumber.nodes).map((exercise) => userExerciseNodeToImessage(exercise));
      //combine all messages sorted by date
      setMessages(chatMessages.concat(workouts).concat(userExercises).sort(sort_by_date));
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
  useEffect(() => {
    const query = client.readQuery({ query: MESSAGES, variables: { groupname } });
    if (query) {
      setNumCachedMessages(query.group.chatMessagesByGroupname.nodes.length);
    } else {
      setNumCachedMessages(0);
    }
  }, []);

  useEffect(() => {
    if (numCachedMessages !== undefined && !data) {
      fetchAllMessages();
    }
  }, [numCachedMessages]);

  //if the user opens the chat set the number of new messages to 0
  useEffect(() => {
    if (visible) {
      setNewMessages(0);
      if (data) {
        setNumCachedMessages(data.group.chatMessagesByGroupname.nodes.length);
      }
    }
  }, [visible, data]);

  if (!data) {
    return null;
  }
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"}>
      <Ionicons style={styles.arrow} onPress={() => setVisible(false)} name="ios-arrow-round-back" />
      <GiftedChat
        placeholder={`Send a message to "${groupname}"`}
        onInputTextChanged={(v) => setMessageInput(v)}
        user={{ name: username, _id: username }}
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
