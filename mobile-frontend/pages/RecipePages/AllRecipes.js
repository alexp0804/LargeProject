import React from 'react';
import {TouchableOpacity, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { useFocusEffect } from '@react-navigation/native';
import URL from '../../components/URL';

const url = URL()


export default function AllRecipes({route, navigation})
{
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

    return (
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                <View>
                    <Image
                        style={{width:200, height:200, borderRadius:1000000, alignSelf:"center", marginTop: "15%"}}
                        source={{
                        uri: 'https://cdn.discordapp.com/attachments/963149385875738684/963149436173832222/darth_early_2020_pfp.jpg',
                        }}>
                    </Image>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}