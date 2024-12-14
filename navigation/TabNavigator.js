import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
// import QuizDashboard from "../screens/QuizDashboard";
import Welcome from '../screens/Welcome';
import VocabularyScreen from "../screens/VocabularyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AuthContext } from "../components/AuthContext";

const Tab = createBottomTabNavigator();

const TabNavigator = ({route}) => {
  const { email } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Vocabulary") {
            iconName = "book";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Ẩn tiêu đề trên mỗi Tab
      })}
    >
       <Tab.Screen name="Home">
        {({navigation}) => <Welcome email={email} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Vocabulary">
        {() => <VocabularyScreen email={email} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <ProfileScreen email={email} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
