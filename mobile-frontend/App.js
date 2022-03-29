import 'react-native-gesture-handler';
import React from 'react';
import SignUpScreen from './pages/SignUpScreen';
import LogIn from './pages/LogIn';
import Main from './pages/Main.js'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function LandingPage()
{
  return(
    <Drawer.Navigator>
      <Drawer.Screen name= "Main" component={Main} options={{title: "Main"}}/> 
    </Drawer.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Log In" component= {LogIn} options={{headerShown: false}} />
        <Stack.Screen name= "Sign Up" component = {SignUpScreen} options= {{title: "" , headerTransparent: true}} />
        <Stack.Screen name= "Landing" component= {LandingPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
