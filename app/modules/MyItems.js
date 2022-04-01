import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Appearance,
  TouchableOpacity,
} from "react-native";

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
      .where("userId", "==", this.props.userId)
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
      .doc(this.props.userId)
      .onSnapshot((doc) => {
        this.setState({
          userInfo: {
            fullName: doc.data().fullName,
            userImage: doc.data().userImage,
            phone: doc.data().phone,
            address: doc.data().address,
            zipCode: doc.data().zipCode,
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
          <View style={styles.info}>
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
          <View style={{ marginTop: 10 }}>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>Telefon: </Text>
              <Text style={styles.userText}> {this.state.userInfo.phone}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>Postnr.: </Text>
              <Text style={styles.userText}>
                {" "}
                {this.state.userInfo.zipCode}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>Adresse: </Text>
              <Text style={styles.userText}>
                {" "}
                {this.state.userInfo.address}
              </Text>
            </View>
          </View>
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
    color: "rgb(230,230,230)",
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
    flexDirection: "column",
    paddingBottom: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
  info: {
    paddingLeft: 7,
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 10,
  },
  userText: {
    color: "gray",
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
