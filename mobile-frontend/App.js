import 'react-native-gesture-handler';
import React from 'react';
import SignUpScreen from './pages/SignUpScreen';
import LogIn from './pages/LogIn';
import LandingPage from './pages/LandingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Verify from './pages/Verify';
import ViewRecipes from './pages/ViewRecipePage';



const Stack = createNativeStackNavigator();




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Log In" component= {LogIn} options={{headerShown: false}} />
        <Stack.Screen name= "Sign Up" component = {SignUpScreen} options= {{title: "" , headerTransparent: true}} />
        <Stack.Screen name= "Landing" component= {LandingPage} options={{headerShown: false}}/>
        <Stack.Screen name= "Verify" component= {Verify} options= {{headerShown: false}}/>
        <Stack.Screen name= "ViewRecipes" component= {ViewRecipes} options= {{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
