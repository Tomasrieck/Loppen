import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const ProductItem = ({ item }) => {
  return (
    <View style={styles.content}>
      <View style={styles.item}>
        <View style={styles.upperTag}>
          <Image
            style={styles.userImage}
            source={{
              uri: item.userImage,
            }}
          />
          <Text style={styles.userName}>{item.userName}</Text>
        </View>
        <Image
          style={styles.itemImage}
          source={{
            uri: item.itemImage,
          }}
        />
        <Text style={styles.itemKmAway}>{item.kmAway} km</Text>
        <View style={styles.underTag}>
          <Text style={styles.itemTitle}>{item.title}, </Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
          <Text style={styles.itemPrice}>{item.price} ,-</Text>
        </View>
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
    width: "100%",
    marginBottom: 20,
  },
  upperTag: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
  },
  userImage: {
    width: "15%",
    height: 50,
    borderRadius: 15,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
  },
  itemImage: {
    width: "100%",
    height: 400,
  },
  itemKmAway: {
    fontSize: 12,
    padding: 5,
  },
  underTag: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 20,
    padding: 5,
  },
  itemDesc: {
    fontSize: 16,
    color: "gray",
  },

  itemPrice: {
    padding: 5,
    position: "absolute",
    right: 0,
    fontSize: 16,
  },
});

export default ProductItem;
