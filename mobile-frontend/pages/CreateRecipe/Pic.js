import React from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/routers';

export default function Pic({route, navigation})
{
    function closeNav()
    {
        navigation.dispatch(StackActions.replace("Landing", {screen:"Map" ,params:{adding:false}}));
    }

    function backToMap()
    {
        navigation.dispatch(StackActions.replace("Landing", {screen:"Map" ,params:{adding:true, name:route.params.name, desc:route.params.desc, 
                                                             instructions:route.params.instructions, ingredients:route.params.ingredients, 
                                                             country:route.params.country, pic:"Test"}}));
    }

    return(
        <ScrollView style={{width:"100%", height:"95%", marginTop:"15%"}}>
            <TouchableOpacity onPress={closeNav}>
            <Feather name="x" size={28} color="black"/>
            </TouchableOpacity>
            <Text style={{textAlign:"center", paddingTop:"5%", paddingBottom:"10%", fontWeight:"bold", fontSize:30}}>
                Almost finished!
            </Text>
            <Text style={{textAlign:"center", paddingTop:"5%", paddingBottom:"10%", fontWeight:"bold", fontSize:20}}>
                As easy as:{"\n"}
                Upload a picture.{"\n"}
                Hit the Check Mark.{"\n"}
                Tap anywhere on the map.
            </Text>
            <TextInput placeholderTextColor="black" multiline={true} placeholder='Input Instructions' style={{paddingTop:"5%", marginTop:"25%", marginLeft:"5%",
                        marginRight:"5%", borderColor:"#addfad", borderBottomWidth:4, fontSize:25, textAlign:"center", maxHeight:"13%"}}/>
            <View style={{flexDirection:"row", marginTop:"25%", alignSelf:"center"}}>
                <TouchableOpacity style={{ backgroundColor:"#addfad", width:"25%", borderRadius:7,  alignSelf:"center"}} 
                onPress={() => navigation.navigate("CountrySelection" , {name:route.params.name, desc:route.params.desc, 
                                                                         ingredients:route.params.ingredients, instructions:route.params.instructions, country:route.params.country})}>
                    <Ionicons name="arrow-back" size={34} color="white" style={{textAlign:"center"}} />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"#addfad",  width:"25%", borderRadius:7, marginLeft:"10%", alignSelf:"center"}} onPress={backToMap}>
                    <Ionicons name="checkmark-done-sharp" size={34} color="white" style={{textAlign:"center"}}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}