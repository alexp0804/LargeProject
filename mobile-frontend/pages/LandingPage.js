import Profile from './Profile';
import Main from './Main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function LandingPage({navigation, route})
{
    const Tab = createBottomTabNavigator();
    console.warn(route.params.params)

  return(
    <Tab.Navigator>
      <Tab.Screen name= "Profile" component= {Profile} 
                 initialParams={{id:route.params.params.id, username:route.params.params.username}}/>
      <Tab.Screen name= "Map" component={Main} options={{title: "Main"}}
                 initialParams={{id:route.params.params.id, username:route.params.params.username}}/> 
    </Tab.Navigator>
  )
}