import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisterScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <View className="w-3/4">
        <Text className="text-2xl font-bold mb-4 text-center">Register</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
        />
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View className="flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4">
          <TextInput
            className="flex-1"
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} />
          </TouchableOpacity>
        </View>
        <Button title="Register" onPress={() => {}} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="mt-4 text-blue-500 text-center">
            Do you have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
