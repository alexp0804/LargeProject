import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'

export default function NameRecipe({route, navigation})
{
    function update(text)
    {
        navigation.getParent().getParent().setParams({value:text})
    }

    return(
        <ScrollView style={{width:"100%", height:"95%", marginTop:"15%"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Feather name="x" size={28} color="black"/>
            </TouchableOpacity>
            <Text style={{textAlign:"center", paddingTop:"5%", paddingBottom:"10%", fontWeight:"bold", fontSize:30}}>
                Create your masterpiece
            </Text>
            <TextInput placeholderTextColor="black"  placeholder='Name your recipe' style={{paddingTop:"5%", marginTop:"25%", marginLeft:"5%",
                        marginRight:"5%", borderColor:"#addfad", borderBottomWidth:4, fontSize:25, textAlign:"center"}} onChangeText={update}/>
            <View style={{justifyContent: "center"}}>
                <TouchableOpacity style={{backgroundColor:"#addfad", marginTop:"15%", width:"25%", borderRadius:7,  alignSelf:"center"}}>
                    <Ionicons name="arrow-forward" size={34} color="white" style={{textAlign:"center"}} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}