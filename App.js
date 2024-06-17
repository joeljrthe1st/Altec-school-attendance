import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackRoute from "./src/routes/StackRoute";

function App() {
  return (
    <NavigationContainer>
      <StackRoute />
    </NavigationContainer>
  );
}

export default App;
