import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  View,
  Image,
  SafeAreaView,
  useColorScheme,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import ProductItem from "/Users/tomasrieck/Dev/GitHub/Loppen/backend/ProductItem.js";

let module = require("/Users/tomasrieck/Dev/GitHub/Loppen/backend/products.js");

const Home = ({ navigation }) => {
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
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            style={[styles.icons, themeContainerStyle]}
            source={require("../assets/settingsIcon.png")}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <ScrollView style={styles.scroll}>
        <ProductItem item={module.products[0]} />
        <ProductItem item={module.products[1]} />
        <ProductItem item={module.products[2]} />
      </ScrollView>

      <SafeAreaView style={[styles.bar, { bottom: 0 }]}>
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
  scroll: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default Home;
