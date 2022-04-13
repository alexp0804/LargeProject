import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import Input from '../components/Input';

export default function Profile ({route, navigation})
{
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [newRecipeName, setNewRecipeName] = useState('')
    const [newRecipeDesc, setNewRecipeDesc] = useState('')
    const [newRecipePic, setNewRecipePic] = useState('')
    const {id, username} = route.params;
    console.warn(id + " " + username)
    function goSettings()
    {
        navigation.navigate("ProfileOps", {
            screen: "Settings",
            params: {id:route.params.id, username: route.params.username}
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
                <TouchableOpacity onPress={() => goSettings()}>
                  <Ionicons name="settings" size={24} color="black"/>
                </TouchableOpacity>
          ),
        });
      }, [navigation]);


    return(
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                {/* ADD RECIPE MODAL */}
                <Modal visible={addModalOpen} animationType='slide' transparent={true}>
                    <View style={modalStyles.centeredView}>
                        <View style={modalStyles.modalView}>
                            <TouchableOpacity
                                activeOpacity= {0.5} style= {{width: "16%", height: "6%", padding:"3%", backgroundColor: "red", 
                                borderRadius: 10, shadowOpacity: ".2", alignSelf: "left", marginTop:"0%"}} onPress={() => setAddModalOpen(false)}>
                                <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <Text style={{textAlign:"center", fontWeight:"900", fontSize:20,}}>
                                Add a Recipe
                            </Text>

                            {/* FORM FOR ADDING RECIPE */}
                            <View style={{width: "100%", marginLeft: "15%", marginTop: "20%", marginRight: "15%", flexDirection: "row", borderColor: "black", borderWidth: 2}}>
                                <Input placeholder="Recipe Name" color="#7F807C" value={newRecipeName} setValue={setNewRecipeName}  />
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Profile Information (picture, username) */}
                <View>
                    <Image
                        style={{width:200, height:200, borderRadius:1000000, alignSelf:"center", marginTop: "15%"}}
                        source={{
                        uri: 'https://cdn.discordapp.com/attachments/963149385875738684/963149436173832222/darth_early_2020_pfp.jpg',
                        }}>
                    </Image>
                    <Text style={{textAlign:"center", fontWeight:"900", fontSize:20, marginTop:"3%"}}>
                        {route.params.username}
                    </Text>
                </View>

                {/* Buttons (CRUD) */}
                <View>
                    {/* Primary Buttons */}
                    <View style={{marginTop:"10%"}}>
                        {/* Add Recipe */}
                        <TouchableOpacity
                            activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center"}} onPress={() => setAddModalOpen(true)}>
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                Add Recipe
                            </Text>
                        </TouchableOpacity>

                        {/* My Recipe */}
                        <TouchableOpacity
                            activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                My Recipes
                            </Text>
                        </TouchableOpacity>

                        {/* My Favorites */}
                        <TouchableOpacity
                            activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                My Favorites
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Secondary Buttons (Logout, Settings)*/}
                    <View >

                    </View>
                </View>
                <View style= {{marginTop: "25%"}}>
                    <Text style= {{textAlign: "center"}}>
                        TODO: Add create recipe button (implement add recipe) {"\n"}
                        TODO: Add profile picture {"\n"}
                        TODO: Add profile information {"\n"}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width:325,
        height:700,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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