import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ListItem, Avatar } from "react-native-elements";

// firebase
import { db } from "../firebase";

function ChatListItem({ id, chatName, enterChat }) {
  const [chatMessages, setChatMessage] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("signal_chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessage(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages[0]?.image ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default ChatListItem;

const styleSheet = StyleSheet.create({});
