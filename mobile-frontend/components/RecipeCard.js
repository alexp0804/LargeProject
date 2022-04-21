import React, { useState, Component } from "react";
import { Alerts, ScrollView, StyleSheet, View, Image, Text, Dimensions, Modal, Alert} from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-picasso";
import URL from './URL';
import RecModal from '../components/RecModal';
import EditModal from '../components/EditModal';
import CountryHash from '../components/CountryCodes'
import { BlurView } from "expo-blur";

const likeOutline = "ios-thumbs-up-outline",
      likeFill = "ios-thumbs-up";


const url = URL();

export default function RecipeCard({name, desc, country, pic, ingredients, instructions, userID, recID, creID, token, faved, liked, isMyRec})
{
    const stdHeaders = {'Content-Type': 'application/json', 'x-access-token': token}

    const [favIcon, setFavIcon] = useState(faved ? "heart" : "hearto")
    const [likeIcon, setLikeIcon] = useState(liked ? likeFill : likeOutline)
    const [overAmt, setOverAmt] = useState(-1);
    const [blur, setBlur] = useState(0)
    console.log(pic)
    recPic = (pic === null || pic === "") ? `https://res.cloudinary.com/deks041ua/image/upload/v1650347912/flags/${countryMap[country]}.png` : pic
    const [openModalShowing, setOpenModalShowing] = useState(false)

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
    function closeModal()
    {
        setOpenModalShowing(false);
        setOverAmt(-1);
        setBlur(0);
    }

    function decideWhichModal()
    {
        if (isMyRec)
        {
            return (
                <EditModal
                    name={name}
                    desc={desc}
                    country={country}
                    pic={recPic}
                    ingredients={ingredients}
                    instructions={instructions}
                    recID={recID}
                    token={token}
                    onXClick={closeModal}
                />
            )
        }
        else
        {
            return (
                <RecModal
                    name={name}
                    desc={desc}
                    country={country}
                    pic={recPic}
                    ingredients={ingredients}
                    instructions={instructions}
                    userID={userID}
                    recID={recID}
                    creID={creID}
                    token={token}
                    faved={faved}
                    liked={liked}
                    onXClick={closeModal}
                />
            )
        }
    }

    function OpenModal()
    {
        setOverAmt(11)
        setBlur(50)
        setOpenModalShowing(true)
    }

    return (
        <TouchableOpacity activeOpacity={0.75} onPress={() => OpenModal()}>
            <Modal
            
                visible={openModalShowing} animationType="slide" 
                transparent={true} height="10%">
                {decideWhichModal()}
                <BlurView intensity={blur} tint="default" style={{height:"100%", width:"100%", position:"absolute", zIndex:overAmt}}>

                </BlurView>
            </Modal>
            {/* Container */}
            <View style={[styles.shared, styles.container]}>
                <Image 
                    style={[styles.image]} 
                    source={{uri: recPic}}
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
    absolute:{
        position:"absolute",
        zIndex:20
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

        marginTop: "5%",
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