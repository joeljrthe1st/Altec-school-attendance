import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CustomAlert from "../utils/CustomAlert";

const LoginScreen = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const [username, setUsername] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert_type, setAlerttype] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      if (value.email === "" || value.password === "") {
        setValue({
          ...value,
          error: "Email and password are required.",
        });
       // alert(value.error);
        setAlertMessage(value.error);
        setAlerttype("error")
        setAlertVisible(true);
        return;
      }
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          const user = userCredential?.user;
          setUsername(user?.displayName);
          setValue({ ...value, password: "", email: "" });
          navigation.navigate("Homecontainer");
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode === "auth/email-already-in-use") {
            alert("Email Already In use!");
            
            return;
          }
          if (errorCode === "auth/invalid-email") {
          //  alert(" Invalid Email Address!");
            setAlertMessage(" Invalid Email Address!");
            setAlerttype("error")
            setAlertVisible(true);
            return;
          }
          if (errorCode === "auth/invalid-credential") {
            //alert(" Invalid Password or Email!");
            setAlertMessage(" Invalid Password or Email!");
            setAlertVisible(true);
            return;
          }
          alert(`Login failed. Please check your credentials. ${errorCode}`);
        });
    } catch (error) {
      alert(`Login failed. Please check your credentials.`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      className="flex-1 justify-center items-center bg-gray-100"
    >
      <View>
        <Text className="text-2xl font-bold mb-4 text-center">Login</Text>
        <TextInput
          className="w-80 border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Email"
          keyboardType="email-address"
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
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} />
          </Pressable>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#1e40af" />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}
        <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        alertType={alert_type}
        onClose={() => setAlertVisible(false)}
      />
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="mt-4 text-blue-500 text-center">
            Don't have an account? Register
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
