import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import Input from '../components/Input';
import URL from '../components/URL';

const url = URL();

export default function Profile ({route, navigation})
{
    const {id, username} = route.params;
    console.warn(id + " " + username)
    
    async function viewRecipes()
    {
        console.warn(route.params.id)
        let response = await fetch (url + "getUserRecipes", {method:"POST" , headers:{'Content-Type': 'application/json', 
                                    "x-access-token":route.params.token}, body:JSON.stringify({userID:route.params.id})});
        let txt = await response.text();
        let userRec = JSON.parse(txt);
        console.warn(userRec)

        let resp = await fetch(url + "getLikes", {method:"POST", 
                                    body: JSON.stringify({userID: route.params.id}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let text = await resp.text()
        let likes = JSON.parse(text)
        console.warn(likes)

        let resp2 = await fetch(url + "getFavorites", {method:"POST", 
                                body: JSON.stringify({userID: route.params.id}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let text2 = await resp2.text()
        let favorites = JSON.parse(text2)
        console.warn(favorites)

        let resp3 = await fetch(url + "searchRecipe", {method:"POST", 
                                body: JSON.stringify({searchTerm: ""}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let text3 = await resp3.text()
        let allRecipes = JSON.parse(text3)

        navigation.navigate("ViewRecipes", {id:route.params.id, token:route.params.token, liked: likes, myRecipes: userRec, favs: favorites, all:allRecipes})
    }

    return(
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <View>
                    <Image
                        style={{width:200, height:200, borderRadius:1000000, alignSelf:"center", marginTop: "15%"}}
                        source={{
                        uri: 'https://cdn.discordapp.com/attachments/963149385875738684/963149436173832222/darth_early_2020_pfp.jpg',
                        }}>
                    </Image>
                    <Text style={{textAlign:"center", fontWeight:"900", fontSize:30, marginTop:"3%"}}>
                        {route.params.username}
                    </Text>
                </View>

                {/* Buttons (CRUD) */}
                <View>
                    {/* Primary Buttons */}
                    <View style={{marginTop:"10%"}}>
                        {/* View Recipes */}
                        <TouchableOpacity
                            activeOpacity= {0.5} onPress={() => viewRecipes()} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                                View Recipes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

