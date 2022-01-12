import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "../../backend/firebase";
// import Constants from "expo-constants";

import TopBar from "../modules/TopBar";
import BottomBar from "../modules/BottomBar";

const Create = (props) => {
  const [image, setImage] = useState(null);
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
        resolve(xhr.respose);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.resposeType = "blob";
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

  return (
    <View style={styles.background}>
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
      </View>
      <BottomBar {...props} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
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
