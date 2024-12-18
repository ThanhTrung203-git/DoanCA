import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ email, navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2/getUserData.php?email=${email}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [email])
  );

  useEffect(() => {
    if (route?.params?.updatedUserData) {
      setUserData(route.params.updatedUserData);
    }
  }, [route?.params?.updatedUserData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Hàm xử lý khi nhấn nút Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.replace("Login") },
    ]);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Icon name="user-circle" size={80} color="#007bff"  />
        <Text style={styles.name}>{userData.fullname || "No name"}</Text>
        <Text style={styles.email}>{userData.email || "No email"}</Text>
      </View>

      <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate("EditProfileScreen", { userData })}}>
        <Icon name="user" size={20} color="#007bff" />
        <Text style={styles.optionText}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate("ChangePasswordScreen", { userData })}}>
        <Icon name="info-circle" size={20} color="#007bff" />
        <Text style={styles.optionText}>Change password</Text>
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