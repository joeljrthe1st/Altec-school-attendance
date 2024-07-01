// components/Greeting.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Greeting = ({ name }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <View >
      <Text className="text-base  text-black-500 ml-3 ">{getGreeting()}, {name}!</Text>
    </View>
  );
};


export default Greeting;
