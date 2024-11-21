import react from 'react'
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welocome';
import { Colors } from '../components/styles';

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
                <Stack.Screen options={ {headerTintColor: Colors.primary}} name='Welcome' component={Welcome}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;