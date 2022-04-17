import React from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { useFocusEffect } from '@react-navigation/native';
import URL from '../../components/URL';
import RecipeCard from '../../components/RecipeCard'
const url = URL()

export default function LikedRecipes({route, navigation})
{
    navigation.getParent().setOptions({
        title: "Liked"
    });
    let liked = []
    liked = viewMyLikes()
    async function viewMyLikes()
    {
        let response = await fetch(url + "getLikes", {method:"POST", 
                                    body: JSON.stringify({userID: route.params.id}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let txt = await response.text()
        let res = JSON.parse(txt)
        console.warn(res)
        return res
    }
    return (
        <SafeAreaView>
            <View style={{width:"100%", height:"100%"}}>
                <Text>he</Text>
            </View>
        </SafeAreaView>
    )
}