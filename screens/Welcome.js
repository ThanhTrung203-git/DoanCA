import React, { useEffect, useState,useCallback } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,ImageBackground } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";



const Welcome = ({email ,navigation}) => {
  const [userData, setUserData] = useState(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true);   // State để kiểm soát loading

  if (!email) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: No email provided</Text>
      </View>
    );
  }

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
  
    // Fetch dữ liệu mỗi khi màn hình được focus lại
    useFocusEffect(
      useCallback(() => {
        fetchUserData();
      }, [email])
    );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Nếu có ảnh người dùng, hiển thị ảnh đó, nếu không thì hiển thị ảnh mặc định */}
        <Avatar.Image 
          size={60} 
          source={userData.img ? { uri: userData.imageUrl } : require('../assets/img/tuan.png')} 
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{userData.fullname}</Text>
          <Text style={styles.userId}>ID-{userData.id}</Text>
        </View>
        
      </View>

      {/* Banner */}
      <ImageBackground
  source={require('../assets/img/trophybackground.jpg')} // Đường dẫn tới ảnh
  style={styles.bannerBackground}
  imageStyle={{ borderRadius: 10 }} 
>
  <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 10 }}>
    <Card.Content>
      <Title style={styles.textContent}>Test Your Knowledge about English with Quizzes</Title>
      <Paragraph style={styles.textContent}>
        Improve your skills by solving quizzes in different English topics.
      </Paragraph>
      <Button style={{backgroundColor: "#00FFFF"}} mode="contained" onPress={() => navigation.navigate("TopicSelectionScreen")}>
        Play Now
      </Button>
    </Card.Content>
  </Card>
</ImageBackground>

<ImageBackground
  source={require('../assets/img/bgWMG.jpg')} // Đường dẫn tới ảnh
  style={styles.bannerBackground}
  imageStyle={{ borderRadius: 10, marginTop: 20}} 
>
  <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 10, marginTop: 20 }}>
    <Card.Content>
      <Title style={styles.textContent}>Test Your Knowledge about English with Word Matching Game</Title>
      <Paragraph style={styles.textContent}>
        Improve your skills by solving quizzes in different English topics.
      </Paragraph>
      <Button style={styles.buttonContent} mode="contained" onPress={() => navigation.navigate("WordMatchingTopic")}>
        Play Now
      </Button>
    </Card.Content>
  </Card>
</ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 10, paddingTop: 20, marginTop:50 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerInfo: { flex: 1, marginLeft: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  userId: { color: "#6c757d" },
  points: { flexDirection: "row", alignItems: "center" },
  pointText: { marginLeft: 5, fontWeight: "bold", color: "#007bff" },
  banner: { marginBottom: 20, marginTop: 20, backgroundColor: "#007bff", borderRadius: 10 },
  categories: { marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  category: { alignItems: "center", marginHorizontal: 10 },
  categoryText: { marginTop: 5, fontWeight: "bold" },
  recentActivity: {},
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  activitySubject: { fontSize: 16, fontWeight: "bold" },
  activityScore: { fontSize: 16, fontWeight: "bold", color: "#007bff" },
  textContent:{color: '#ABC2E3', marginBottom: 10},
});

export default Welcome;