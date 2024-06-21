import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { auth } from '../utils/firebaseConfig';
import { fetchUserData } from '../utils/firebaseConfig'; // Ensure the correct path to your Firebase configuration
import Greeting from '../utils/Greeting';
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Text className="text-xl font-bold text-blue-500">Dashboard</Text>
      <Greeting name={userData.firstname}/>
     
    </View>
  );
};

export default Dashboard;
