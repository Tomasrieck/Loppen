import React, { useEffect, useState, useRef } from "react";
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
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as fb from "../../backend/firebaseConfig";

const Register = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fb.auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
          fb.db.collection("userInfo").doc(user.uid).set({
            email: email,
            fullName: fullName,
            phone: phone,
            address: address,
            zipCode: zipCode,
            userImage:
              "https://firebasestorage.googleapis.com/v0/b/loppenappen.appspot.com/o/lampIcon.png?alt=media&token=f3beadba-4854-4b08-89d4-cad7b45fa149",
          });
        })
        .catch((error) => alert(error.message));
    }
  };

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={[styles.icon, themeContainerStyle]}
            source={require("../assets/backIcon.png")}
          />
        </TouchableOpacity>
      </View>
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
          <TextInput
            placeholderTextColor="gray"
            placeholder="Repeat password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.input}
            secureTextEntry
            autoCorrect={false}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 50 }]}>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Full name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={styles.input}
            autoCorrect={false}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
            autoCorrect={false}
            keyboardType="numeric"
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
            autoCorrect={false}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={(text) => setZipCode(text)}
            style={styles.input}
            autoCorrect={false}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.buttonContainer, themeContainerStyle]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "rgb(82, 183, 255)" }]}
            onPress={handleSignUp}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.fadingText}>Passwords don't match</Text>
        </Animated.View>
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
    flexDirection: "column",
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderColor: "gray",
    backgroundColor: "rgb(230,230,230)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  buttonContainer: {
    width: "50%",
    top: 10,
  },
  button: {
    marginTop: 17,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgb(82, 183, 255)",
  },
  fadingContainer: {
    marginTop: 40,
  },
  fadingText: {
    fontSize: 12,
    color: "red",
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 15,
  },
});

export default Register;
