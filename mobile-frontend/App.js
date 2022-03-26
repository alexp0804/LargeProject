import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, TouchableOpacity, Linking} from 'react-native';
import { ThemeProvider, SafeAreaView, Text, View, TextInput} from 'react-native-picasso';
import SignUpScreen from './pages/SignUpScreen';
import LogIn from './pages/LogIn';
import {NavigationContainer} from '@react-navigation/native';
import {Header, HeaderBackground} from '@react-navigation/elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function landingPage()
{
  return(
    <Stack.Navigator>
        <Stack.Screen name= "Log In" component= {LogIn} options={{headerShown: false}} />
        <Stack.Screen name= "Sign Up" component = {SignUpScreen} options= {{title: "" , headerTransparent: true}} />
      </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Log In" component= {LogIn} options={{headerShown: false}} />
        <Stack.Screen name= "Sign Up" component = {SignUpScreen} options= {{title: "" , headerTransparent: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
