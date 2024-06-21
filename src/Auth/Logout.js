// Logout.js
import React from 'react';
import { Text, View, Pressable,Alert } from 'react-native';
import { auth } from '../utils/firebaseConfig';

const Logout = () => {
 
const check=()=>{
  Alert.alert(
    //title
    '',
    //body
    'Are you sure you want to Logout now ?',
    [
      { text: 'Yes', onPress: () => auth.signOut() },
      {
        text: 'No',
        // onPress: () => ,
        style: 'cancel',
      },
    ],
    { cancelable: false }
    //clicking out side of alert will not cancel
  );
}
  return (
    <View>
     
     <Pressable  onPress={()=>check()}><Text>Log Out</Text></Pressable >
    </View>
  );
};

export default Logout;
