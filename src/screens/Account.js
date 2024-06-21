import React, { useEffect, useState } from "react";
import { Text, View, Button, TextInput, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, fetchUserData, updateUserData } from "../utils/firebaseConfig"; // Ensure the correct path to your Firebase configuration
import CustomAlert from "../utils/CustomAlert"; // Ensure the correct path to your CustomAlert component

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const validationSchema = Yup.object().shape({
    newFirstName: Yup.string().required("First Name is required"),
    newLastName: Yup.string().required("Last Name is required"),
    newPhone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const updatedData = {};

        if (values.newFirstName && values.newFirstName !== userData.firstname) {
          updatedData.firstname = values.newFirstName;
        }
        if (values.newLastName && values.newLastName !== userData.lastname) {
          updatedData.lastname = values.newLastName;
        }
        if (values.newPhone && values.newPhone !== userData.phoneNumber) {
          updatedData.phoneNumber = values.newPhone;
        }

        if (Object.keys(updatedData).length > 0) {
          try {
            await updateUserData(userId, updatedData);
            const updatedUserData = await fetchUserData(userId);
            setUserData(updatedUserData);
            setAlertMessage("Account has been updated successfully");
            setAlerttype("success");
            setAlertVisible(true);
            reset();
          } catch (error) {
            console.error("Error updating user data:", error);
          }
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white-100"
    >
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

        <Controller
          control={control}
          name="newFirstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4 mt-1">
                <TextInput
                  placeholder="New First Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
              {errors.newFirstName && (
                <Text className="text-red-500 text-xs mb-2">
                  {errors.newFirstName.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="newLastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4">
                <TextInput
                  placeholder="New Last Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
              {errors.newLastName && (
                <Text className="text-red-500 text-xs mb-2">
                  {errors.newLastName.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="newPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4">
                <TextInput
                  placeholder="New Phone Number"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
              {errors.newPhone && (
                <Text className="text-red-500 text-xs mb-2">
                  {errors.newPhone.message}
                </Text>
              )}
            </>
          )}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#1e40af" />
        ) : (
          <Button
            title="Update account"
            onPress={handleSubmit(handleUpdate)}
            disabled={!isValid}
          />
        )}
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
