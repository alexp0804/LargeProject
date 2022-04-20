import All from './RecipePages/AllRecipes';
import Favorites from './RecipePages/FavoriteRecipes';
import Liked from './RecipePages/LikedRecipes';
import MyRecipes from './MyRecipes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

export default function RecipePage({navigation, route})
{
    const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        let iconName;

        if (route.name == 'AllRecipes') 
        {
          iconName = focused
            ? 'ios-globe-sharp'
            : 'ios-globe-outline';
        } 
        else if (route.name == 'FavoriteRecipes') 
        {
          iconName = focused ? 'heart-circle' : 'heart-circle-outline';
        }
        else if (route.name == 'LikedRecipes')
        {
          iconName = focused ? 'thumbs-up-sharp' : 'thumbs-up-outline'
        }
        else if (route.name == 'MyRecipes')
        {
          iconName = focused ? "ios-person-circle" : 'ios-person-circle-outline'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={"green"} />;
      },
      headerShown:false
    })}>
      <Tab.Screen name= "AllRecipes" component= {All} options={{title: "All Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token, allRecipes: route.params.all, favs: route.params.favs, liked: route.params.liked}}/>
      <Tab.Screen name= "FavoriteRecipes" component={Favorites} options={{title: "Favorite Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token, favs: route.params.favs, liked: route.params.liked}}/> 
      <Tab.Screen name= "LikedRecipes" component={Liked} options={{title: "Liked Recipes"}}
                 initialParams={{id:route.params.id, token:route.params.token, favs: route.params.favs, liked: route.params.liked}}/> 
    </Tab.Navigator>
  )
}