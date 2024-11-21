import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welocome from './screens/Welocome';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <RootStack/>
  );
}

