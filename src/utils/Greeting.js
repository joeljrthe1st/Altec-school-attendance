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
    <View style={styles.container}>
      <Text style={styles.text}>{getGreeting()}, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0C2A02',
    // textAlign: 'center',
    maxWidth: '100%', // Ensure the text wraps within 80% of the container width
  },
});

export default Greeting;
