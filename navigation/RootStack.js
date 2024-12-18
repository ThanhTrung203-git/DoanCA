import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { Colors } from '../components/styles';
import TabNavigator from './TabNavigator'; // Import TabNavigator
import TopicSelectionScreen from '../screens/topicScreen';
import QuizScreen from '../screens/quizScreen';
import VocabularyDetailScreen from '../screens/VocabularyDetailScreen';
import VocabularyScreen from '../screens/VocabularyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import WordMatchingGame from '../screens/WordMatchingGame';
import WordMatchingTopic from '../screens/WordMatchingTopic';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

const RootStack = ({ email, setEmail, password, setPassWord, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: Colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen options={{
          headerBackVisible: false
        }}
         name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          options={{
            headerTintColor: Colors.primary,
            headerBackVisible: false,
          }}
          name="Welcome"
          component={TabNavigator}
          initialParams={{ email }} 
        />
        <Stack.Screen name="TopicSelectionScreen" component={TopicSelectionScreen} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="VocabularyDetailScreen" component={VocabularyDetailScreen} />
        <Stack.Screen name="VocabularyScreen" component={VocabularyScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="WordMatchingGame" component={WordMatchingGame} />
        <Stack.Screen name="WordMatchingTopic" component={WordMatchingTopic} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
