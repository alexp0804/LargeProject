import React, { useState } from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import SearchBar from '../../components/SearchBar';
import RecipeCard from '../../components/RecipeCard';
import URL from '../../components/URL';

const url = URL()


export default function AllRecipes({route, navigation})
{
    console.warn("Testing 1234")
    console.warn(route.params.allRecipes)
    var all = route.params.allRecipes
    var likes = route.params.liked
    var favs = route.params.favs
    const [searchArray, setSearchArray] = useState(route.params.allRecipes)
    likeMap = {}
    favMap = {}
    likes.forEach((rec) => {
        likeMap[rec._id] = rec
    })
    favs.forEach((rec) => {
        favMap[rec._id] = rec
    })
    React.useEffect(() => {
        const nameHeader = navigation.addListener('focus', () => {
            navigation.getParent().setOptions({
                title: "All Recipes"
              });
        });
    
        return nameHeader;
      }, [navigation]);

      console.warn("All Recipies")

      console.warn(route.params.allRecipes)

      async function search(text)
      {
        try
        {    
           console.warn("Getting there")
           console.warn(text)
           let response = await fetch(url + 'searchRecipe',  {method:'POST', body:JSON.stringify({searchTerm:text}), 
           headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}});
           let txt = await response.text();
           console.warn(txt);
           let recipes = JSON.parse(txt);
           setSearchArray(recipes)
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
                                    <RecipeCard name={rec.name}
                                                desc={rec.desc}
                                                country={rec.country}
                                                pic={rec.pic}
                                                ingredients={rec.ingredients}
                                                instructions={rec.instructions}
                                                userID={route.params.id}
                                                recID={rec._id}
                                                token={route.params.token}
                                                faved={(rec._id in favMap)}
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