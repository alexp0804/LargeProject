import React, { useState, Component } from "react";
import { ScrollView, StyleSheet, View, Image, Text, Dimensions} from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-picasso";
import URL from './URL';


const likeOutline = "ios-thumbs-up-outline",
      likeFill = "ios-thumbs-up";

const url = URL();

export default function RecipeCard({name, desc, country, userID, recID, token, faved, liked})
{
    const stdHeaders = {'Content-Type': 'application/json', 'x-access-token': token}

    const [favIcon, setFavIcon] = useState(faved ? "heart" : "hearto")
    const [likeIcon, setLikeIcon] = useState(liked ? likeFill : likeOutline)

    // Adds given recipe to user likes
    async function addToLikes()
    {
        let resp = await fetch(url + "addLike", {
                                    method: "POST", 
                                    body: JSON.stringify( { userID: userID, recipeID: recID } ), 
                                    headers: stdHeaders
                                });

        let txt = await resp.text()
        let err = JSON.parse(txt)
        console.warn(err)
    }

    // Adds given recipe to user favorites
    async function addToFav()
    {
        let resp = await fetch(url + "addFavorite", {
                                    method: "POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                    headers: stdHeaders
                                });

        let txt = await resp.text()
        let err = JSON.parse(txt)
        console.warn(err)
    }

    // Removes given recipe from user likes
    async function removeFromLikes()
    {
        let resp = await fetch(url + "deleteLike", {
                                    method: "POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                    headers: stdHeaders
                                });

        let txt = await resp.text()
        let err = JSON.parse(txt)

        if (err.error === "")
        {
            // TODO: do something to show it was successful to the user
            console.warn(err)
        }
    }

    // Removes given recipe form user favorites
    async function removeFromFav()
    {
        let resp = await fetch(url + "deleteFavorite", {
                                    method: "POST", 
                                    body: JSON.stringify({userID: userID, recipeID: recID}), 
                                    headers: stdHeaders
                                });

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
        if (like === likeOutline)
        {
            setLikeIcon(likeFill)
            addToLikes()
        }
        else
        {
            setLikeIcon(likeOutline)
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
            {/* Container */}
            <View style={[styles.shared, styles.container]}>
                <Image 
                    style={[styles.image]} 
                    source={{uri: 'https://cdn.discordapp.com/attachments/963149385875738684/965435683554598982/keylime.jpg'}}
                />

                {/* Title */}
                <View style={[{flexDirection:'row', alignItems:'center'}]}>
                    <View style={[{flex:1,flexDirection:'row'}]}>
                        <Text style={styles.title}>{name}</Text>
                    </View>

                    {/* Favorite icon */}
                    <View style={[{justifyContent:'space-evenly', marginVertical:-1}]}>
                        <TouchableOpacity onPress={() => decideIfFav(favIcon)} activeOpacity={0.75}>
                            <AntDesign style={{marginRight:"5%", marginBottom:"-100%"}} name={favIcon} size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Like Icon */}
                    <View style={[{justifyContent:'space-evenly', marginVertical:-5}]}>
                        <TouchableOpacity onPress={() => decideIfLiked(likeIcon)} activeOpacity={0.75}>
                            <Ionicons style={{marginRight:"5%", marginBottom:"-100%"}} name={likeIcon} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Country */}
                <View style={[{marginLeft:"3%"}]}>
                    <Text style={styles.country}>
                        {country}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const borderRad = 25;

const styles = StyleSheet.create({
    shared: {
        borderRadius: borderRad,
    },
    container: {
        overflow: "visible",
        width: deviceWidth - 25,
        backgroundColor: 'white',
        height: 210,
        alignSelf: "center",
        elevation: 9,

        shadowColor:'black',
        shadowOffset:{
           width: 0, height: 2
        },
        shadowOpacity:0.1,

        marginTop: "5%"
    },
    image: {
        height: 145,
        width: deviceWidth - 25,

        borderTopLeftRadius: borderRad,
        borderTopRightRadius: borderRad,

        alignContent: 'center',
        alignSelf: "center",
    },
    title: {
        marginTop:"3%",
        marginLeft: "5%",
        fontSize: 20,
        fontWeight: '700',
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