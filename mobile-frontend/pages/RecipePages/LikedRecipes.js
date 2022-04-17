import React from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import URL from '../../components/URL';
import RecipeCard from '../../components/RecipeCard'
const url = URL()

export default function LikedRecipes({route, navigation})
{
    let liked = [];
    async function viewMyLikes()
    {
        let response = await fetch(url + "getLikes", {method:"POST", 
                                    body: JSON.stringify({userID: route.params.id}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
        let txt = await response.text()
        let res = JSON.parse(txt)
        console.warn(res)
    }

    React.useLayoutEffect(() => {
        navigation.getParent().setOptions({
          title: "Liked"
        });
        liked = viewMyLikes()
        console.warn(liked)
        console.warn("previous warn was in ULE")
      }, [navigation]);

    return (
        <SafeAreaView>
            <View style={{width:"100%", height:"100%"}}>
                {liked.map((like, i) => (
                    <RecipeCard 
                        name={like.name} 
                        desc={like.desc} 
                        country={like.country} 
                    />
                ))}
            </View>
        </SafeAreaView>
    )
}