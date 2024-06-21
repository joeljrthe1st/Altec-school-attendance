// Logout.js
import React from 'react';
import { Text, View, Button } from 'react-native';
import { auth } from '../utils/firebaseConfig';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Navigate to login or home screen after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View>
     
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Logout;
