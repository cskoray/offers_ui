import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import OffersScreen from "../screens/Offers";
import FavoritesScreen from "../screens/Favorites";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Offers"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Offers") {
              focused ? (iconName = "people") : (iconName = "people-outline");
            } else if (route.name === "Favorites") {
              return focused ? (
                <MaterialCommunityIcons
                  name="star-shooting"
                  size={32}
                  color={color}
                />
              ) : (
                <MaterialCommunityIcons
                  name="star-shooting-outline"
                  size={32}
                  color={color}
                />
              );
            }

            return <Ionicons name={iconName} size={32} color={color} />;
          },
          tabBarActiveTintColor: "#0f172a",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 90,
            backgroundColor: "#fff",
            position: "absolute",
          },
        })}
      >
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Offers" component={OffersScreen} />
      </Tab.Navigator>
    </>
  );
};

const UserNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          screenOptions={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default UserNavigator;
