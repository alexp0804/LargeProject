import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

export default function Main (props)
{
    return(
        <LeafletView mapCenterPosition={{lat:27.964157, lng: -82.452606}}>
        </LeafletView>
    )
}
