import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import FlatCard from '../components/Flatcard';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library

const VocabularyDetailScreen = ({ route }) => {
  const { topicId } = route.params; // Nhận topicId từ navigation
  const [flashcards, setFlashcards] = useState([]);  // Lưu danh sách flashcards
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ mục thẻ hiện tại

  // Gọi API để lấy dữ liệu flashcards cho chủ đề
  useEffect(() => {
    axios.get(`http://10.0.2.2/getFlashcards.php?chude_id=${topicId}`)
      .then(response => {
        setFlashcards(response.data || []); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log("Lỗi khi gọi API:", error);
        setFlashcards([]);
      });
  }, [topicId]);

  // Hàm để chuyển sang thẻ tiếp theo
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Hàm để chuyển về thẻ trước đó
  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Lấy thẻ hiện tại
  const currentCard = flashcards[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcards</Text>
      
      {flashcards.length > 0 && currentCard ? (
        <FlatCard word={currentCard.word} definition={currentCard.meaning} />
      ) : (
        <Text>Đang tải dữ liệu...</Text>
      )}

      {/* Hiển thị số thứ tự của thẻ hiện tại */}
      <Text style={styles.cardPosition}>
        {currentIndex + 1} / {flashcards.length}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={previousCard} 
          style={styles.button} 
          disabled={currentIndex === 0}
        >
          <Icon name="angle-left" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={nextCard} 
          style={styles.button} 
          disabled={currentIndex === flashcards.length - 1}
        >
          <Icon name="angle-right" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  cardPosition: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Để các nút Next và Previous nằm ngang
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0F469A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,  // Làm nút tròn
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default VocabularyDetailScreen;
