import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";

const Settings = (props) => {
  return (
    <View style={styles.background}>
      <TopBar {...props} />
      <View style={styles.content}></View>
      <BottomBar {...props} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default Settings;
