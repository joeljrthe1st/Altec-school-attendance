import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchMyEntries,fetchUserData } from '../utils/firebaseConfig'; // Adjust the import to match your function name
import { auth } from '../utils/firebaseConfig';


export default function MyEntries({ userEmail }) {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntries() {
      const userEmail="Demoaccount@gmail.com"
      try {
        const data = await fetchMyEntries(userEmail); // Pass userEmail to fetch filtered entries
        setEntries(data);
      } catch (error) {
        console.error("Error loading entries:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, [userEmail]); // Trigger useEffect on userEmail change

  const [userData, setUserData] = useState(null);
  
  

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
  

  

  const renderEntry = ({ item }) => (
    <View style={styles.entry}>
      <Text>Client First Name: {item.clientsfirstname}</Text>
      <Text>Client Last Name: {item.clientslastname}</Text>
      <Text>Client Phone Number: {item.clientsphoneNumber}</Text>
      <Text>Loan Amount: {item.loanamount}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading entries...</Text>
      </View>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <View style={styles.noEntries}>
        <Text>No entries available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.econtainer}>
      <Text style={styles.header}>My Entries</Text>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  econtainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  entry: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEntries: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
