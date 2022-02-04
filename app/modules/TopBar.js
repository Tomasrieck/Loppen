import React from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";

const TopBar = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.bar, themeContainerStyle, { top: 0 }]}>
      <Image
        style={[styles.logo, themeContainerStyle]}
        source={require("../assets/logo.png")}
      />
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("Settings")}
      >
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/settingsIcon.png")}
        />
      </TouchableWithoutFeedback>
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
  logo: {
    width: 85,
    height: 35,
    marginLeft: 30,
  },
  icons: {
    width: 35,
    height: 35,
    marginRight: 30,
    marginTop: 15,
    marginBottom: 15,
  },
  bar: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default TopBar;
