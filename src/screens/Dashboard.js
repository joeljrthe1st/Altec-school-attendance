import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { auth } from '../utils/firebaseConfig';
import { fetchUserData } from '../utils/firebaseConfig'; // Ensure the correct path to your Firebase configuration
import Greeting from '../utils/Greeting';
import AllEntries from './AllEntries';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const Dashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Greeting name={userData.firstname} />
      <Pressable style={styles.button} onPress={() => navigation.navigate("Add New Student")}>
        <Ionicons name="add-circle-outline" size={24} color="#010066" />
        <Text style={styles.buttonText}> Add New Student</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Records")}>
        <Ionicons name="list-outline" size={24} color="#010066" />
        <Text style={styles.buttonText}> Student Attendance</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Students")}>
        <Ionicons name="people-outline" size={24} color="#010066" />
        <Text style={styles.buttonText}> All Students</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Reports")}>
        <Ionicons name="document-text-outline" size={24} color="#010066" />
        <Text style={styles.buttonText}> Reports</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#010066",
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop:19,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#010066",
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f56565',
  },
});

export default Dashboard;
