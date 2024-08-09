import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the library
import { fetchStudents } from "../utils/dbfunctions";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("all"); // Default selected class is 'all'
  const [selectedStream, setSelectedStream] = useState("all"); // Default selected stream is 'all'
  const [expandedStudentId, setExpandedStudentId] = useState(null); // Track expanded student

  // Function to load students based on selected class and stream
  const loadStudents = async (studentClass, stream) => {
    try {
      setLoading(true); // Show loading indicator
      const studentData = await fetchStudents(studentClass, stream);
      setStudents(studentData);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  useEffect(() => {
    loadStudents(selectedClass, selectedStream);
  }, [selectedClass, selectedStream]); // Re-run when selectedClass or selectedStream changes

  // Toggle the expanded state of a student item
  const handlePress = (id) => {
    setExpandedStudentId(expandedStudentId === id ? null : id);
  };

  // Render each student item
  const renderStudent = ({ item }) => (
    <View style={styles.studentItem}>
      <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.studentRow}>
        <Ionicons name="person" size={20} color="white" />
        <Text style={styles.studentText}> {item.firstname} {item.lastname}</Text>
      </TouchableOpacity>
      {expandedStudentId === item.id && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="school" size={20} color="white" />
            <Text style={styles.detailText}> Class: {item.studentClass}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="layers" size={20} color="white" />
            <Text style={styles.detailText}> Stream: {item.stream}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="male-female" size={20} color="white" />
            <Text style={styles.detailText}> Gender: {item.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={20} color="white" />
            <Text style={styles.detailText}> Age: {item.age}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
        >
          <Picker.Item label="All Classes" value="all" />
          <Picker.Item label="S1" value="s1" />
          <Picker.Item label="S2" value="s2" />
          <Picker.Item label="S3" value="s3" />
          <Picker.Item label="S4" value="s4" />
          <Picker.Item label="S5" value="s5" />
          <Picker.Item label="S6" value="s6" />
        </Picker>
        <Picker
          selectedValue={selectedStream}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedStream(itemValue)}
        >
          <Picker.Item label="All Streams" value="all" />
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="C" value="C" />
          <Picker.Item label="D" value="D" />
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#010066" />
      ) : (
        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={(item) => item.id} // Use Firestore document ID as key
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#010066",
    marginBottom: 20,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
    borderRadius:5
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderColor: "#d1d5db",
    borderWidth: 1,
    marginBottom: 15,
  },
  studentItem: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
     backgroundColor:"#010066"
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
   
  },
  studentText: {
    fontSize: 16,
    color: "white",
    marginLeft: 8,
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: "white",
    marginLeft: 8,
  },
});

export default StudentList;
