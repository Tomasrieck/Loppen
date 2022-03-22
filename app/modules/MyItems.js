import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Appearance } from "react-native";

import * as fb from "../../backend/firebaseConfig";

class MySite extends Component {
  state = {
    userItems: [],
    userInfo: {
      fullName: "",
      userImage: null,
    },
  };

  constructor(props) {
    super(props);
    this.subscriber = fb.db
      .collection("userItems")
      .where("userId", "==", fb.auth.currentUser?.uid)
      .onSnapshot((docs) => {
        let userItems = [];
        docs.forEach((doc) => {
          userItems.push(doc.data());
        });
        this.setState({ userItems });
        console.log(userItems);
      });
    this.subscriber = fb.db
      .collection("userInfo")
      .doc(fb.auth.currentUser?.uid)
      .onSnapshot((doc) => {
        this.setState({
          userInfo: {
            fullName: doc.data().fullName,
            userImage: doc.data().userImage,
          },
        });
      });
  }

  render() {
    let textTheme = null;
    if (Appearance.getColorScheme() == "dark") {
      textTheme = styles.darkTheme;
    } else {
      textTheme = styles.lightTheme;
    }
    return (
      <View style={styles.content}>
        <View style={styles.upperTag}>
          <Image
            style={styles.userImage}
            source={{
              uri: this.state.userInfo.userImage,
            }}
          />
          <Text style={[styles.fullName, textTheme]}>
            {this.state.userInfo.fullName}
          </Text>
        </View>
        {this.state.userItems.length > 0 ? (
          <>
            {this.state.userItems.map((item, index) => (
              <View style={styles.item} key={index}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: item.itemImage,
                  }}
                />
                <View style={styles.underTag}>
                  <Text style={[styles.itemTitle, textTheme]}>
                    {item.title},{" "}
                  </Text>
                  <Text style={[styles.itemDesc, textTheme]}>
                    {item.description}
                  </Text>
                  <Text style={[styles.itemPrice, textTheme]}>
                    {item.price} ,-
                  </Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View
            style={{
              height: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Du har i øjeblikket ingen ting til salg</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lightTheme: {
    color: "black",
  },
  darkTheme: {
    color: "white",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "100%",
    marginBottom: 20,
  },
  upperTag: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    paddingBottom: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
  userImage: {
    width: "15%",
    height: 50,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  fullName: {
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

export default MySite;
