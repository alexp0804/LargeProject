import React, { useState } from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import URL from '../../components/URL';

const url = URL()


export default function FavoriteRecipes({route, navigation})
{
    const favs = route.params.favs
    const likes = route.params.liked
    const hashyHash = {}
    const [searchArray,setSearchArray] = useState(route.params.favs)
    likeMap = {}
    likes.forEach((rec) => {
        likeMap[rec._id] = rec
    })

    async function search(text)
    {
        try
        {
                favs.forEach((rec) => {
                hashyHash[rec._id] = rec
                })

            let response = await fetch(url + 'searchRecipe',  {method:'POST', body:JSON.stringify({searchTerm:text}), 
            headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}});
            let txt = await response.text();

            let recipes = JSON.parse(txt);
            let tempArray = []

            recipes.forEach((rec) => {
                    if (rec._id in hashyHash)
                    {
                        tempArray.push(rec)
                    }
            })
            setSearchArray(tempArray)
        }
        catch(error)
        {
            console.warn(error.toString())
        }


    }

    React.useEffect(() => {
        const nameHeader = navigation.addListener('focus', () => {
            navigation.getParent().setOptions({
                title: "Favorites"
              });
        });
        
        return nameHeader;
      }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <SearchBar onChangeText={search} placeholder="Search"
                           />
                <View>
                        {searchArray.map((rec, i) => {
                            return (
                                <RecipeCard name={rec.name}
                                    desc={rec.desc}
                                    country={rec.country}
                                    pic={rec.pic}
                                    ingredients={rec.ingredients}
                                    instructions={rec.instructions}
                                    userID={route.params.id}
                                    recID={rec._id}
                                    token={route.params.token}
                                    faved={true}
                                    liked={(rec._id in likeMap)}
                                    key={rec._id}
                                />
                            )
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}