import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeTabNavigator from "./Tab.Route";
import Account from "../screens/Account";
import Addnewstudent from "../screens/Addstudent";
import StudentAttendance from "../screens/StudentAttendance";
import LoginScreen from "../screens/LoginScreen";
import Records from "../screens/Records";
import StudentList from "../screens/AllEntries"
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: {
     backgroundColor:"white",
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
    fontWeight: "bold",
    color: "#010066",
   
  },
};

const StackRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Homecontainer"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Add New Student" component={Addnewstudent}
       options={{
        headerShown: true,
      }} />
      <Stack.Screen name="Student Attendance" component={StudentAttendance} />
      <Stack.Screen name="Records" component={Records} />
      <Stack.Screen name="Students" component={StudentList} />
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
