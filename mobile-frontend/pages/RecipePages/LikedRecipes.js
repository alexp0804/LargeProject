import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { useFocusEffect} from '@react-navigation/native';
import URL from '../../components/URL';
import RecipeCard from '../../components/RecipeCard'
const url = URL()

export default function LikedRecipes({route, navigation})
{
    var likes = route.params.liked
    React.useEffect(() => {
        const nameHeader = navigation.addListener('focus', () => {
            navigation.getParent().setOptions({
                title: "Liked"
              });
        });
    
        return nameHeader;
      }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <View>
                    {likes.map((rec, i) => {
                        return (
                            <RecipeCard name={rec.name}
                                        desc={rec.desc}
                                        country={rec.country}
                                        userID={route.params.id}
                                        recID={rec._id}
                                        token={route.params.token}
                                        liked={true}
                                        key={i}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}