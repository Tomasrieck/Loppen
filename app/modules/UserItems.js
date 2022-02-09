import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import * as fb from "../../backend/firebaseConfig";

const UserItems = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userItems, setUserItems] = useState(null);

  useEffect(() => {
    fb.db
      .collection("users/" + props.userId + "/userInfo")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          userImage: doc.data().userImage,
          userAdress: doc.data().userAdress,
        }))
      )
      .then((userInfo) => setUserInfo(userInfo));

    fb.db
      .collection("users/" + props.userId + "/items")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((doc) => ({
          id: doc.id,
          itemImage: doc.data().itemImage,
          price: doc.data().price,
          description: doc.data().description,
          title: doc.data().title,
        }))
      )
      .then((userItems) => setUserItems(userItems));
  });

  return (
    <View style={styles.content}>
      <View style={styles.item}>
        {userInfo?.map((userInfo, upperTagId) => (
          <View key={upperTagId} style={styles.upperTag}>
            <Image
              style={styles.userImage}
              source={{
                uri: userInfo.userImage,
              }}
            />
            <Text style={styles.username}>{userInfo.username}</Text>
          </View>
        ))}
        {userItems?.map((userItems, itemImageId) => (
          <Image
            key={itemImageId}
            style={styles.itemImage}
            source={{
              uri: userItems.itemImage,
            }}
          />
        ))}
        {userInfo?.map((userInfo, userAdressId) => (
          <Text key={userAdressId} style={styles.itemKmAway}>
            {userInfo.userAdress} km
          </Text>
        ))}
        {userItems?.map((userItems, underTagId) => (
          <View key={underTagId} style={styles.underTag}>
            <Text style={styles.itemTitle}>{userItems.title}, </Text>
            <Text style={styles.itemDesc}>{userItems.description}</Text>
            <Text style={styles.itemPrice}>{userItems.price} ,-</Text>
          </View>
        ))}
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

export default UserItems;
