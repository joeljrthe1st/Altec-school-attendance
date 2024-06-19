import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { auth } from '../utils/firebaseConfig'; // Ensure the correct path to your Firebase configuration
import { fetchUserData, updateUserData } from '../utils/firebaseConfig'; // Ensure the correct path to your Firebase configuration

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const data = await fetchUserData(userId);
          setUserData(data);
        } else {
          console.error("No authenticated user found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleUpdate = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const updatedData = {};

      if (newFirstName && newFirstName !== userData.firstname) {
        updatedData.firstname = newFirstName;
      }
      if (newLastName && newLastName !== userData.lastname) {
        updatedData.lastname = newLastName;
      }
      if (newPhone && newPhone !== userData.phoneNumber) {
        updatedData.phoneNumber = newPhone;
      }

      if (Object.keys(updatedData).length > 0) {
        try {
          await updateUserData(userId, updatedData);
          const updatedUserData = await fetchUserData(userId);
          setUserData(updatedUserData);
        } catch (error) {
          console.error("Error updating user data:", error);
        }
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white-100">
        <Text className="text-2xl font-bold text-blue-500">Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-white-100">
        <Text className="text-2xl font-bold text-red-500">No user data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white-100">
      <Text className="text-xl">First Name: {userData.firstname}</Text>
      <Text className="text-xl">Last Name: {userData.lastname}</Text>
      <Text className="text-xl">Phone Number: {userData.phoneNumber}</Text>
      <Text className="text-xl">Email: {userData.email}</Text>

      <TextInput
        placeholder="New First Name"
        value={newFirstName}
        onChangeText={setNewFirstName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="New Last Name"
        value={newLastName}
        onChangeText={setNewLastName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="New Phone Number"
        value={newPhone}
        onChangeText={setNewPhone}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Update account" onPress={handleUpdate} />
    </View>
  );
};

export default Account;
