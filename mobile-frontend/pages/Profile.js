import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import Input from '../components/Input';
import URL from '../components/URL';
import RecModal from '../components/RecModal';
import { StackActions } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from "react-native-progress-steps"
import EditModal from '../components/EditModal';


const url = URL();

export default function Profile ({route, navigation})
{
    var goingToMine = false;
    const {id, username} = route.params;
    console.warn(id + " " + username)
    const [openModalShowing, setOpenModalShowing] = useState(false)

    async function viewRecipes()
    {
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
        console.warn(allRecipes)

        if (!goingToMine)
        {
            navigation.navigate("ViewRecipes", {id:route.params.id, token:route.params.token, liked: likes, myRecipes: userRec, favs: favorites, all:allRecipes})
        }
        else
        {
            navigation.navigate("MyRecipes", {id:route.params.id, token:route.params.token, liked: likes, myRecipes: userRec, favs: favorites, all:allRecipes})
        }
        goingToMine = false
    }

    function handleGoToMine()
    {
        goingToMine = true
        viewRecipes()
    }

    function closeModal()
    {
        setOpenModalShowing(false);
    }

    return(
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <Modal visible={openModalShowing} animationType="slide" >
                    <EditModal
                        name="Hello!"
                        desc="HEHEHHEE"
                        country="Japan"
                        ingredients="This is a list of ingredients I guess"
                        instructions="ummm, so you do the thing and then boom ez dub"
                        userID={route.params.id}
                        recID={route.params.id}
                        token={route.params.token}
                        faved={true}
                        liked={true}
                        onXClick={closeModal}
                    />
                </Modal>
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
                        <TouchableOpacity
                            activeOpacity= {0.5} onPress={() => handleGoToMine()} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                                Testing Button :eyes:
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5} onPress={() => navigation.dispatch(StackActions.replace("Log In"))}
                            style={{width: "60%", padding:"3%", backgroundColor: "red", borderRadius: 10, shadowOpacity: ".2",
                                    alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign: "center", fontSize: 20, color:"white", fontFamily: "Arial", fontWeight: "500"}}>
                                Log out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const modalStyles = StyleSheet.create({
    modalView: {
        width:425,
        height:500,
        margin: 500,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        padding: 35,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

