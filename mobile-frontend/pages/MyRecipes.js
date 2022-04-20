import React, { useState } from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import SearchBar from '../components/SearchBar';
import URL from '../components/URL';
import RecipeCard from '../components/RecipeCard';
const url = URL()
export default function MyRecipes({route, navigation})
{
    var mine = route.params.myRecipes
    var likes = route.params.liked
    var favs = route.params.favs
    const hashyHash = {}
    const [searchArray, setSearchArray] = useState(route.params.myRecipes)
    likeMap = {}
    favMap = {}
    likes.forEach((rec) => {
        likeMap[rec._id] = rec
    })
    favs.forEach((rec) => {
        favMap[rec._id] = rec
    })

      async function search(text)
      {
        try
        {
                mine.forEach((rec) => {
                    hashyHash[rec._id] = rec
                })
                
            console.warn("Getting there")
            console.warn(text)
            console.warn(hashyHash)
            let response = await fetch(url + 'searchRecipe',  {method:'POST', body:JSON.stringify({searchTerm:text}), 
            headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}});
            let txt = await response.text();
            console.warn("This WAS working")
            console.warn(txt);
            let recipes = JSON.parse(txt);
            let tempArray = []
            console.warn("Testing 2.0")
            console.warn(recipes)

            recipes.forEach((rec) => {
                ("This is working")
                    if (rec._id in hashyHash)
                    {
                        console.warn("Testy Test")
                        tempArray.push(rec)
                    }
            })
            console.warn("Testing Test test")
            console.warn(tempArray)
            setSearchArray(tempArray)
        }
        catch(error)
        {
            console.warn(error.toString())
        }
    }
      return (
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <SearchBar onChangeText={search} placeholder="Search"
                           />
                    <View>
                        {searchArray.map((rec) => {
                            return (
                                <RecipeCard 
                                    name={rec.name}
                                    desc={rec.desc}
                                    country={rec.country}
                                    ingredients="heheieihf"
                                    instructions="hehehehe"
                                    userID={route.params.id}
                                    recID={rec._id}
                                    token={route.params.token}
                                    faved={(rec._id in favMap)}
                                    liked={(rec._id in likeMap)}
                                    isMyRec={true}
                                    key={rec._id}
                                />
                            )
                        })}
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}