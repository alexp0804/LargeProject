import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import NameRecipe from './CreateRecipe/NameRecipe';
import RecDescription from './CreateRecipe/RecDescription';
import Ingredients from './CreateRecipe/Ingredients';
import Instructions from './CreateRecipe/Instructions';
import Pic from './CreateRecipe/Pic';
import CountrySelection from './CreateRecipe/CountrySelection';


export default function AddRecipe({route, navigation})
{
    const Stack = createNativeStackNavigator();

    return(    
        <Stack.Navigator>
            <Stack.Screen name="NameRecipe" component={NameRecipe} options={{headerShown:false}}/>
            <Stack.Screen name= "RecDescription" component={RecDescription} options={{headerShown:false, title:"Description"}} />
            <Stack.Screen name= "Ingredients" component={Ingredients} options={{headerShown:false}} />
            <Stack.Screen name= "Instructions" component={Instructions} options={{headerShown:false}} />
            <Stack.Screen name= "CountrySelection" component={CountrySelection} options={{headerShown:false, title:"Country"}}/>
            <Stack.Screen name= "Pic" component={Pic} options={{headerShown:false}} initialParams={{token: route.params.token}}/>
        </Stack.Navigator>
    )
}