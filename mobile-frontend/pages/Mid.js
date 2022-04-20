import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './LandingPage';
import AddRecipe from './AddRecipe';
import { useState } from 'react';

export default function Mid({route,navigation})
{
    const Stack = createNativeStackNavigator();
    console.warn("Testy test test")
    console.warn(route.params)
    return(
        <Stack.Navigator children>
            <Stack.Screen name= "Landing" component= {LandingPage} options={{headerShown: false}} initialParams={{id:route.params.id, token:route.params.token, user: route.params.username, value:route.params.value}}/>
            <Stack.Screen name= "AddRecipe" component={AddRecipe} options={{headerShown:false}} initialParams={{id:route.params.id, token:route.params.token, user: route.params.username}}/>
        </Stack.Navigator>
    )
}