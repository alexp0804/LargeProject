import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, Platform, StyleSheet, ImagePickerIOS} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import Input from '../components/Input';
import URL from '../components/URL';
import RecModal from '../components/RecModal';
import { StackActions } from '@react-navigation/native';
import EditModal from '../components/EditModal';
import { useEffect } from 'react/cjs/react.production.min';
import * as ImagePicker from 'expo-image-picker'


const url = URL();

export default function Profile ({route, navigation})
{
    var goingToMine = false;
    const {id, username} = route.params;
    const [openModalShowing, setOpenModalShowing] = useState(false)
    const [imageURI, setImageURI] = useState(null)

    let openImagePickerAsync = async() =>
    {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false)
            return;

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true
        });

        let base64img = `data:image/jpg;base64,${pickerResult.base64}`;

        if (pickerResult.cancelled === true)
            return;

        setImageURI(base64img);
        await queryAddPicTest();
    };


    async function queryAddPicTest()
    {
        let response = await fetch(url + 'uploadImage', {
                            method: 'POST',
                            body: JSON.stringify( { pic: imageURI } ), 
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': route.params.token
                            }});

        let txt = await response.text();
        let res = JSON.parse(txt);
    }

    async function viewRecipes()
    {
        let response = await fetch (url + "getUserRecipes", {method:"POST" , headers:{'Content-Type': 'application/json', 
                                    "x-access-token":route.params.token}, body:JSON.stringify({userID:route.params.id})});
        let txt = await response.text();
        let userRec = JSON.parse(txt);

        let resp = await fetch(url + "getLikes", {method:"POST", 
                                    body: JSON.stringify({userID: route.params.id}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let text = await resp.text()
        let likes = JSON.parse(text)

        let resp2 = await fetch(url + "getFavorites", {method:"POST", 
                                body: JSON.stringify({userID: route.params.id}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let text2 = await resp2.text()
        let favorites = JSON.parse(text2)

        let resp3 = await fetch(url + "searchRecipe", {method:"POST", 
                                body: JSON.stringify({searchTerm: ""}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let text3 = await resp3.text()
        let allRecipes = JSON.parse(text3)

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
                                My Recipes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity= {0.5} onPress={openImagePickerAsync} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                                Test button :) :o
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

