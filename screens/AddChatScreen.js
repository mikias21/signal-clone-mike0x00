import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Icon } from "react-native-elements";

// import firebase
import { db } from "../firebase";

function AddChat({ navigation }) {
  const [title, setTitle] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("signal_chats")
      .add({
        chatName: title,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button
        disabled={!title}
        title="Create a new chat"
        onPress={createChat}
      />
    </View>
  );
}

export default AddChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
