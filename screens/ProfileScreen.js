import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileScreen = ({ navigation }) => {
  // Thông tin user mẫu
  const user = {
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
  };

  // Hàm xử lý khi nhấn nút Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị tên và email */}
      <View style={styles.userInfo}>
        <Icon name="user-circle" size={80} color="#007bff" />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Các tùy chọn trong Profile */}
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Icon name="user" size={20} color="#007bff" />
        <Text style={styles.optionText}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Icon name="info-circle" size={20} color="#007bff" />
        <Text style={styles.optionText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Icon name="cog" size={20} color="#007bff" />
        <Text style={styles.optionText}>Settings</Text>
      </TouchableOpacity>

      {/* Nút Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 40,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
