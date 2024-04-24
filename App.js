import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserNavigator from "./navigation/UserNavigator";
import { navigationRef } from "./navigation/rootNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  useEffect(() => {
    console.log("App mounted");
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <UserNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
