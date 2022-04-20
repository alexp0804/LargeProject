import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NameRecipe from './CreateRecipe/NameRecipe';
import RecDescription from './CreateRecipe/RecDescription';
import Ingredients from './CreateRecipe/Ingredients';
import Instructions from './CreateRecipe/Instructions';
import Pic from './CreateRecipe/Pic';
import CountrySelection from './CreateRecipe/CountrySelection';


export default function AddRecipe({route, navigation}, setName, setDesc, setInstructions, setIngredients, setPic, setCountry)
{
    const Tab = createBottomTabNavigator();

    return(    
        <Tab.Navigator>
            <Tab.Screen name="NameRecipe" component={NameRecipe}/>
            <Tab.Screen name= "RecDescription" component={RecDescription} options={{headerShown:false, title:"Description"}} />
            <Tab.Screen name= "Ingredients" component={Ingredients} options={{headerShown:false}} />
            <Tab.Screen name= "Instructions" component={Instructions} options={{headerShown:false}} />
            <Tab.Screen name= "CountrySelection" component={CountrySelection} options={{headerShown:false, title:"Country"}}/>
            <Tab.Screen name= "Pic" component={Pic} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}