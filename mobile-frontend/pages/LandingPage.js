import Profile from './Profile';
import Main from './Main';
import {Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

export default function LandingPage({navigation, route})
{
    const Tab = createBottomTabNavigator();
    console.warn(route.params.params)

  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        let iconName;

        if (route.name == "Profile") {
            iconName = focused ? "person-sharp" : "person-outline";
        } else if (route.name == "Map") {
            iconName = focused ? "earth" : "earth-outline";
        }

        return <Ionicons name={iconName} size={size} color={"green"} />;
    },

      tabBarLabel: ({ focused }) => {
        let titleStyle = {
          fontSize: 12,
          fontWeight: focused ? 'bold' : '500',
          color: focused ? 'green' : 'black',
        };
        if (route.name === 'Profile') {
          return <Text style={titleStyle}>Profile</Text>;
        } else if (route.name === 'Map') {
          return <Text style={titleStyle}>Explore</Text>;
        } 
      },
      
    })}>
      <Tab.Screen name= "Profile" component= {Profile} 
                 initialParams={{id:route.params.params.id, 
                 username:route.params.params.username, 
                 token:route.params.params.token}}/>
      <Tab.Screen name= "Map" component={Main}
                 initialParams={{id:route.params.params.id, username:route.params.params.username, token:route.params.params.token}}/> 
    </Tab.Navigator>
  )
}