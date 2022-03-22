import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as fb from "../../backend/firebaseConfig";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";
import MyItems from "../modules/MyItems.js";

const MySite = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <ScrollView style={styles.scroll}>
        <MyItems userId={fb.auth.currentUser?.uid} />
      </ScrollView>

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
  scroll: {
    flex: 1,
    top: 10,
  },
  test: {
    fontSize: 20,
  },
});

export default MySite;
