// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

//Initialize database
export const db = getDatabase(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


// Write to firebase realtime database.
export default function writeUserData(
  userId,
  firstname,
  lastname,
  phoneNumber,
  email,
  password
) {
  set(ref(db, "users/" + userId), {
    firstname: firstname,
    lastname: lastname,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
  });
}


// Fetch the current user's data from firebase realtime database
export async function fetchUserData(userId) {
  const userRef = ref(db, "users/" + userId);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available for the user with userId:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

/// Update the user's data in firebase realtime database
export async function updateUserData(userId, updatedData) {
  const userRef = ref(db, "users/" + userId);
  try {
    await update(userRef, updatedData);
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

// Write user's entries to firebase realtime database
export  function writeUserEntries(
 
  userId,
  entrantfirstname,
  entrantlastname,
  entrantemail,
  entrantphonenumber,
  clientsfirstname,
  clientslastname,
  clientsphoneNumber,
  clientsemail,
  clientsage,
  loanamount,
  
) {
  set(ref(db, "usersEntries/" + userId), {
    
    entrantfirstname:entrantfirstname,
    entrantlastname:entrantlastname,
    entrantemail:entrantemail,
    entrantphonenumber:entrantphonenumber,
    clientsfirstname: clientsfirstname,
    clientslastname: clientslastname,
    clientsphoneNumber: clientsphoneNumber,
    clientsemail: clientsemail,
    clientsage:clientsage,
    loanamount:loanamount,
    });
}

// Fetch All entries from firebase realtime database

export async function fetchUserEntries() {
  const entriesRef = ref(db, "usersEntries");
  try {
    const snapshot = await get(entriesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No entries available.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
}

// Fetch the current user's entries from firebase realtime database
export async function fetchMyEntries(email) {
  const entriesRef = ref(db, "usersEntries");
  try {
    const snapshot = await get(entriesRef);
    if (snapshot.exists()) {
      const entries = snapshot.val();
      // Filter entries where entrantsemail matches the provided email
      const filteredEntries = Object.values(entries).filter(entry => entry.entrantemail === email);
      return filteredEntries;
    } else {
      console.log("No entries available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
}
