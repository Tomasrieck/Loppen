import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";

import * as fb from "../../backend/firebaseConfig";
import TopBar from "../modules/TopBar";
import BottomBar from "../modules/BottomBar";

export var theImage = "";

const ChooseImage = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);

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
      quality: 0.5,
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
          theImage = url;
          console.log("download url: ", url);
          blob.close();
          props.navigation.navigate("UploadItem");
          return url;
        });
      }
    );
  };

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.pickButton} onPress={PickImage}>
          <Text style={styles.buttonText}>Vælg billede</Text>
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.image} />
        {!uploading ? (
          <TouchableOpacity style={styles.nextButton} onPress={UploadImage}>
            <Text style={styles.buttonText}>Næste</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="rgb(82, 183, 255)" />
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
    tintColor: "rgb(230,230,230)",
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    top: 20,
    justifyContent: "space-around",
  },
  pickButton: {
    alignItems: "center",
    backgroundColor: "gray",
    width: 250,
    paddingVertical: 15,
    borderRadius: 10,
  },
  nextButton: {
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
  image: {
    borderColor: "gray",
    borderWidth: 2,
    height: 300,
    width: 300,
  },
});

export default ChooseImage;
