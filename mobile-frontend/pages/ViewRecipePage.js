import All from './RecipePages/AllRecipes';
import Favorites from './RecipePages/FavoriteRecipes';
import Liked from './RecipePages/LikedRecipes';
import MyRecipes from './RecipePages/MyRecipes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function RecipePage({navigation, route})
{
    const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name= "AllRecipes" component= {All} options={{title: "All Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token}}/>
      <Tab.Screen name= "FavoriteRecipes" component={Favorites} options={{title: "Favorite Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token}}/> 
      <Tab.Screen name= "LikedRecipes" component={Liked} options={{title: "Liked Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token}}/> 
      <Tab.Screen name= "MyRecipes" component={MyRecipes} options={{title: "My Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token}}/> 
    </Tab.Navigator>
  )
}