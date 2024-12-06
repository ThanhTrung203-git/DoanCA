import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
// import { vocabularyData } from './data'; // Dữ liệu từ vựng

const VocabularyDetailsScreen = ({ route, navigation }) => {
  const { topic } = route.params; // Nhận chủ đề từ route.params
  const vocabulary = vocabularyData[topic]; // Lấy từ vựng của chủ đề
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Chỉ mục từ vựng hiện tại

  // Hiển thị từ vựng theo chỉ mục
  const renderVocabulary = () => {
    const word = vocabulary[currentWordIndex]; // Lấy từ vựng theo chỉ mục hiện tại

    return (
      <View style={styles.vocabularyContainer}>
        <Text style={styles.topicTitle}>Vocabulary for {topic}</Text>
        <Text style={styles.word}>{word.word}</Text>
        <Text style={styles.definition}>{word.definition}</Text>
      </View>
    );
  };

  // Hàm chuyển sang từ vựng tiếp theo
  const nextWord = () => {
    const totalWords = vocabulary.length;
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1); // Chuyển đến từ vựng tiếp theo
    } else {
      setCurrentWordIndex(0); // Nếu hết từ, quay lại từ đầu
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Nút back bên trong content */}
      <Button title="Back" onPress={() => navigation.goBack()} />

      {renderVocabulary()}

      <Button title="Next Word" onPress={nextWord} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  vocabularyContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  definition: {
    fontSize: 16,
    color: 'gray',
  },
});

export default VocabularyDetailsScreen;