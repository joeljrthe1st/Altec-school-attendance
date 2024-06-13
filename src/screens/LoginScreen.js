import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
            <Text>{isPasswordVisible ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        <Button title="Login" onPress={() => {}} />
      </View>
    </View>
  );
};

export default LoginScreen;
