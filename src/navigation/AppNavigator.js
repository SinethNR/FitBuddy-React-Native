import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreens';
import ProfileScreen from '../screens/ProfileScreen';

// Import actions
import { checkAuthStatus } from '../redux/slices/authSlice';
import { loadFavourites } from '../redux/slices/favouritesSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack - Login/Register
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Welcome to FitBuddy' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Create Account' }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator - Home, Favourites, Profile
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconText;

          if (route.name === 'Home') {
            iconText = '🏠';
          } else if (route.name === 'Favourites') {
            iconText = '❤️';
          } else if (route.name === 'Profile') {
            iconText = '👤';
          }

          return <Text style={{ fontSize: size, color }}>{iconText}</Text>;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'FitBuddy' }}
      />
      <Tab.Screen 
        name="Favourites" 
        component={FavouritesScreen}
        options={{ title: 'My Favourites' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator - Includes tabs and detail screens
function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ title: 'Exercise Details' }}
      />
    </Stack.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Check authentication status on app start
    dispatch(checkAuthStatus());
    dispatch(loadFavourites());
  }, [dispatch]);

  return isAuthenticated ? <MainStack /> : <AuthStack />;
}