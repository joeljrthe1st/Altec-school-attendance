import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import writeUserData from "../utils/firebaseConfig";

const RegisterScreen = ({ navigation }) => {
  const [value, setValue] = React.useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
    error: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    try {
      if (
        value.firstname === "" ||
        value.lastname === "" ||
        value.phoneNumber === "" ||
        value.email === "" ||
        value.password === ""
      ) {
        setValue({
          ...value,
          error: "All the fields are mandatory.",
        });
        alert(value.error);
        return;
      }
      const auth = await getAuth();
      console.log(auth.currentUser);
      await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      ).then((userCredential) => {
        writeUserData(
          userCredential.user.uid,
          value.firstname,
          value.lastname,
          value.phoneNumber,
          value.email,
          value.password
        );
      });
      setValue({
        firstname: "",
        lastname: "",
        phoneNumber: "",
        email: "",
        password: "",
        error: "",
      });
      navigation.navigate("Login");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="text-2xl font-bold mb-4 text-center">Register</Text>
          <TextInput
            className="w-full leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="First Name"
            value={value.firstname}
            onChangeText={(text) => setValue({ ...value, firstname: text })}
          />
          <TextInput
            className="w-80 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Last Name"
            value={value.lastname}
            onChangeText={(text) => setValue({ ...value, lastname: text })}
          />
          <TextInput
            className="w-80 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Phone Number"
            value={value.phoneNumber}
            keyboardType="numeric"
            onChangeText={(text) => setValue({ ...value, phoneNumber: text })}
          />
          <TextInput
            className="w-80 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Email"
            inputMode="email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <View className="w-80 flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4">
            <TextInput
              className="flex-1"
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#1e40af" />
          ) : (
            <Button title="Register" onPress={signIn} />
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="mt-4 text-blue-500 text-center">
              Do you have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
