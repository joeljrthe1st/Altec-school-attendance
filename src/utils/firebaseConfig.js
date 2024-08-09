// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGWsgj7jXWvHm_Hsrnwo-8PYzsQ2AMaiw",
  authDomain: "altec-school-monitor.firebaseapp.com",
  databaseURL: "https://altec-school-monitor-default-rtdb.firebaseio.com",
  projectId: "altec-school-monitor",
  storageBucket: "altec-school-monitor.appspot.com",
  messagingSenderId: "517523341179",
  appId: "1:517523341179:web:2bfc397d0f71e15ef707de"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase Realtime Database
export const db = getDatabase(app);

// Initialize Firestore
const firestore = getFirestore(app);

// Write to Firebase Realtime Database
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

// Fetch the current user's data from Firebase Realtime Database
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

// Update the user's data in Firebase Realtime Database
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

// Write user's entries to Firebase Realtime Database
export function writeUserEntries(
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
  loanamount
) {
  set(ref(db, "usersEntries/" + userId), {
    entrantfirstname: entrantfirstname,
    entrantlastname: entrantlastname,
    entrantemail: entrantemail,
    entrantphonenumber: entrantphonenumber,
    clientsfirstname: clientsfirstname,
    clientslastname: clientslastname,
    clientsphoneNumber: clientsphoneNumber,
    clientsemail: clientsemail,
    clientsage: clientsage,
    loanamount: loanamount,
  });
}

// Fetch all entries from Firebase Realtime Database
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

// Fetch the current user's entries from Firebase Realtime Database
export async function fetchMyEntries(email) {
  const entriesRef = ref(db, "usersEntries");
  try {
    const snapshot = await get(entriesRef);
    if (snapshot.exists()) {
      const entries = snapshot.val();
      // Filter entries where entrantsemail matches the provided email
      const filteredEntries = Object.values(entries).filter(
        (entry) => entry.entrantemail === email
      );
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

// Add a student to Firestore collection 'students'
export async function addStudent(firstname, lastname, studentClass, stream, gender) {
  try {
    // Get a reference to the 'students' collection
    const studentsCollection = collection(firestore, "students");

    // Create a new document with the student's data
    const docRef = await addDoc(studentsCollection, {
      firstname: firstname,
      lastname: lastname,
      studentClass: studentClass,
      stream: stream,
      gender: gender,
    });

    console.log("Student added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding student: ", error);
    throw error;
  }
}
