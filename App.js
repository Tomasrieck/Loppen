import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import ChooseImage from "./app/screens/ChooseImage";
import Register from "./app/screens/Register";
import MySite from "./app/screens/MySite";
import Menu from "./app/modules/Menu";
import UploadItem from "./app/screens/UploadItem";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MySite" component={MySite} />
        <Stack.Screen name="ChooseImage" component={ChooseImage} />
        <Stack.Screen name="UploadItem" component={UploadItem} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
