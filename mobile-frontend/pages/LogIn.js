import React, {useState} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { Feather, Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';



export default function LogIn({navigation}) {
 const [user, setUser] = useState('');
 const [password, setPassword] = useState('');


  return (
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className = "mx-md my-xxl p-lg" style= {{marginTop: "25%"}}>
            <Text className = "align-center size-xxl weight-bold">
              Log In
            </Text>
          </View>
          <View style= {{marginLeft: "15%", marginRight: "15%", flexDirection: "row", borderColor: "gray", borderBottomWidth: 2}}>
            <Ionicons name="md-person-outline" size={24} color="black" style= {{paddingTop: "3.5%"}} />
            <Input placeholder= "Username" value= {user} 
                  setValue= {setUser} />
          </View>
          <View style= {{marginLeft: "15%", marginRight: "15%", flexDirection: "row", borderColor: "gray", borderBottomWidth: 2}}>
            <Feather name="lock" size={24} color="black" style= {{paddingTop:"3%"}}/>
            <Input placeholder="Password" value= {password} 
                  setValue= {setPassword} secure= {true}/>
          </View>
          <View className= "pt-lg">
            <TouchableOpacity activeOpacity= {0.5} style= {{width: "30%", padding:"3%", backgroundColor: "blue", 
            borderRadius: "10", shadowOpacity: ".2", alignSelf: "center"}} onPress={doLogin.bind(this, user, password, setUser, setPassword)}>
              <Text className= "align-center" style= {{color: "white", fontSize: 16, fontWeight: "500"}}>
                Login 
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:"40%"}}>
            <Text className= "align-center" onPress= {() => navigation.navigate('Sign Up')}style={{fontSize: 18, textDecorationLine:"underline"}}>
              Don't have an account? Sign up here!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

function doLogin(user, password, setUser, setPassword)
{
  console.warn(user + "<- user " + password + "<- password" );
  setUser("");
  setPassword("");
}