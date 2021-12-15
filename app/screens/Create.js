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

import TopBar from "../content/TopBar";
import TopBar from "../content/TopBar";

const Create = (props) => {
  return (
    <View style={[styles.background, themeContainerStyle]}>
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

export default Create;
