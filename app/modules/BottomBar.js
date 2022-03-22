import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";

const BottomBar = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.bar, themeContainerStyle, { bottom: 0 }]}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("ChooseImage")}
      >
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/createIcon.png")}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("Home")}
      >
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/homeIcon.png")}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("MySite")}
      >
        <Image
          style={[styles.icons, themeContainerStyle]}
          source={require("../assets/profileIcon.png")}
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
  icons: {
    width: 35,
    height: 35,
    marginTop: 15,
    marginBottom: 15,
  },
  bar: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});

export default BottomBar;
