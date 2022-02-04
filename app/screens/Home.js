import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";
import ProductItem from "../modules/ProductItem.js";

import db from "../../backend/firebaseConfig";

const Home = (props) => {
  const [users, setUsers] = useState(null);

  useEffect((props) => {
    db.collection("users")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((doc) => ({
          id: doc.id,
        }))
      )
      .then((users) => setUsers(users));
  });

  return (
    <View style={styles.background}>
      <TopBar {...props} />

      <ScrollView style={styles.scroll}>
        {users?.map((users) => (
          <ProductItem />
        ))}
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
  test: {
    fontSize: 20,
  },
});

export default Home;
