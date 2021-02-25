import React, { useLayoutEffect, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

// components
import ChatListItem from "../components/ChatListItem";

// firebase
import { auth, db } from "../firebase";

function HomeScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("signal_chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 20 }}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("AddChat");
              }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={{ height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => (
          <ChatListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
