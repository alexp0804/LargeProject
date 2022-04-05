import 'react-native-gesture-handler';
import React from 'react';
import SignUpScreen from './pages/SignUpScreen';
import LogIn from './pages/LogIn';
import Main from './pages/Main.js';
import Profile from './pages/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Verify from './pages/Verify';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LandingPage()
{
  return(
    <Tab.Navigator>
      <Tab.Screen name= "Profile" component= {Profile}/>
      <Tab.Screen name= "Map" component={Main} options={{title: "Main"}}/> 
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Log In" component= {LogIn} options={{headerShown: false}} />
        <Stack.Screen name= "Sign Up" component = {SignUpScreen} options= {{title: "" , headerTransparent: true}} />
        <Stack.Screen name= "Landing" component= {LandingPage} options={{headerShown: false}}/>
        <Stack.Screen name= "Verify" component= {Verify} options= {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
