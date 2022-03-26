import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { Feather, Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';

export default function Main (props)
{
    return(
        <SafeAreaView>
            <TouchableOpacity activeOpacity= {0.5} style= {{ paddingLeft: "3%",width: "15%", borderColor: "black", borderWidth: 2}} 
            onPress= {() => props.navigation.openDrawer()}>
                <Feather name="menu" size={30} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}
