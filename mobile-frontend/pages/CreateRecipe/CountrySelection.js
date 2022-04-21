import React, {useState} from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View, Image } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { SelectCountry } from 'react-native-element-dropdown';
import { StackActions } from '@react-navigation/routers'


const countries = require("../../components/Countries.json")
let countrArray = []

export default function CountrySelection({route, navigation})
{
    const [value, setValue] = useState("")
    const [initialized, setInitialized] = useState(false)
    const [country, setCountry] = useState("")
    if (!initialized)
    {
        setInitialized(true)
        countries.forEach((country) => {
            countrArray.push({label:country.name, value:country.id})
        })
    }
    console.warn(route.params)
    return(
        <View style={{width:"100%", height:"95%", marginTop:"15%"}}>
            <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace("Landing", {screen:"Map"}))}>
            <Feather name="x" size={28} color="black"/>
            </TouchableOpacity>
            <Image
            style={{
              width: "60%",
              marginTop: ".5%",
              left: 70,
              resizeMode: "contain",
            }}
            source={require("../../assets/globe.png")}
          ></Image>


            <Text
            style={{
              marginTop: -10,
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Where is it from?
          </Text>

            <SelectCountry activeColor='#addfad' style={{padding: "3%", marginLeft:"11%", marginRight:"11%", marginTop: "10%", backgroundColor: "#dbe1e1"}} search searchPlaceholder='Search for country...' placeholder='Select Country' data={countrArray} labelField='label' valueField='value' onChange={item => {
                setValue(item.value);
                setCountry(item.label)
            }} value={value}/>
            <View style={{flexDirection:"row", marginTop:"25%", alignSelf:"center"}}>
                <TouchableOpacity style={{backgroundColor:"black", width:"25%", borderRadius:7,  alignSelf:"center"}} 
                                          onPress={() => navigation.navigate("Instructions", {name:route.params.name, desc:route.params.desc, 
                                          ingredients:route.params.ingredients, instructions:route.params.instructions})}>
                    <Ionicons name="arrow-back" size={34} color="white" style={{textAlign:"center"}} />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"black",  width:"25%", borderRadius:7, marginLeft:"10%", alignSelf:"center"}} onPress={() => navigation.navigate("Pic", {name:route.params.name, desc:route.params.desc, 
                                                             ingredients:route.params.ingredients, instructions:route.params.instructions, country:country})}>
                    <Ionicons name="arrow-forward" size={34} color="white" style={{textAlign:"center"}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}