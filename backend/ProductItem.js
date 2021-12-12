import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import { products } from "/Users/tomasrieck/Dev/GitHub/Loppen/backend/products.js";

const ProductItem = ({ item }) => {
  return (
    <View style={styles.content}>
      <View style={styles.item}>
        <Image
          style={styles.itemImage}
          source={{
            uri: item.image,
          }}
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemKmAway}>{item.kmAway} km</Text>
        <Text style={styles.itemTitle}>{item.price} ,-</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "85%",
  },
  itemImage: {
    width: "100%",
    height: 400,
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: "Helvetica",
  },
  itemKmAway: {
    fontSize: 12,
  },
  itemPrice: {
    fontSize: 18,
  },
});

export default ProductItem;
