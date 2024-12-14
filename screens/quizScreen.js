import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const QuizScreen = ({ navigation, route }) => {
  const { topicId } = route.params;
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [countdownTime, setCountdownTime] = useState(900); // 15 phút
  const [allowAnswer, setAllowAnswer] = useState(true);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2/MobileAPI/getQuestion.php?chude_id=${topicId}`)
      .then((response) => {
        setQuizData(response.data);
      })
      .catch((error) => {
        console.log('Lỗi khi gọi API:', error);
      });

    // Đếm ngược thời gian
    const interval = setInterval(() => {
      setCountdownTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setQuizFinished(true);
          calculateScore();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [topicId]);

  const calculateScore = () => {
    let calculatedScore = 0;
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  const handleAnswer = (answer) => {
    if (!allowAnswer) return;

    const correctAnswer = quizData[currentQuestionIndex].correct_answer;

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });

    // Đợi 3 giây và chuyển câu hỏi
    setAllowAnswer(false);
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAllowAnswer(true);
      } else {
        setQuizFinished(true);
        calculateScore();
      }
    }, 3000);
  };

  if (quizData.length === 0 || quizFinished) {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>Your Score</Text>
          <Text style={styles.finalScore}>{score}/{quizData.length}</Text>
        </View>
        <Text style={styles.congratsText}>Congratulation</Text>
        <Text style={styles.messageText}>Great job! You Did It</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Share clicked')}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const userAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.timerNotify}>Thời gian còn lại</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {Math.floor(countdownTime / 60)}:{String(countdownTime % 60).padStart(2, '0')}
        </Text>
      </View>
      <Text style={styles.questionText}>
        Question {currentQuestionIndex + 1} of {quizData.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {['A', 'B', 'C', 'D'].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            userAnswer === option && { backgroundColor: userAnswer === currentQuestion.correct_answer ? 'green' : 'red' },
          ]}
          onPress={() => handleAnswer(option)}
          disabled={!allowAnswer}
        >
          <Text style={styles.optionText}>{currentQuestion[`option_${option.toLowerCase()}`]}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  timerContainer: {
    backgroundColor: '#0F469A',
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerNotify: {
    marginBottom: 15,
    fontSize: 18,
    color: '#E05254',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#0F469A',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
  },
  scoreCircle: {
    backgroundColor: '#0F469A',
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalScore: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  congratsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0F469A',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QuizScreen;
