import All from './RecipePages/AllRecipes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import {View, Text,TouchableOpacity} from 'react-native'

export default function RecipePage({navigation, route})
{
    const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator tabBar={props => 
          <View style={{marginBottom:"12%"}}>
            <TouchableOpacity>
              <Ionicons name="thumbs-up-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>}>
      <Stack.Screen name= "AllRecipes" component= {All} options={{title: "All Recipes", headerShown:false}}
                 initialParams={{id:route.params.id, token:route.params.token, allRecipes: route.params.all, favs: route.params.favs, liked: route.params.liked}}/>
    </Stack.Navigator>
  )
}