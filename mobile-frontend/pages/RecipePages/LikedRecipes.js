import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { useFocusEffect} from '@react-navigation/native';
import URL from '../../components/URL';
import RecipeCard from '../../components/RecipeCard'
const url = URL()

export default function LikedRecipes({route, navigation})
{
    React.useEffect(() => {
        const nameHeader = navigation.addListener('focus', () => {
            navigation.getParent().setOptions({
                title: "Liked"
              });
        });
    
        return nameHeader;
      }, [navigation]);
    

      console.warn(route.params.liked)

    return (
        <SafeAreaView>
            <View style={{width:"100%", height:"100%"}}>
                <Text>he</Text>
            </View>
        </SafeAreaView>
    )
}