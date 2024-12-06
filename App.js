import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welocome from './screens/Welcome';
import RootStack from './navigation/RootStack';
import QuizScreen from './components/quizScreen';
import TopicList from './components/topicScreen';
import { NavigationContainer } from '@react-navigation/native';
import VocabularyDetailScreen from './screens/VocabularyDetailScreen';
import Welcome from './screens/Welcome';

export default function App() {
  return (
    <RootStack/>
  );
}

