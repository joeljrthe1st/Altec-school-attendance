import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchUserEntries } from '../utils/firebaseConfig';

export default function AllEntries() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await fetchUserEntries();
        setEntries(data);
      } catch (error) {
        console.error("Error loading entries:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
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

  if (!entries) {
    return (
      <View style={styles.noEntries}>
        <Text>No entries available.</Text>
      </View>
    );
  }

  const entriesArray = Object.values(entries);

  return (
    <View style={styles.econtainer}>
      <Text style={styles.header}>My Entries</Text>
      <FlatList
        data={entriesArray}
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
