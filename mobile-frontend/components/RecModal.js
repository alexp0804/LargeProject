import React, { useState, Component } from "react";
import { ScrollView, StyleSheet, View, Image, Text, ImageBackground, Dimensions} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-picasso";
import URL from './URL';

const url = URL();
export default function RecModal({name, desc, country, pic, ingredients, instructions, userID, recID, creID, token, faved, liked, onXClick, adding})
{
    const [favIcon, setFavIcon] = useState(faved ? "heart" : "hearto")
    const [likeIcon, setLikeIcon] = useState(liked ? "ios-thumbs-up-sharp" : "ios-thumbs-up-outline")
    const [creatorName, setCreatorName] = useState("Anonymous")
    console.log(creID)

    getCreatorName()
    async function getCreatorName()
    {
        let resp = await fetch(url + "getUserInfo", {method:"POST",
                                body: JSON.stringify({userID: creID}),
                                headers:{'Content-Type': 'application/json', 'x-access-token': token}})
        let txt = await resp.text()
        let ret = JSON.parse(txt)
        console.log(ret.username)
        setCreatorName(ret.username)
    }

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

    function added()
    {
        if (adding)
        {
            return(
                <Text style={{textAlign:"center", fontSize:20, fontWeight:"bold"}}>
                    It turned out great!
                </Text>
            )
        }
    }
    return (
        <View style={styles.main}>
            {added()}
            <ImageBackground
                source={{uri: pic}}
                style={styles.img}
                imageStyle={{borderTopLeftRadius:30, borderTopRightRadius: 30}}
            >
                <TouchableOpacity onPress={onXClick} activeOpacity={0.25} borderColor='black' borderWidth="2">
                    <Feather style={{marginLeft:"2%", marginTop:"2%"}} name="x" size={28} color="black"/>
                </TouchableOpacity>
            </ImageBackground>
            <ScrollView style={styles.scroll}>
                <Text style={styles.mainTitle}>
                    {name}
                </Text>
                <Text style={styles.countryName}>
                    {country}
                </Text>
                <Text style={styles.countryName}>
                    Created by: {creatorName}
                </Text>
                <Text style={styles.sectionTitles}>
                    Ingredients:
                </Text>
                <Text style={styles.bodyText}>
                    {ingredients}
                </Text>
                <Text style={styles.sectionTitles}>
                    Description:
                </Text>
                <Text style={styles.bodyText}>
                    {desc}
                </Text>
                <Text style={styles.sectionTitles}>
                    Steps:
                </Text>
                <Text style={styles.bodyText}>
                    {instructions}
                </Text>
            </ScrollView>
            <View style={styles.footer}>
                <View style={[{flex:1, flexDirection:'row'}]}>
                    <TouchableOpacity onPress={() => decideIfFav(favIcon)} activeOpacity={0.75}>
                        <AntDesign style={{marginLeft:"19%"}} name={favIcon} size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[{justifyContent:'space-evenly', marginVertical:-1}]}>
                    <TouchableOpacity onPress={() => decideIfLiked(likeIcon)} activeOpacity={0.75}>
                        <Ionicons style={{marginLeft:"8%"}} name={likeIcon} size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        marginTop:"25%",
        height:"78%",
        width:"95%",
        margin:20,
        backgroundColor:"white",
        borderRadius: 30,
        padding:15,
        alignItems:'center',
        alignSelf:'center',
        position:"absolute",
        zIndex:20
    },
    scroll: {
        width:"100%",
        height:"100%",
        marginTop:"3%"
    },
    img: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignSelf:'center',
        width:407,
        height:200,
        marginTop:"-4%",
        borderRadius:40
    },
    mainTitle: {
        fontSize: 30,
        fontWeight:"800"
    },
    countryName: {
        fontSize:15,
        fontStyle:'italic'
    },
    sectionTitles: {
        marginTop:"7%",
        fontSize:20,
        fontWeight:"600",
    },
    bodyText: {
        fontSize:14
    },
    footer: {
        flexDirection:'row',
        alignItems:'center',
        borderBottomRightRadius:30,
        borderBottomLeftRadius: 30,
        marginBottom:"-4%",
        backgroundColor: "#e6e6e6",
        width: "109%",
        height: "8%"
    }
})