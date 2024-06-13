import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeTabNavigator from "./Tab.Route";
import Account from "../screens/Account";
import Entries from "../screens/Entries";

const Stack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color:'#0C2A02'
  },
};

const StackRoute = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Homecontainer"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Entries"
        component={Entries}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
     
    </Stack.Navigator>
  );
};

export default StackRoute;
