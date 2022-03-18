import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  useColorScheme,
  Text,
  DevSettings,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";
import { TouchableOpacity } from "react-native-gesture-handler";

const Menu = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  const themeContainerTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => DevSettings.reload()}
        >
          <Text style={[styles.buttonText, themeContainerTextStyle]}>
            Log ud
          </Text>
        </TouchableOpacity>
      </View>
      <BottomBar {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    backgroundColor: "white",
    tintColor: "black",
    color: "black",
  },
  darkTheme: {
    backgroundColor: "black",
    tintColor: "white",
    color: "white",
  },
  lightThemeText: {
    color: "black",
  },
  darkThemeText: {
    color: "white",
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
});

export default Menu;
