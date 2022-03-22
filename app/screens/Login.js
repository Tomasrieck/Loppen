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

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const goToRegister = () => {
    props.navigation.navigate("Register");
  };

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <View style={styles.logo}>
        <Image
          style={[{ width: 150, height: 70 }, themeContainerStyle]}
          source={require("../assets/logo.png")}
        />
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize={"none"}
            autoFocus
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
            autoCorrect={false}
          />
        </View>

        <View style={[styles.buttonContainer, themeContainerStyle]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "rgb(82, 183, 255)" }]}
            onPress={handleLogin}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "white" }]}
            onPress={goToRegister}
          >
            <Text style={{ color: "rgb(82, 183, 255)" }}>Register</Text>
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
    tintColor: "rgb(230,230,230)",
  },
  background: {
    flex: 1,
  },
  logo: {
    flex: 0.5,
    alignItems: "center",
    top: 47,
  },
  container: {
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
    marginTop: 10,
  },
  buttonContainer: {
    width: "50%",
    top: 10,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgb(82, 183, 255)",
  },
});

export default Login;
