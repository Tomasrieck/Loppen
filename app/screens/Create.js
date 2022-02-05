import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  Platform,
  Image,
  ActivityIndicator,
  Text,
  TextInput,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";
import Constants from "expo-constants";

import db from "../../backend/firebaseConfig";
import TopBar from "../modules/TopBar";
import BottomBar from "../modules/BottomBar";

const Create = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [username, onChangeUsername] = React.useState(null);
  const [userImage, onChangeUserImage] = React.useState(null);
  const [itemImage, onChangeItemImage] = React.useState(null);
  const [description, onChangeDescription] = React.useState(null);
  const [price, onChangePrice] = React.useState(null);
  const [title, onChangeTitle] = React.useState(null);
  const [distance, onChangeDistance] = React.useState(null);

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    }
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const UploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("download url: ", url);
          blob.close();
          return url;
        });
      }
    );
  };

  const uploadData = async () => {
    db.collection("users").add({
      username: username,
      userImage: userImage,
      itemImage: image,
      description: description,
      price: price,
      title: title,
      distance: distance,
    });
  };

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <TopBar {...props} />
      <View style={styles.content}>
        <Button
          style={styles.button}
          title={"Vælg billede"}
          onPress={PickImage}
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
        {!uploading ? (
          <Button
            style={styles.button}
            title={"Upload"}
            onPress={UploadImage}
          />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
        <TextInput
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Navn"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Beskrivelse"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={onChangePrice}
          value={price}
          placeholder="Pris"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={onChangeDistance}
          value={distance}
          placeholder="Placering"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={onChangeTitle}
          value={title}
          placeholder="Titel"
          keyboardType="numeric"
        />
        <Button style={styles.button} title={"Send"} onPress={uploadData} />
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
    tintColor: "white",
  },
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {},
});

export default Create;
