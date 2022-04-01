import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as fb from "../../backend/firebaseConfig";

import TopBar from "../modules/TopBar.js";
import BottomBar from "../modules/BottomBar.js";
import Users from "../modules/Users.js";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTheme : styles.darkTheme;

  const [refreshing, setRefreshing] = React.useState(false);
  const [userZipCode, setUserZipCode] = useState("");
  const [nearbyUsers, setNearbyUsers] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getUserZipCode = () => {
    fb.db
      .collection("userInfo")
      .doc(fb.auth.currentUser?.uid)
      .onSnapshot((doc) => {
        setUserZipCode(doc.data().zipCode);
      });
  };

  const getNearbyUsers = () => {
    getUserZipCode();
    fb.db
      .collection("userInfo")
      .where("zipCode", "==", userZipCode)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          if (doc.id != fb.auth.currentUser?.uid) {
            setNearbyUsers((arr) => [...arr, doc.id]);
          }
        });
      });
  };

  console.log(nearbyUsers);
  console.log(nearbyUsers.length);
  console.log(userZipCode);

  useEffect(() => {
    getNearbyUsers();
  }, [userZipCode]);

  return (
    <SafeAreaView style={[styles.background, themeContainerStyle]}>
      <TopBar {...props} />
      <ScrollView
        contentContainerStyle={styles.refresh}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScrollView style={styles.scroll}>
          {nearbyUsers.length < 1 ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("OthersSite", nearbyUsers[0])
              }
            >
              <View>
                <Users userId={nearbyUsers[0]} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {nearbyUsers.length < 2 ? null : (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("OthersSite", nearbyUsers[1])
              }
            >
              <View>
                <Users userId={nearbyUsers[1]} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {nearbyUsers.length < 3 ? null : (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("OthersSite", nearbyUsers[2])
              }
            >
              <View>
                <Users userId={nearbyUsers[2]} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {nearbyUsers.length < 4 ? null : (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("OthersSite", nearbyUsers[3])
              }
            >
              <View>
                <Users userId={nearbyUsers[3]} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {nearbyUsers.length < 5 ? null : (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("OthersSite", nearbyUsers[4])
              }
            >
              <View>
                <Users userId={nearbyUsers[4]} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {nearbyUsers.length < 6 ? null : (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("OthersSite", nearbyUsers[5])
              }
            >
              <View>
                <Users userId={nearbyUsers[5]} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </ScrollView>
      </ScrollView>
      <BottomBar {...props} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    backgroundColor: "white",
    tintColor: "black",
  },
  darkTheme: {
    backgroundColor: "black",
    tintColor: "rgb(230,230,230)",
  },
  background: {
    flex: 1,
  },
  refresh: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  test: {
    fontSize: 20,
  },
});

export default Home;
