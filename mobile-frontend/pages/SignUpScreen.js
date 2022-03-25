import React, {useState} from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import {Button, TouchableOpacity, Linking, Keyboard, ScrollView} from 'react-native';
import { ThemeProvider, SafeAreaView, Text, View, TextInput} from 'react-native-picasso';
import Input from '../components/Input';



export default function SignUpScreen({navigation}) {
 const [user, setUser] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confPass, setConf] = useState('');



  return (
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className = "mx-md my-xxl p-lg" style= {{marginTop: "25%"}}>
            <Text className = "align-center size-xxl weight-bold">
              Sign Up
            </Text>
          </View>
          <View style= {{marginLeft: "15%", marginRight: "15%", flexDirection: "row", borderColor: "gray", borderBottomWidth: 2}}>
          <Ionicons name="md-person-outline" size={24} color="black" style= {{paddingTop: "3.5%"}} />
            <Input placeholder= "Username" value= {user} 
                  setValue= {setUser} />
          </View>
          <View style= {{marginLeft: "15%", marginRight: "15%", flexDirection: "row", borderColor: "gray", borderBottomWidth: 2}}>
          <Ionicons name="mail-outline" size={24} color="black" style= {{paddingTop: "3.5%"}} />
            <Input placeholder= "Your email" value= {email} 
                  setValue= {setEmail} />
          </View>
          <View style= {{marginLeft: "15%", marginRight: "15%", flexDirection: "row", borderColor: "gray", borderBottomWidth: 2}}>
            <Feather name="unlock" size={24} color="black" style= {{paddingTop:"3%"}}/>
            <Input placeholder= "Password" value= {password} 
                  setValue= {setPassword} secure= {true}/>
          </View>
          <View style= {{marginLeft: "15%", marginRight: "15%", flexDirection: "row", borderColor: "gray", borderBottomWidth: 2}}>
            <Feather name="lock" size={24} color="black" style= {{paddingTop: "3%"}}/>
            <Input placeholder= "Confirm Password" value= {confPass} 
                  setValue= {setConf} secure= {true}/>
          </View>
          <View className= "pt-lg">
            <TouchableOpacity activeOpacity= {0.5} style= {{width: "30%", padding:"3%", backgroundColor: "blue", alignSelf: "center", 
            borderRadius: "10", shadowOpacity: ".2"}} onPress={doSignUp.bind(this, user, email, password, confPass, setEmail, setPassword, setConf, setUser)}>
              <Text className= "align-center" style= {{color: "white", fontSize: 16, fontWeight: "500"}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

function doSignUp (user, email, password, confirm, setEmail, setPassword, setConf, setUser)
{
  console.warn(user + "<- user " + email + "<- email " + password + "<- pass" + confirm + "<- conf")

  setUser("");
  setPassword("");
  setEmail("");
  setConf("");

}
