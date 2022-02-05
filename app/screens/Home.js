import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";
import ProductItem from "../modules/ProductItem.js";

const Home = (props) => {
  const [users, setUsers] = useState(null);

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <TopBar {...props} />

      <ScrollView style={styles.scroll}>
        <ProductItem id={"E82QisKNMHRizAkENfHK"} />
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
    tintColor: "white",
  },
  background: {
    flex: 1,
  },
  scroll: {
    backgroundColor: "white",
    flex: 1,
  },
  test: {
    fontSize: 20,
  },
});

export default Home;
