import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View, Image, StyleSheet } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/routers'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function NameRecipe({route, navigation})
{
    const [value, setValue] = useState("")

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

          <Image
            style={{
              width: "80%",
              marginTop: ".5%",
              left: 100,
              resizeMode: "contain",
            }}
            source={require("../../assets/float.png")}
          ></Image>

          <Text
            style={{
              marginTop: -10,
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Name {"\n"} your masterpiece
          </Text>


        </TouchableOpacity>
       
        <TextInput
          placeholderTextColor="black"
          placeholder=""
          style={{
            paddingTop: "5%",
            marginTop: "5%",
            marginLeft: "10%",
            marginRight: "10%",
            borderColor: "black",
            borderBottomWidth: 4,
            fontSize: 25,
            textAlign: "center",
          }}
          onChangeText={setValue}
        />
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              marginTop: "15%",
              width: "25%",
              borderRadius: 7,
              alignSelf: "center",
            }}
            onPress={() => {
              navigation.navigate("RecDescription", { name: value });
            }}
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
        backgroundColor: '#a1483a',
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