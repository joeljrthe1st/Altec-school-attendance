
// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   Button,
//   TextInput,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { auth } from "../utils/firebaseConfig";
// import { fetchUserData, updateUserData } from "../utils/firebaseConfig";
// import CustomAlert from "../utils/CustomAlert";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const Account = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [newFirstName, setNewFirstName] = useState("");
//   const [newLastName, setNewLastName] = useState("");
//   const [newPhone, setNewPhone] = useState("");
//   const [editingField, setEditingField] = useState(null); // State to track which field is being edited
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alert_type, setAlerttype] = useState("");

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           const userId = currentUser.uid;
//           const data = await fetchUserData(userId);
//           setUserData(data);
//         } else {
//           console.error("No authenticated user found.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserData();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userId = currentUser.uid;
//         const updatedData = {};

//         if (newFirstName && newFirstName !== userData.firstname) {
//           updatedData.firstname = newFirstName;
//         }
//         if (newLastName && newLastName !== userData.lastname) {
//           updatedData.lastname = newLastName;
//         }
//         if (newPhone && newPhone !== userData.phoneNumber) {
//           updatedData.phoneNumber = newPhone;
//         }

//         if (Object.keys(updatedData).length > 0) {
//           try {
//             await updateUserData(userId, updatedData);
//             const updatedUserData = await fetchUserData(userId);
//             setUserData(updatedUserData);
//             setAlertMessage("Account has been updated successfully");
//             setAlerttype("success");
//             setAlertVisible(true);
//             setEditingField(null); // Hide the input fields
//           } catch (error) {
//             console.error("Error updating user data:", error);
//           }
//         }
//       }
//     } catch (error) {
//       alert(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditPress = (field) => {
//     setEditingField(field);
//     switch (field) {
//       case "firstname":
//         setNewFirstName(userData.firstname);
//         break;
//       case "lastname":
//         setNewLastName(userData.lastname);
//         break;
//       case "phoneNumber":
//         setNewPhone(userData.phoneNumber);
//         break;
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.centeredView}>
//         <ActivityIndicator size="large" color="#010066" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.centeredView}>
//         <Text style={styles.errorText}>No user data available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         {/* User Icon */}
//         <View style={styles.userIconContainer}>
//           <Icon name="account-circle" size={80} color="#010066" />
//           <Text style={styles.userName}>{userData.firstname} {userData.lastname}</Text>
//         </View>

//         {/* First Name */}
//         <View style={styles.infoBox}>
//           <Icon name="person" size={24} color="#010066" />
//           <Text style={styles.infoText}> {userData.firstname}</Text>
//           <TouchableOpacity
//             onPress={() => handleEditPress("firstname")}
//             style={styles.iconButton}
//           >
//             <Icon name="edit" size={24} color="#010066" />
//           </TouchableOpacity>
//         </View>
//         {editingField === "firstname" && (
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="New First Name"
//               value={newFirstName}
//               onChangeText={setNewFirstName}
//               style={styles.textInput}
//             />
//           </View>
//         )}

//         {/* Last Name */}
//         <View style={styles.infoBox}>
//           <Icon name="person" size={24} color="#010066" />
//           <Text style={styles.infoText}> {userData.lastname}</Text>
//           <TouchableOpacity
//             onPress={() => handleEditPress("lastname")}
//             style={styles.iconButton}
//           >
//             <Icon name="edit" size={24} color="#010066" />
//           </TouchableOpacity>
//         </View>
//         {editingField === "lastname" && (
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="New Last Name"
//               value={newLastName}
//               onChangeText={setNewLastName}
//               style={styles.textInput}
//             />
//           </View>
//         )}

//         {/* Phone Number */}
//         <View style={styles.infoBox}>
//           <Icon name="phone" size={24} color="#010066" />
//           <Text style={styles.infoText}> {userData.phoneNumber}</Text>
//           <TouchableOpacity
//             onPress={() => handleEditPress("phoneNumber")}
//             style={styles.iconButton}
//           >
//             <Icon name="edit" size={24} color="#010066" />
//           </TouchableOpacity>
//         </View>
//         {editingField === "phoneNumber" && (
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="New Phone Number"
//               value={newPhone}
//               onChangeText={setNewPhone}
//               style={styles.textInput}
//             />
//           </View>
//         )}

//         {/* Update Button */}
//         <View style={styles.submitButton}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#010066" />
//           ) : (
//             <Button title="Update account" onPress={handleUpdate} color="#010066" />
//           )}
//         </View>
//       </View>
//       <CustomAlert
//         visible={alertVisible}
//         message={alertMessage}
//         alertType={alert_type}
//         onClose={() => setAlertVisible(false)}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#010066",
//     marginTop: 10,
//   },
//   errorText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#dc2626",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   userIconContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#010066",
//     marginTop: 8,
//   },
//   infoBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     padding: 16,
//     marginVertical: 8,
//     backgroundColor: "#ffffff",
//     borderRadius: 8,
//     borderColor: "#e0e0e0",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   infoText: {
//     fontSize: 16,
//     color: "#333",
//     flex: 1,
//     marginLeft: 8,
//   },
//   iconButton: {
//     padding: 8,
//   },
//   inputContainer: {
//     width: "100%",
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//     borderRadius: 8,
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   textInput: {
//     height: 40,
//     fontSize: 16,
//     color: "#333",
//   },
//   submitButton: {
//     marginVertical: 16,
//     borderRadius:10
//   },
// });

// export default Account;
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { auth } from "../utils/firebaseConfig";
import { fetchUserData, updateUserData } from "../utils/firebaseConfig";
import CustomAlert from "../utils/CustomAlert";
import Icon from "react-native-vector-icons/MaterialIcons";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [editingField, setEditingField] = useState(null); // State to track which field is being edited
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert_type, setAlerttype] = useState("");

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

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const updatedData = {};

        if (newFirstName && newFirstName !== userData.firstname) {
          updatedData.firstname = newFirstName;
        }
        if (newLastName && newLastName !== userData.lastname) {
          updatedData.lastname = newLastName;
        }
        if (newPhone && newPhone !== userData.phoneNumber) {
          updatedData.phoneNumber = newPhone;
        }

        if (Object.keys(updatedData).length > 0) {
          try {
            await updateUserData(userId, updatedData);
            const updatedUserData = await fetchUserData(userId);
            setUserData(updatedUserData);
            setAlertMessage("Account has been updated successfully");
            setAlerttype("success");
            setAlertVisible(true);
            setEditingField(null); // Hide the input fields
          } catch (error) {
            console.error("Error updating user data:", error);
          }
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPress = (field) => {
    setEditingField(field);
    switch (field) {
      case "firstname":
        setNewFirstName(userData.firstname);
        break;
      case "lastname":
        setNewLastName(userData.lastname);
        break;
      case "phoneNumber":
        setNewPhone(userData.phoneNumber);
        break;
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#010066" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* User Icon */}
        <View style={styles.userIconContainer}>
          <Icon name="account-circle" size={80} color="#010066" />
          <Text style={styles.userName}>{userData.firstname} {userData.lastname}</Text>
        </View>

        {/* First Name */}
        <View style={styles.infoBox}>
          <Icon name="person" size={24} color="#010066" />
          <Text style={styles.infoText}> {userData.firstname}</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("firstname")}
            style={styles.iconButton}
          >
            <Icon name="edit" size={24} color="#010066" />
          </TouchableOpacity>
        </View>
        {editingField === "firstname" && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="New First Name"
              value={newFirstName}
              onChangeText={setNewFirstName}
              style={styles.textInput}
            />
          </View>
        )}

        {/* Last Name */}
        <View style={styles.infoBox}>
          <Icon name="person" size={24} color="#010066" />
          <Text style={styles.infoText}> {userData.lastname}</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("lastname")}
            style={styles.iconButton}
          >
            <Icon name="edit" size={24} color="#010066" />
          </TouchableOpacity>
        </View>
        {editingField === "lastname" && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="New Last Name"
              value={newLastName}
              onChangeText={setNewLastName}
              style={styles.textInput}
            />
          </View>
        )}

        {/* Phone Number */}
        <View style={styles.infoBox}>
          <Icon name="phone" size={24} color="#010066" />
          <Text style={styles.infoText}> {userData.phoneNumber}</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("phoneNumber")}
            style={styles.iconButton}
          >
            <Icon name="edit" size={24} color="#010066" />
          </TouchableOpacity>
        </View>
        {editingField === "phoneNumber" && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="New Phone Number"
              value={newPhone}
              onChangeText={setNewPhone}
              style={styles.textInput}
            />
          </View>
        )}

        {/* Update Button */}
        <Pressable style={styles.submitButton} onPress={handleUpdate}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Update account</Text>
          )}
        </Pressable>
      </View>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        alertType={alert_type}
        onClose={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#010066",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  userIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#010066",
    marginTop: 8,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginLeft: 8,
  },
  iconButton: {
    padding: 8,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#010066",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginVertical: 16,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default Account;
