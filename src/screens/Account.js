import React, { useEffect, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { auth } from "../utils/firebaseConfig"; // Ensure the correct path to your Firebase configuration
import { fetchUserData, updateUserData } from "../utils/firebaseConfig"; // Ensure the correct path to your Firebase configuration
import { ScrollView } from "react-native-gesture-handler";
import CustomAlert from "../utils/CustomAlert";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert_type, setAlerttype] = useState("");

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
          setAlertMessage("Successfully updated your account");
          setAlertVisible(true);
          setAlerttype("success")
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
        <Text className="text-2xl font-bold text-red-500">
          No user data available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white-100">
      <View className="flex-1 justify-center items-center bg-white-100">
        <Text className="w-80 p-4 m-2 bg-gray-200 text-justify">
          First Name: {userData.firstname}
        </Text>
        <Text className="w-80 p-4 m-2 bg-gray-200 text-justify">
          Last Name: {userData.lastname}
        </Text>
        <Text className="w-80 p-4 m-2 bg-gray-200 text-justify">
          Phone Number: {userData.phoneNumber}
        </Text>
        <Text className="w-80 p-4 m-2 bg-gray-200 text-justify">
          Email: {userData.email}
        </Text>

        <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4 mt-1">
          <TextInput
            placeholder="New First Name"
            value={newFirstName}
            onChangeText={setNewFirstName}
          />
        </View>
        <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4">
          <TextInput
            placeholder="New Last Name"
            value={newLastName}
            onChangeText={setNewLastName}
          />
        </View>
        <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4">
          <TextInput
            placeholder="New Phone Number"
            value={newPhone}
            onChangeText={setNewPhone}
          />
        </View>
        <Button title="Update account" onPress={handleUpdate} />
      </View>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        alertType={alert_type}
        onClose={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

export default Account;
