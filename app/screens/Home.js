import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";
import ProductItem from "../modules/ProductItem.js";

let module = require("../../backend/products");

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
