import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the library
import { addStudent } from "../utils/dbfunctions"; // Make sure the path is correct

const Entries = () => {
  // Using useState hook to manage state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [studentClass, setStudentClass] = useState("s1");
  const [stream, setStream] = useState("A");
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);

  // Handle the Add Student button press
  const handleAddStudent = async () => {
    if (!firstname || !lastname || !studentClass || !stream || !gender || !age) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Call the addStudent function to add the student data
      await addStudent(firstname, lastname, studentClass, stream, gender, age);

      // Reset state to default values
      setFirstname("");
      setLastname("");
      setAge("");
      setStudentClass("s1");
      setStream("A");
      setGender("Male");
      setLoading(false);

      Alert.alert("Success", "Student added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add student. Please try again.");
      console.error("Error adding student:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      
      {/* First Name Input */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      
      {/* Last Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />
      
      {/* Age Input */}
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric" // Ensure only numbers are entered
      />

      {/* Picker for Student Class */}
      <Picker
        selectedValue={studentClass}
        style={styles.picker}
        onValueChange={setStudentClass}
      >
        <Picker.Item label="S1" value="s1" />
        <Picker.Item label="S2" value="s2" />
        <Picker.Item label="S3" value="s3" />
        <Picker.Item label="S4" value="s4" />
        <Picker.Item label="S5" value="s5" />
        <Picker.Item label="S6" value="s6" />
      </Picker>

      {/* Picker for Stream */}
      <Picker
        selectedValue={stream}
        style={styles.picker}
        onValueChange={setStream}
      >
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="D" value="D" />
      </Picker>

      {/* Picker for Gender */}
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={setGender}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      {/* Add Student Button */}
      <Button title="Add Student" onPress={handleAddStudent} disabled={loading} />

      {/* Show loading indicator if adding student */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
});

export default Entries;
