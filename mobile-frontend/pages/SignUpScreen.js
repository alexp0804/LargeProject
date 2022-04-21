import React, {useState} from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import {Button, TouchableOpacity, Linking, Keyboard, ScrollView, StyleSheet, Image} from 'react-native';
import { ThemeProvider, SafeAreaView, Text, View, TextInput} from 'react-native-picasso';
import Input from '../components/Input';
import URL from '../components/URL';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const url = URL();


export default function SignUpScreen({navigation}) {
 const [user, setUser] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confPass, setConf] = useState('');
 const [error, setError] = useState('');
 
 async function doSignUp (user, email, password, confirm, setEmail, setPassword, setConf, setUser, navigation)
 {
   setError("");

   if(password != confirm)
   {
     setError("Passwords must match")
     setPassword("");
     setConf("");
     return;
   }

   try
   {
     let loginObj = {username: user, password: password, email:email};
     let js = JSON.stringify(loginObj);
     let response = await fetch(url + 'register/mobile', {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
     let txt = await response.text();
     let res = JSON.parse(txt);
     if (res.error != "")
     {
       setUser("");
       setPassword("");
       setEmail("");
       setConf("");
       setError(res.error);
     }
     else
     {
      setError("");
      navigation.navigate("Verify", {username: user});
     }

    }

    catch(e)
    {
      console.warn(e.toString())
      setUser("");
      setPassword("");
    }
     
  }


  return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: "white" }}>
        <KeyboardAwareScrollView>
          


          <View>

            <Image
              style={{
                width: "70%",
                resizeMode: "contain",
                left: 50,
                marginTop: -30
              }}
              source={require("../assets/signup.png")}
            ></Image>
          </View>

          <View >
          <Text
              style={{ marginTop: -30, marginBottom: 20, fontSize: 32, fontWeight: "bold", textAlign: "center" }}
            >
              Sign up
            </Text>
           
          </View>


          <View style={styles.inputContainer}>
          <Ionicons name="md-person-outline" size={24} color="black" style= {{paddingTop: ".5%"}} />
            <Input placeholder= "Username" value= {user} 
                  setValue= {setUser} />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="black" style= {{paddingTop: ".5%"}} />
            <Input placeholder= "Email" value= {email} 
                  setValue= {setEmail} />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="unlock" size={24} color="black" style= {{paddingTop:".5%"}}/>
            <Input placeholder= "Password" value= {password} 
                  setValue= {setPassword} secure= {true}/>
          </View>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="black" style= {{paddingTop: ".5%"}}/>
            <Input placeholder= "Confirm Password" value= {confPass} 
                  setValue= {setConf} secure= {true}/>
          </View>
          <View className= "pt-lg">
            <TouchableOpacity activeOpacity= {0.5} style={styles.loginButton} onPress={doSignUp.bind(this, user, email, password, confPass, setEmail, setPassword, setConf, setUser, navigation)}>
              <Text className= "align-center" style= {{color: "white", fontSize: 16, fontWeight: "500"}}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text className= "align-center" style= {{color:"red", fontSize: 20, fontWeight:"700", paddingTop: "20%"}}>
              {error}
            </Text>
            {/* Login Button */}
            <View>
              <Text
                className="align-center"
                onPress={() => navigation.navigate("Log In")}
                style={{ fontSize: 18, textDecorationLine: "underline", marginTop: "-10%"}}
              >
                Already have an account? Log in here!
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    padding: "3.5%",
    backgroundColor: "#a1483a",
    marginTop: -10,
    borderRadius: 10,
    width: 200,
    alignSelf: "center",
  },
  icons: {
      alignContent: 'center',
      opacity: 0.5,
  },
  inputContainer: {
      flex: 1,
      marginLeft: 50, 
      marginBottom: 20,
      height: 50,
      width: 290,
      borderRadius: 20,
      flexDirection: 'row',
      backgroundColor: "#f8f5f3",
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: -10
    }
});
