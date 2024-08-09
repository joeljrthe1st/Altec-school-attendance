import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomAlert = ({ visible, message, onClose, alertType }) => {
  let icon;
  let iconColor;

  // Determine icon and color based on alertType
  switch (alertType) {
    case "success":
      icon = "checkmark-circle-outline"; // Icon name for success
      iconColor = "#4CAF50"; // Green color
      break;
    case "error":
      icon = "close-circle-outline"; // Icon name for error
      iconColor = "#F44336"; // Red color
      break;
    default:
      icon = "information-circle-outline"; // Default to info icon
      iconColor = "#2196F3"; // Blue color
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* Icon */}
          <Ionicons
            name={icon}
            size={50}
            color={iconColor}
            style={styles.icon}
          />
          {/* Message */}
          <Text style={styles.alertMessage}>{message}</Text>
          {/* OK Button */}
          <Pressable style={styles.okButton} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
  },
  icon: {
    marginBottom: 20,
  },
  alertMessage: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  okButton: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    backgroundColor: "#010066",
    borderRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CustomAlert;
