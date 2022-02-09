import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  useColorScheme,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as fb from "../../backend/firebaseConfig";

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignUp = () => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <View style={styles.logo}>
        <Image
          style={[{width: 150, height: 70,}, themeContainerStyle]}
          source={require("../assets/logo.png")}
        />
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Home")}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    backgroundColor: "white",
    tintColor: "black",
  },
  darkTheme: {
    backgroundColor: "black",
    tintColor: "white",
  },
  background: {
    flex: 1,
    flexDirection: "column",
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderColor: "gray",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: "white",
    width: "50%",
    top: 10,
  },
  button: {
    justifyContent: "space-between",
    backgroundColor: "rgb(82, 183, 255)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  }
});

export default Login;
