import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  useColorScheme,
  Text,
  DevSettings,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBar from "../modules/BottomBar.js";
import { TouchableOpacity } from "react-native-gesture-handler";

const Menu = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  const themeContainerStyleText =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => DevSettings.reload()}
        >
          <Text style={[styles.buttonText, themeContainerStyleText]}>
            Log ud
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  content: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  button: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "600",
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 15,
  },
});

export default Menu;
