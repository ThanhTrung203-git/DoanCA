import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,ImageBackground } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";



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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://10.0.2.2/MobileAPI/getUserData.php?email=${email}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

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
        <View style={styles.points}>
          <Icon name="diamond" size={20} color="#007bff" />
          <Text style={styles.pointText}>160</Text>
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
      <Button style={styles.buttonContent} mode="contained" onPress={() => navigation.navigate("TopicSelectionScreen")}>
        Play Now
      </Button>
    </Card.Content>
  </Card>
</ImageBackground>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["HTML", "JavaScript", "React", "C++", "Python"].map((category, index) => (
            <TouchableOpacity key={index} style={styles.category}>
              <Icon name="book" size={30} color="#007bff" />
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[
          { subject: "HTML", score: "26/30" },
          { subject: "JavaScript", score: "20/30" },
          { subject: "React", score: "25/30" },
          { subject: "C++", score: "27/30" },
          { subject: "Python", score: "22/30" },
        ].map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activitySubject}>{activity.subject}</Text>
            <Text style={styles.activityScore}>{activity.score}</Text>
          </View>
        ))}
      </View>
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
  banner: { marginBottom: 20, backgroundColor: "#007bff", borderRadius: 10 },
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
