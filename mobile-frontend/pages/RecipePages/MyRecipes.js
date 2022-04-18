import React from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { useFocusEffect } from '@react-navigation/native';
import RecipeCard from '../../components/RecipeCard';
import URL from '../../components/URL';

const url = URL()
export default function MyRecipes({route, navigation})
{
    var mine = route.params.myRec
    var likes = route.params.liked
    var favs = route.params.favs
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
                title: "My Recipes"
              });
        });
    
        return nameHeader;
      }, [navigation]);

      console.warn(route.params.myRec)
      return (
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <View>
                        {mine.map((rec, i) => {
                            return (
                                <RecipeCard name={rec.name}
                                            desc={rec.desc}
                                            country={rec.country}
                                            userID={route.params.id}
                                            recID={rec._id}
                                            token={route.params.token}
                                            faved={(rec._id in favMap)}
                                            liked={(rec._id in likeMap)}
                                            key={i}
                                />
                            )
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}