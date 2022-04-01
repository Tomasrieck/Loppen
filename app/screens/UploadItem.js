import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  useColorScheme,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as fb from "../../backend/firebaseConfig";
import * as ci from "./ChooseImage";
import BottomBar from "../modules/BottomBar";

const UploadItem = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  const themeContainerStyleText =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  const [price, onChangePrice] = React.useState(null);
  const [title, onChangeTitle] = React.useState(null);
  const [zipCode, onChangeZipCode] = React.useState(null);

  const UploadItem = async () => {
    fb.db.collection("userItems").add({
      price: price,
      title: title,
      zipCode: zipCode,
      itemImage: ci.theImage,
      userId: fb.auth.currentUser?.uid,
    });
  };

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
      <View style={styles.content}>
        <KeyboardAvoidingView style={styles.inputField}>
          <TextInput
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Titel"
            style={[styles.textInput, themeContainerStyleText]}
            maxLength={25}
            autoFocus
          />
          <TextInput
            onChangeText={onChangePrice}
            value={price}
            placeholder="Pris"
            keyboardType="numeric"
            style={[styles.textInput, themeContainerStyleText]}
            maxLength={3}
          />
          <TextInput
            onChangeText={onChangeZipCode}
            value={zipCode}
            placeholder="Postnummer"
            keyboardType="numeric"
            style={[styles.textInput, themeContainerStyleText]}
            maxLength={4}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.uploadButton} onPress={UploadItem}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <BottomBar {...props} />
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
  lightThemeText: {
    color: "black",
  },
  darkThemeText: {
    color: "rgb(230,230,230)",
  },
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    top: 20,
  },
  inputField: {
    alignSelf: "flex-start",
    left: 20,
    marginRight: 40,
  },
  textInput: {
    fontSize: 40,
    margin: 7,
  },
  uploadButton: {
    backgroundColor: "rgb(82, 183, 255)",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
    top: 37,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 15,
  },
});

export default UploadItem;
