import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import Dashboard from "../screens/Dashboard";
import Account from "../screens/Account";
import Entries from "../screens/Entries";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homescreen"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Entries") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "My Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 8, // Adjust font size
        },
        tabBarStyle: {
          height: 60, // Adjust tab bar height
          backgroundColor: "white",
          borderTopWidth: 0, // Hide top border
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 10, // Adjust vertical padding
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Entries"
        component={Entries}
        options={{
          headerShown: false,
          headerTitle: "Entries",
          headerTitleAlign: "left",
          headerTitleStyle: { color: "green", fontSize: 26 },
        }}
      />
      <Tab.Screen
        name="My Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitle: "My Account",
          headerTitleAlign: "left",
          headerTitleStyle: { color: "black", fontSize: 26 },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
