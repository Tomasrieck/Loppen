import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  useColorScheme,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";

import * as fb from "../../backend/firebaseConfig";

const EditProfile = (props) => {
  const [userImage, setUserImage] = useState();
  const [newUserImage, setNewUserImage] = useState();
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  var newImage = "";

  const [uploading, setUploading] = useState(false);

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  const getUserInfo = () => {
    fb.db
      .collection("userInfo")
      .doc(fb.auth.currentUser?.uid)
      .onSnapshot((doc) => {
        setFullName(doc.data().fullName);
        setPhone(doc.data().phone);
        setEmail(doc.data().email);
        setUserImage(doc.data().userImage);
        setAddress(doc.data().address);
        setZipCode(doc.data().zipCode);
      });
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.001,
    });
    console.log(result);
    if (!result.cancelled) {
      setNewUserImage(result.uri);
    }
  };

  const UpdateUserInfo = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", newUserImage, true);
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
        snapshot.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            setUploading(false);
            newImage = url;
            console.log("download url: ", url);
            blob.close();
            return url;
          })
          .then(() => {
            fb.db
              .collection("userInfo")
              .doc(fb.auth.currentUser?.uid)
              .update({
                fullName: fullName,
                userImage: newImage,
                email: email,
                phone: phone,
                zipCode: zipCode,
                address: address,
              })
              .then(() => {
                console.log("User image updated!");
                props.navigation.goBack();
              });
          });
      }
    );
  };

  useEffect(async () => {
    getUserInfo();
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    }
  }, []);

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
      <View style={styles.imageContainer}>
        {newUserImage == null ? (
          <Image style={styles.image} source={{ uri: userImage }} />
        ) : (
          <Image style={styles.image} source={{ uri: newUserImage }} />
        )}
        <TouchableOpacity style={styles.pickButton} onPress={PickImage}>
          <Text style={{ color: "rgb(82, 183, 255)", marginTop: 7 }}>
            Skift profilbillede
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <Text style={{ color: "rgb(150,150,150)" }}>Navn:</Text>
            <TextInput
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              style={[styles.input, themeTextStyle]}
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={{ color: "rgb(150,150,150)" }}>Telefon:</Text>
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={[styles.input, themeTextStyle]}
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={{ color: "rgb(150,150,150)" }}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={[styles.input, themeTextStyle]}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={{ color: "rgb(150,150,150)" }}>Postnr.:</Text>
            <TextInput
              value={zipCode}
              onChangeText={(text) => setZipCode(text)}
              style={[styles.input, themeTextStyle]}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={{ color: "rgb(150,150,150)" }}>Adresse:</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={[styles.input, themeTextStyle]}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      {!uploading ? (
        <TouchableOpacity style={styles.nextButton} onPress={UpdateUserInfo}>
          <Text style={styles.buttonText}>Gem</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="rgb(82, 183, 255)" />
      )}

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
    flexDirection: "column",
  },
  container: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    top: 50,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  input: {
    width: "78%",
    borderBottomColor: "rgb(180,180,180)",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  nextButton: {
    alignSelf: "center",
    width: "90%",
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
  icon: {
    width: 35,
    height: 35,
    marginLeft: 15,
  },
  imageContainer: {
    marginTop: 17,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 70,
  },
});

export default EditProfile;
