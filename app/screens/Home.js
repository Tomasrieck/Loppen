import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  useColorScheme,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import TopBar from "../content/TopBar.js";
import BottomBar from "../content/BottomBar.js";
import ProductItem from "../content/ProductItem.js";

let module = require("/Users/tomasrieck/Dev/GitHub/Loppen/backend/products.js");

const Home = (props) => {
  return (
    <View style={styles.background}>
      <TopBar {...props} />

      <ScrollView style={styles.scroll}>
        <ProductItem item={module.products[0]} />
        <ProductItem item={module.products[1]} />
        <ProductItem item={module.products[2]} />
        <ProductItem item={module.products[3]} />
      </ScrollView>

      <BottomBar {...props} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default Home;
