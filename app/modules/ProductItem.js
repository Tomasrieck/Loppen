import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import db from "../../backend/firebaseConfig";

const ProductItem = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          userImage: doc.data().userImage,
          itemImage: doc.data().itemImage,
          price: doc.data().price,
          distance: doc.data().distance,
          description: doc.data().description,
          title: doc.data().title,
        }))
      )
      .then((users) => setUsers(users));
  });

  return (
    <View style={styles.content}>
      {users?.map((users) => (
        <View style={styles.item}>
          <View style={styles.upperTag}>
            <Image
              style={styles.userImage}
              source={{
                uri: users.userImage,
              }}
            />
            <Text
              key={users.id == "E82QisKNMHRizAkENfHK"}
              style={styles.username}
            >
              {users.username}
            </Text>
          </View>
          <Image
            style={styles.itemImage}
            source={{
              uri: users.itemImage,
            }}
          />
          <Text style={styles.itemKmAway}>{users.distance} km</Text>
          <View style={styles.underTag}>
            <Text style={styles.itemTitle}>{users.title}, </Text>
            <Text style={styles.itemDesc}>{users.description}</Text>
            <Text style={styles.itemPrice}>{users.price} ,-</Text>
          </View>
        </View>
      ))}
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
  username: {
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
