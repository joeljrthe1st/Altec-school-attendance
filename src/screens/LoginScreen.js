import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Perform login logic here
    const isLoginSuccessful = false;
    if (isLoginSuccessful) {
      navigation.navigate("Homecontainer");
    } else {
      // Handle login failure
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <View className="w-3/4">
        <Text className="text-2xl font-bold mb-4 text-center">Login</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Username"
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
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="mt-4 text-blue-500 text-center">
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
