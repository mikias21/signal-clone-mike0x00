import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Text } from "react-native-elements";

// firebase
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: fullname,
          photoURL:
            image ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
        navigation.navigate("Login");
      })
      .catch((err) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Element
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Fullname"
          autoFocus
          type="text"
          value={fullname}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="picture url"
          type="text"
          value={image}
          onChangeText={(text) => setImage(text)}
          onSubmitEditing={register}
        />
      </View>
      <View style={{ height: 100 }} />
      <Button
        title="Register"
        onPress={register}
        raised
        style={styles.button}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
