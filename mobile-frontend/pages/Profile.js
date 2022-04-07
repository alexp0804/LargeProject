import React from 'react';
import {TouchableOpacity, ScrollView, Image, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { Ionicons } from '@expo/vector-icons';

export default function Profile ({route, navigation})
{
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
                {/* Profile Information (picture, username) */}
                <View>
                    <Image
                        style={{width:200, height:200, borderRadius:1000000, alignSelf:"center", marginTop: "15%"}}
                        source={{
                        uri: 'https://cdn.discordapp.com/attachments/963149385875738684/963149436173832222/darth_early_2020_pfp.jpg',
                        }}
                    />
                    <Text style={{textAlign:"center", fontWeight:"900", fontSize:20, marginTop:"3%"}}>
                        {route.params.username}
                    </Text>
                </View>

                {/* Buttons (CRUD) */}
                <View>
                    {/* Primary Buttons */}
                    <View style={{marginTop:"10%"}}>
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