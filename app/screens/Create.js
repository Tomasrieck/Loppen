import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  useColorScheme,
  View,
  Button,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";

import * as fb from "../../backend/firebaseConfig";
import TopBar from "../modules/TopBar";
import BottomBar from "../modules/BottomBar";

const Create = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(undefined);

  const [description, onChangeDescription] = React.useState(null);
  const [price, onChangePrice] = React.useState(null);
  const [title, onChangeTitle] = React.useState(null);
  const [zipCode, onChangeZipCode] = React.useState(null);

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
          setImageUrl(url);
          console.log("download url: ", url);
          blob.close();
          return url;
        });
      }
    );
    fb.db.collection("userItems").add({
      description: description,
      price: price,
      title: title,
      zipCode: zipCode,
      itemImage: imageUrl,
      userId: fb.auth.currentUser?.uid,
    });
  };

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <TopBar {...props} />

      <View style={styles.content}>
        <View style={styles.inputField}>
          <TextInput
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Titel"
            style={styles.textInput}
            maxLength={15}
          />
          <TextInput
            onChangeText={onChangeDescription}
            value={description}
            placeholder="Beskrivelse"
            style={styles.textInput}
            numberOfLines={3}
            maxLength={60}
          />
          <TextInput
            onChangeText={onChangePrice}
            value={price}
            placeholder="Pris"
            keyboardType="numeric"
            style={styles.textInput}
            maxLength={3}
          />
          <TextInput
            onChangeText={onChangeZipCode}
            value={zipCode}
            placeholder="Postnummer"
            keyboardType="numeric"
            style={styles.textInput}
            maxLength={4}
          />
          <TouchableOpacity style={styles.pickButton} onPress={PickImage}>
            <Text style={styles.buttonText}>Vælg billede</Text>
          </TouchableOpacity>
        </View>
        {!uploading ? (
          <TouchableOpacity style={styles.uploadButton} onPress={UploadImage}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
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
    top: 20,
  },
  inputField: {
    alignSelf: "flex-start",
    left: 20,
    marginRight: 40,
    flex: 0.9,
  },
  textInput: {
    fontSize: 40,
    margin: 7,
  },
  pickButton: {
    top: 20,
    alignItems: "center",
    backgroundColor: "gray",
    width: 250,
    paddingVertical: 15,
    borderRadius: 10,
  },
  uploadButton: {
    alignItems: "center",
    backgroundColor: "rgb(82, 183, 255)",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  },
});

export default Create;
