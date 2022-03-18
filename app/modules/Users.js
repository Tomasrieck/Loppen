import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  useColorScheme,
  Appearance,
} from "react-native";
import Swiper from "react-native-swiper";

import * as fb from "../../backend/firebaseConfig";

class Users extends Component {
  state = {
    userItems: [],
    userInfo: {
      fullName: null,
      userImage: null,
    },
  };

  constructor(props) {
    super(props);
    this.subscriber = fb.db
      .collection("userInfo")
      .doc(props.userId)
      .onSnapshot((doc) => {
        this.setState({
          userInfo: {
            fullName: doc.data().fullName,
            userImage: doc.data().userImage,
          },
        });
      });
    this.subscriber = fb.db
      .collection("userItems")
      .where("userId", "==", props.userId)
      .onSnapshot((docs) => {
        let userItems = [];
        docs.forEach((doc) => {
          userItems.push(doc.data());
        });
        this.setState({ userItems });
        console.log(userItems);
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
        <View style={styles.item}>
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
          <Swiper loop={false} height={530} dotColor={"gray"}>
            {this.state.userItems.map((user, index) => (
              <View key={index}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: user.itemImage,
                  }}
                />
                <View style={styles.underTag}>
                  <Text style={[styles.itemTitle, textTheme]}>
                    {user.title},{" "}
                  </Text>
                  <Text style={[styles.itemDesc, textTheme]}>
                    {user.description}
                  </Text>
                  <Text style={[styles.itemPrice, textTheme]}>
                    {user.price} ,-
                  </Text>
                </View>
              </View>
            ))}
          </Swiper>
        </View>
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
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  item: {
    width: "100%",
  },
  upperTag: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
  },
  userImage: {
    width: "15%",
    height: 50,
    borderRadius: 15,
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

export default Users;
