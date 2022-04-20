import React, {useState} from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/routers'

export default function Ingredients({route, navigation})
{
    const [value, setValue] = useState("")
    console.warn(route.params)

    return(
        <ScrollView style={{width:"100%", height:"95%", marginTop:"15%"}}>
            <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace("Landing", {screen:"Map"}))}>
            <Feather name="x" size={28} color="black"/>
            </TouchableOpacity>
            <Text style={{textAlign:"center", paddingTop:"5%", paddingBottom:"10%", fontWeight:"bold", fontSize:30}}>
                Add Just a Dash of Spice
            </Text>
            <TextInput placeholderTextColor="black" multiline={true} placeholder='Add the ingredients' style={{paddingTop:"5%", marginTop:"25%", marginLeft:"5%",
                        marginRight:"5%", borderColor:"#addfad", borderBottomWidth:4, fontSize:25, textAlign:"center", maxHeight:"13%"}} onChangeText={setValue}/>
            <View style={{flexDirection:"row", marginTop:"25%", alignSelf:"center"}}>
                <TouchableOpacity style={{ backgroundColor:"#addfad", width:"25%", borderRadius:7,  alignSelf:"center"}} onPress={() => navigation.navigate("RecDescription", {name:route.params.name, desc:route.params.desc})}>
                    <Ionicons name="arrow-back" size={34} color="white" style={{textAlign:"center"}}/>
                </TouchableOpacity>
                {console.warn("Testing123")}
                {console.warn(route.params.name)}
                <TouchableOpacity style={{backgroundColor:"#addfad",  width:"25%", borderRadius:7, marginLeft:"10%", alignSelf:"center"}} 
                                          onPress={() => navigation.navigate("Instructions", {name:route.params.name, desc:route.params.desc, 
                                                                                              ingredients:value})}>
                    <Ionicons name="arrow-forward" size={34} color="white" style={{textAlign:"center"}} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}