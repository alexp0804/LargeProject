import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, TouchableOpacity, Linking} from 'react-native';
import { ThemeProvider, SafeAreaView, Text, View, TextInput} from 'react-native-picasso';



export default function App() {
  return (
      <SafeAreaView className="flex-1">
        <View className = "mx-md my-xxl p-lg" style= {{marginTop: "25%"}}>
          <Text className = "align-center size-xxl weight-bold">
            Sign Up
          </Text>
        </View>
        <View style= {{marginLeft: "15%", marginRight: "15%"}}>
          <TextInput className = "p-sm size-lg " placeholder = "Your email" style= {{borderColor: "gray", 
          borderBottomWidth: "2"}}></TextInput>
          <TextInput className = "p-sm size-lg " placeholder = "Password" style= {{borderBottomColor: "gray", 
          borderBottomWidth: "2", paddingTop:"5%"}}></TextInput>
          <TextInput className = "p-sm size-lg " placeholder = "Confirm password" style= {{borderColor: "gray", 
          borderBottomWidth: "2", paddingTop: "5%"}}></TextInput>
        </View>
        <View className= "pt-lg">
          <TouchableOpacity activeOpacity= {0.5} style= {{width: "30%", padding:"3%", backgroundColor: "blue", marginLeft:"15%", 
          borderRadius: "10", shadowOpacity: ".2"}}>
            <Text className= "align-center" style= {{color: "white", fontSize: "16", fontWeight: "500"}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:"40%"}}>
          <Text className= "align-center" style={{fontSize: "18", textDecorationLine:"underline"}}>
            Link to login page goes here
          </Text>
        </View>
      </SafeAreaView>
  );
}
