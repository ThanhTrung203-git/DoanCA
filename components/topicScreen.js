import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopicSelectionScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([]); // Lưu trữ danh sách chủ đề
  const [selectedTopic, setSelectedTopic] = useState(null); // Lưu trữ chủ đề đã chọn

  // Gọi API để lấy dữ liệu chủ đề
  useEffect(() => {
    axios.get('http://10.0.2.2/QuizAPI/getTopic.php')
      .then(response => {
        setTopics(response.data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log("Lỗi khi gọi API:", error);
      });
  }, []);

  // Màu sắc tương ứng cho từng chủ đề
  const topicColors = [
    '#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', 
    '#9b59b6', '#34495e', '#f39c12', '#16a085', '#d35400',
  ];

  // Hiển thị mỗi item trong danh sách chủ đề
  const renderTopicItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.topicButton, { backgroundColor: topicColors[index % topicColors.length] }]}
      onPress={() => {
        setSelectedTopic(item.id);
        navigation.navigate('QuizScreen', { topicId: item.id }); // Chuyển topicId đến QuizScreen
      }}
    >
      <Icon name="star" size={30} color="#fff" style={styles.icon} />
      <Text style={styles.topicText}>{item.ten_chude}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn chủ đề</Text>
      <FlatList
        key={topics.length} // Cập nhật key khi dữ liệu thay đổi, giúp FlatList tái render
        data={topics}
        renderItem={renderTopicItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Hiển thị 2 cột
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  topicButton: {
    width: '40%',
    margin: '5%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  topicText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TopicSelectionScreen;
