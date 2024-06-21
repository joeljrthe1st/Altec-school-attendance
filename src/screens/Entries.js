import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { auth, writeUserEntries, fetchUserData } from "../utils/firebaseConfig"; // Ensure the correct path to your Firebase configuration
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomAlert from "../utils/CustomAlert";

const Entries = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert_type, setAlerttype] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(false);
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
    clientsfirstname: Yup.string().required("Client's first name is required"),
    clientslastname: Yup.string().required("Client's last name is required"),
    clientsphoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Client's phone number is required"),
    clientsemail: Yup.string()
      .email("Invalid email")
      .required("Client's email is required"),
    clientsage: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Client's age is required"),
    loanamount: Yup.number()
      .positive("Loan amount must be positive")
      .required("Loan amount is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange", // Trigger validation on change to enable/disable button
  });

  const onSubmit = async (values) => {
    const currentUser = auth.currentUser;
    const entrantfirstname = userData.firstname;
    const entrantlastname = userData.lastname;
    const entrantemail = userData.email;
    const entrantphonenumber = userData.phoneNumber;
    if (currentUser) {
      const userId =
        userData.firstname + "-" + userData.lastname + "-" + Date.now();
      try {
        setLoading(true);
        await writeUserEntries(
          userId,
          entrantfirstname,
          entrantlastname,
          entrantemail,
          entrantphonenumber,
          values.clientsfirstname,
          values.clientslastname,
          values.clientsphoneNumber,
          values.clientsemail,
          values.clientsage,
          values.loanamount
        );
        console.log("User entries written successfully");
        setAlertMessage("A new User has been added successfuly");
        setAlerttype("success");
        setAlertVisible(true);
        reset();
      } catch (error) {
        console.error("Error writing user entries:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No authenticated user found.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1e40af" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-blue-500 mb-4">
        User Entries
      </Text>

      <Controller
        control={control}
        name="clientsfirstname"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Client's First Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              className="h-10 border border-gray-300 mb-2 p-2 w-80"
            />
            {errors.clientsfirstname && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.clientsfirstname.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="clientslastname"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Client's Last Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              className="h-10 border border-gray-300 mb-2 p-2 w-80"
            />
            {errors.clientslastname && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.clientslastname.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="clientsphoneNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Client's Phone Number"
              onChangeText={onChange}
              keyboardType="number"
              textContentType="telephoneNumber"
              onBlur={onBlur}
              value={value}
              className="h-10 border border-gray-300 mb-2 p-2 w-80"
            />
            {errors.clientsphoneNumber && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.clientsphoneNumber.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="clientsemail"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Client's Email"
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              textContentType="emailAddress"
              value={value}
              className="h-10 border border-gray-300 mb-2 p-2 w-80"
            />
            {errors.clientsemail && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.clientsemail.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="clientsage"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Client's Age"
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="number-pad"
              value={value}
              className="h-10 border border-gray-300 mb-2 p-2 w-80"
            />
            {errors.clientsage && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.clientsage.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="loanamount"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Loan Amount"
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
              value={value}
              className="h-10 border border-gray-300 mb-4 p-2 w-80"
            />
            {errors.loanamount && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.loanamount.message}
              </Text>
            )}
          </>
        )}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1e40af" />
      ) : (
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-blue-500 p-2 rounded w-80"
          disabled={!isValid}
        >
          <Text className="text-white text-center">Submit</Text>
        </Pressable>
      )}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        alertType={alert_type}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default Entries;
