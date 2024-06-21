import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, writeUserEntries,fetchUserData } from '../utils/firebaseConfig'; // Ensure the correct path to your Firebase configuration

const Entries = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientsfirstname, setClientsFirstName] = useState('');
  const [clientslastname, setClientsLastName] = useState('');
  const [clientsphoneNumber, setClientsPhoneNumber] = useState('');
  const [clientsemail, setClientsEmail] = useState('');
  const [clientsage, setClientsAge] = useState('');
  const [loanamount, setLoanAmount] = useState('');


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

  const handleSubmit = async () => {
    const currentUser = auth.currentUser;
   const entrantfirstname=userData.firstname; 
   const entrantlastname=userData.lastname; 
   const entrantemail=userData.email; 
   const entrantphonenumber=userData.phoneNumber; 
    if (currentUser) {
        const userId = currentUser.uid;
      try {
        await writeUserEntries
        ( userId,
          entrantfirstname,
          entrantlastname,
          entrantemail,
          entrantphonenumber,
           clientsfirstname,
           clientslastname,
           clientsphoneNumber,
           clientsemail,
           clientsage,
           loanamount);
        console.log("User entries written successfully");
      } catch (error) {
        console.error("Error writing user entries:", error);
      }
    } else {
      console.error("No authenticated user found.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white-100">
      <Text className="text-2xl font-bold text-blue-500">User Entries</Text>

      <TextInput
        placeholder="Client's First Name"
        value={clientsfirstname}
        onChangeText={setClientsFirstName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Client's Last Name"
        value={clientslastname}
        onChangeText={setClientsLastName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Client's Phone Number"
        value={clientsphoneNumber}
        onChangeText={setClientsPhoneNumber}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Client's Email"
        value={clientsemail}
        onChangeText={setClientsEmail}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Client's Age"
        value={clientsage}
        onChangeText={setClientsAge}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Loan Amount"
        value={loanamount}
        onChangeText={setLoanAmount}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Entries;
