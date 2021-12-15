import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

import TopBar from "../content/TopBar.js";
import BottomBar from "../content/BottomBar.js";

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
