import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";

const Settings = ({ navigation }) => {
  const colorScheme = useColorScheme();

  // const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;
  return (
    <View style={[styles.background, themeContainerStyle]}>
      <SafeAreaView style={[styles.bar, { top: 0 }]}>
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/homeIcon.png")}
        />
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/homeIcon.png")}
        />
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/settingsIcon.png")}
        />
      </SafeAreaView>
      <View style={styles.content}></View>
      <SafeAreaView style={[styles.bar, { bottom: 0 }]}>
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/createIcon.png")}
        />
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
          <Image
            style={[styles.icons, themeContainerStyle]}
            source={require("../assets/homeIcon.png")}
          />
        </TouchableWithoutFeedback>
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/menuIcon.png")}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  lightTheme: {
    backgroundColor: "white",
    tintColor: "black",
  },
  darkTheme: {
    backgroundColor: "black",
    tintColor: "white",
  },
  bar: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  icons: {
    width: 35,
    height: 35,
    marginTop: 15,
    marginBottom: 15,
  },
  content: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default Settings;
