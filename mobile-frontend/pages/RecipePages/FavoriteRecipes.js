import React from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import RecipeCard from '../../components/RecipeCard';
import { useFocusEffect } from '@react-navigation/native';
import URL from '../../components/URL';

const url = URL()


export default function FavoriteRecipes({route, navigation})
{
    let favs = route.params.favs

    React.useEffect(() => {
        const nameHeader = navigation.addListener('focus', () => {
            navigation.getParent().setOptions({
                title: "Favorites"
              });
        });
    
        return nameHeader;
      }, [navigation]);

      console.warn("Favorite Recipes")

      console.warn(route.params.favs)
    return (
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <View>
                   {favs.map((rec, i) => {
                       return(
                       <RecipeCard name= {rec.name} country={rec.country}
                                   desc= {rec.desc} key= {i}/>
                   )})}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}