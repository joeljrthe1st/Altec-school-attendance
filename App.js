import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StackRoute from './src/routes/StackRoute';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <StackRoute/>
    </NavigationContainer>
  );
}

export default App;