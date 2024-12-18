import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const WordMatchingGame = ({ route, navigation }) => {
  const { topicId } = route.params; // Nhận topicId từ tham số truyền qua
  const [words, setWords] = useState([]); // Dữ liệu từ vựng
  const [shuffledWords, setShuffledWords] = useState([]); // Từ trộn
  const [shuffledMeanings, setShuffledMeanings] = useState([]); // Nghĩa trộn
  const [selectedWord, setSelectedWord] = useState(null); // Từ đã chọn
  const [selectedMeaning, setSelectedMeaning] = useState(null); // Nghĩa đã chọn
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

  // Gọi API để lấy danh sách từ vựng theo chủ đề
  useEffect(() => {
    axios.get(`http://10.0.2.2/getFlashcards.php?chude_id=${topicId}`)
      .then(response => {
        setWords(response.data);
        updatePageData(response.data, 0); // Hiển thị trang đầu tiên
      })
      .catch(error => console.error("Lỗi khi gọi API:", error));
  }, [topicId]);

  // Cập nhật dữ liệu cho trang hiện tại
  const updatePageData = (data, page) => {
    const start = page * 5; // Vị trí bắt đầu
    const end = start + 5;  // Vị trí kết thúc
    const currentWords = data.slice(start, end);
    setShuffledWords(shuffleArray(currentWords.map(item => ({ id: item.id, word: item.word }))));
    setShuffledMeanings(shuffleArray(currentWords.map(item => ({ id: item.id, meaning: item.meaning }))));
  };

  // Hàm trộn mảng
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Xử lý chọn từ và nghĩa
  const handleWordSelect = (word) => {
    setSelectedWord(word);
    checkMatch(word, selectedMeaning);
  };

  const handleMeaningSelect = (meaning) => {
    setSelectedMeaning(meaning);
    checkMatch(selectedWord, meaning);
  };

  // Kiểm tra cặp khớp
  const checkMatch = (word, meaning) => {
    if (word && meaning) {
      if (word.id === meaning.id) {
        Alert.alert("🎉 Chính xác!", `Cặp "${word.word}" - "${meaning.meaning}" đúng.`);
        // Xóa cặp đã khớp
        setShuffledWords(prev => prev.filter(item => item.id !== word.id));
        setShuffledMeanings(prev => prev.filter(item => item.id !== meaning.id));
      } else {
        Alert.alert("❌ Sai rồi!", "Hãy thử lại.");
      }
      setSelectedWord(null);
      setSelectedMeaning(null);
    }
  };

  // Chuyển sang trang tiếp theo
  const nextPage = () => {
    if ((currentPage + 1) * 5 < words.length) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updatePageData(words, nextPage);
    } else {
      Alert.alert("🎉 Hoàn thành!", "Bạn đã hoàn thành tất cả các cặp từ!");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trò chơi ghép từ</Text>
      <View style={styles.gameContainer}>
        {/* Cột Word */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Từ</Text>
          {shuffledWords.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                selectedWord?.id === item.id && styles.selectedCard
              ]}
              onPress={() => handleWordSelect(item)}
            >
              <Text style={styles.cardText}>{item.word}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cột Meaning */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Nghĩa</Text>
          {shuffledMeanings.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                selectedMeaning?.id === item.id && styles.selectedCard
              ]}
              onPress={() => handleMeaningSelect(item)}
            >
              <Text style={styles.cardText}>{item.meaning}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nút chuyển sang trang tiếp theo */}
      <TouchableOpacity style={styles.button} onPress={nextPage}>
        <Text style={styles.buttonText}>Trang tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  column: {
    width: '45%',
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#3498db',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedCard: {
    backgroundColor: '#2ecc71',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WordMatchingGame;
