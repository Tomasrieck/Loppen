import React from "react";
import {
  StyleSheet,
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
    <SafeAreaView style={[styles.bar, themeContainerStyle]}>
      <Image
        style={[styles.logo, themeContainerStyle]}
        source={require("../assets/logo.png")}
      />
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("Menu")}
      >
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/menuIcon.png")}
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
    tintColor: "rgb(230,230,230)",
  },
  logo: {
    width: 85,
    height: 28,
    marginLeft: 30,
  },
  icons: {
    width: 35,
    height: 20,
    marginRight: 30,
    bottom: 4,
  },
  bar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  dropdown: {
    right: 20,
    position: "absolute",
    backgroundColor: "gray",
    top: 50,
    paddingHorizontal: 10,
  },
});

export default TopBar;
