import React, {useState} from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View, Image, StyleSheet } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/routers'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RecDescription({ route, navigation }) {
  const [value, setValue] = useState("");

  return (
    <KeyboardAwareScrollView style={{ width: "100%", height: "95%", marginTop: "15%" }}>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            StackActions.replace("Landing", { screen: "Map" })
          )
        }
      >
        <Feather name="x" size={28} color="black" />
      </TouchableOpacity>

      <Image
        style={{
          width: "80%",
          marginTop: ".5%",
          left: 30,
          resizeMode: "contain",
        }}
        source={require("../../assets/swing.png")}
      ></Image>

      <Text
        style={{
          marginTop: 20,
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Quick elevator pitch {"\n"} for your recipe
      </Text>
      <View style = {style.indicatorContainer}>
          <View style = {style.indicator}></View>
          <View style = {style.currentIndicator}></View>
          <View style = {style.indicator}></View>
          <View style = {style.indicator}></View>
          <View style = {style.indicator}></View>
          <View style = {style.indicator}></View>
      </View>
      <TextInput
        placeholderTextColor="black"
        multiline={true}
        placeholder="Add a description"
        style={{
          paddingTop: "5%",
          marginTop: "4%",
          marginLeft: "10%",
          marginRight: "10%",
          borderColor: "black",
          borderBottomWidth: 4,
          fontSize: 25,
          textAlign: "center",
          maxHeight: "13%",
        }}
        onChangeText={setValue}
      />
      <View
        style={{ flexDirection: "row", marginTop: "25%", alignSelf: "center" }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: "25%",
            borderRadius: 7,
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("NameRecipe")}
        >
          <Ionicons
            name="arrow-back"
            size={34}
            color="white"
            style={{ textAlign: "center" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: "25%",
            borderRadius: 7,
            marginLeft: "10%",
            alignSelf: "center",
          }}
          onPress={() =>
            navigation.navigate("Ingredients", {
              name: route.params.name,
              desc: value,
            })
          }
        >
          <Ionicons
            name="arrow-forward"
            size={34}
            color="white"
            style={{ textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const style = StyleSheet.create ({
  textContainer: {
      flex: 1, 
      paddingHorizontal: 50, 
      justifyContent: 'space-between',
      paddingBottom: 40,
  },
  indicatorContainer: {
      height: 50,
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    currentIndicator: {
      height: 12,
      width: 30,
      borderRadius: 10,
      backgroundColor: '#ff5677',
      marginHorizontal: 5,
    },
    indicator: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: 'grey',
      marginHorizontal: 5,
    },
    
   
});