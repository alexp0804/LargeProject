import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, TouchableOpacity, Linking} from 'react-native';
import { ThemeProvider, SafeAreaView, Text, View, TextInput} from 'react-native-picasso';
import SignUpScreen from './pages/SignUpScreen';
import LogIn from './pages/LogIn';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Log In" component = {LogIn} />
        <Stack.Screen name= "Sign Up" component = {SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
