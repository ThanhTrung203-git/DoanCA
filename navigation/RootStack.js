import react from 'react'
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { Colors } from '../components/styles';
import QuizScreen from '../components/quizScreen';
import TopicSelectionScreen from '../components/topicScreen';
import VocabularyDetailScreen from '../screens/VocabularyDetailScreen';
import VocabularyScreen from '../screens/VocabularyScreen';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();



const RootStack = ({email, setEmail, password, setPassWord, isLogin, setIsLogin, handleAuthentication})=>{
    return(
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
                        paddingLeft: 20
                    },
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Signup' component={Signup}/>
                <Stack.Screen options={ {headerTintColor: Colors.primary, 
                    headerBackVisible: false,}} name='Welcome' component={Welcome}/>
                <Stack.Screen name='VocabularyScreen' component={VocabularyScreen}/>
                <Stack.Screen name='VocabularyDetailScreen' component={VocabularyDetailScreen}/>
                <Stack.Screen name='TopicSelectionScreen' component={TopicSelectionScreen} />
                <Stack.Screen name='QuizScreen' component={QuizScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;