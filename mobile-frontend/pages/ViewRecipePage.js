import All from './RecipePages/AllRecipes';
import CustomTab from '../components/CustomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import {View, Text, TouchableOpacity} from 'react-native'

export default function RecipePage({navigation, route})
{
    const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator>
      <Stack.Screen name= "AllRecipes" component= {All} options={{title: "All Recipes", headerShown:false}}
                 initialParams={{id:route.params.id, token:route.params.token, allRecipes: route.params.all, favs: route.params.favs, liked: route.params.liked}}/>
    </Stack.Navigator>
  )
}