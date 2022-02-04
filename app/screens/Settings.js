import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";

const Settings = (props) => {
  return (
    <SafeAreaView style={styles.background}>
      <TopBar {...props} />
      <View style={styles.content}></View>
      <BottomBar {...props} />
      <StatusBar style="auto" />
    </SafeAreaView>
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
