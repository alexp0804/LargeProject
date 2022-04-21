import React, {useState} from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View, Image, StyleSheet } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/routers'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RecDescription({ route, navigation }) {
  const [value, setValue] = useState("");
  console.warn(route.params);

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

      <TextInput
        placeholderTextColor="black"
        multiline={true}
        placeholder="Add a description"
        style={{
          paddingTop: "5%",
          marginTop: "9%",
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
        {console.warn("Testing123")}
        {console.warn(route.params.name)}
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