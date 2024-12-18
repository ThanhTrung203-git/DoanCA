import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

const EditProfileScreen = ({ navigation, route }) => {
  const { userData } = route.params;

  const [name, setName] = useState(userData.fullname || "");
  const [dob, setDob] = useState(userData.dob || "");
  const [image, setImage] = useState(userData.image || null);


  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("fullname", name);
      formData.append("email", userData.email);
      formData.append("dob", dob);
  
      if (image) {
        const fileName = image.split("/").pop();
        const fileType = fileName.split(".").pop();
  
        formData.append("image", {
          uri: image,
          name: fileName,
          type: `image/${fileType}`,
        });
      }
  
      const response = await fetch("http://10.0.2.2/updateUserData.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        // Truyền lại dữ liệu đã thay đổi
        navigation.goBack({
          updatedUserData: {
            fullname: name,
            email: userData.email,
            image: image || userData.image, // Giữ lại ảnh nếu không có ảnh mới
          },
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error uploading user data:", error);
      alert("Error uploading user data.");
    }
  };
  
  

  
   
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={image ? { uri: image } : require("../assets/img/tuan.png")}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    color: "#007bff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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

export default EditProfileScreen;