import React, { useState, Component } from "react";
import { ScrollView, StyleSheet, View, Image, Text, Dimensions} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-picasso";
import URL from './URL';

const url = URL();
export default function RecipeCard({name, desc, country, userID, recID, token, faved, liked})
{
    console.warn(faved)
    const [favIcon, setFavIcon] = useState(faved ? "heart" : "hearto")
    const [likeIcon, setLikeIcon] = useState(liked ? "ios-thumbs-up-sharp" : "ios-thumbs-up-outline")

    async function addToLikes()
    {
        let resp = await fetch(url + "addLike", {method:"POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': token}})
        let txt = await resp.text()
        let err = JSON.parse(txt)
        console.warn(err)
    }

    async function addToFav()
    {
        let resp = await fetch(url + "addFavorite", {method:"POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': token}})
        let txt = await resp.text()
        let err = JSON.parse(txt)
        console.warn(err)
    }

    async function removeFromLikes()
    {
        let resp = await fetch(url + "deleteLike", {method:"POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': token}})
        let txt = await resp.text()
        let err = JSON.parse(txt)
        if (err.error === "")
        {
            // do something to show it was successful to the user
            console.warn(err)
        }
    }

    async function removeFromFav()
    {
        let resp = await fetch(url + "deleteFavorite", {method:"POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                headers:{'Content-Type': 'application/json', 'x-access-token': token}})
        let txt = await resp.text()
        let err = JSON.parse(txt)
        if (err.error === "")
        {
            // do something to show it was successful to the user
            console.warn(err)
        }
    }
    function decideIfLiked(like)
    {
        if (like === "ios-thumbs-up-outline")
        {
            setLikeIcon("ios-thumbs-up-sharp")
            addToLikes()
        }
        else
        {
            setLikeIcon("ios-thumbs-up-outline")
            removeFromLikes()
        }
    }
    function decideIfFav(fav)
    {
        if (fav === "hearto")
        {
            setFavIcon("heart")
            addToFav()
        }
        else
        {
            setFavIcon("hearto")
            removeFromFav()
        }
    }
    return (
        <TouchableOpacity activeOpacity={0.75}>
            <View style={styles.container}>
                <Image 
                    style={styles.image} 
                    source={{uri: 'https://cdn.discordapp.com/attachments/963149385875738684/965435683554598982/keylime.jpg'}}
                />
                <View style={[{flexDirection:'row', alignItems:'center'}]}>
                    <View style={[{flex:1,flexDirection:'row'}]}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={[{justifyContent:'space-evenly', marginVertical:-1}]}>
                        <TouchableOpacity onPress={() => decideIfFav(favIcon)} activeOpacity={0.75}>
                            <AntDesign style={{marginRight:"5%"}} name={favIcon} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={[{justifyContent:'space-evenly', marginVertical:-5}]}>
                        <TouchableOpacity onPress={() => decideIfLiked(likeIcon)} activeOpacity={0.75}>
                            <Ionicons style={{marginRight:"5%"}} name={likeIcon} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.country}>
                        {country}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        overflow: "visible",
        width: deviceWidth - 25,
        backgroundColor: '#c0c0f2',
        height: 200,
        borderRadius: 30,
        alignSelf: "center",
        elevation: 9,

        marginTop: "3%"
    },
    image: {
        height: 145,
        width: deviceWidth - 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: "center",
    },
    title: {
        marginLeft: "5%",
        fontSize: 20,
        fontWeight: '800',
        margin: "1%",
    },
    country: {
        overflow: "hidden",
        marginLeft: "5%",
        marginRight: "40%",
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: '500'
    }
});