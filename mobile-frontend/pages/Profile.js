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
    const [pfp, setPfp] = useState((route.params.pic === "" || route.params.pic === null) ? 'https://cdn.discordapp.com/attachments/943310745142185989/966558890403721297/unknown.png' : route.params.pic)
    console.log(pfp)

    let openImagePickerAsync = async() =>
    {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false)
            return;

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true
        });

        console.log(pickerResult)

        let base64img = `data:image/jpg;base64,${pickerResult.base64}`;

        if (pickerResult.cancelled === true)
            return;

        setImageURI(base64img);
        await updatePfp(base64img);
    };

    async function updatePfp(uri)
    {
        console.log(imageURI)
        let response = await fetch(url + 'uploadImage', {
                            method: 'POST',
                            body: JSON.stringify( { pic: uri } ), 
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': route.params.token
                            }});

        let txt = await response.text();
        let res = JSON.parse(txt);
        setPfp(res.url)

        let response2 = await fetch(url + 'editUser', {
                            method: 'POST',
                            body: JSON.stringify( {userID: route.params.id, newField: "profilePic", newValue: res.url}),
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': route.params.token
                            }})
        let txt2 = await response2.text();
        console.log(txt2)
        let res2 = JSON.parse(txt2)

        if (res2.error != "")
        {
            alert("An error occured in updated your profile picture")
            return;
        }
        else
        {
            setPfp(res.url)
        }
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
            <ScrollView style={{width:"100%", height:"100%", backgroundColor: "white"}}>
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
                        style={{width:200, height:200, borderRadius:1000000, alignSelf:"center", marginTop: "5%"}}
                        source={{
                        uri: pfp,
                        }}>
                    </Image>                
                    <Text style={{textAlign:"center", fontWeight:"900", fontSize:30, marginTop:"3%", marginBottom: "-4%"}}>
                        {route.params.username}
                    </Text>
                </View>

                <Image
              style={{
                width: "50%",
                resizeMode: "contain",
                marginTop: -40,
                marginBottom: -250,
                marginLeft: 10,
                bottom: 70,
                zIndex: -200
              }}
              source={require("../assets/abstract3.png")}
            ></Image>

                {/* Buttons (CRUD) */}
                <View >
                    {/* Primary Buttons */}
                    <View style={{marginTop:"10%"}}>
                        {/* View Recipes */}
                        <TouchableOpacity
                            activeOpacity= {0.5} onPress={() => viewRecipes()} style={modalStyles.loginButton}  >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                                View Recipes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity= {0.5} onPress={() => handleGoToMine()} style={modalStyles.loginButton}  >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                                My Recipes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity= {0.5} onPress={openImagePickerAsync} style={modalStyles.loginButton}  >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                                Update profile picture
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5} onPress={() => navigation.dispatch(StackActions.replace("Log In"))}
                            style={modalStyles.loginButton} >
                            <Text style={{textAlign: "center", fontSize: 20, color:"white", fontFamily: "Arial", fontWeight: "500"}}>
                                Log out
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View> 
                 </View>

                 <Image
              style={{
                width: "50%",
                resizeMode: "contain",
                marginTop: -100,
                marginLeft: 200,
                zIndex: -200
                
              }}
              source={require("../assets/landingbacky.png")}
            ></Image>
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
    loginButton: {
        padding: "3.5%",
        backgroundColor: "#a1483a",
        borderRadius: 10,
        marginTop: 15,
        width: 250,
        alignSelf: "center"
    },
    icons: {
        alignContent: 'center',
        opacity: 0.5,
    },
    inputContainer: {
        flex: 1,
        marginLeft: 50, 
        marginBottom: 10,
        height: 60,
        width: 290,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: "#f8f5f3",
        alignItems: 'center',
        paddingHorizontal: 20,
      }
})

