import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar( { placeholder, color, value, onChangeText } )
{
    return (
        <View style={styles.searchSection}>
            <TextInput
                placeholder={placeholder} 
                placeholderTextColor={color}
                textAlign="left"
                style={styles.searchText}
                value={value}
                onChangeText={onChangeText}
                />
            <Ionicons
                name={'search-outline'}
                style={[styles.searchText, styles.searchIcon]}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "3%",

        paddingLeft: "5%",

        height: 50,
        borderRadius: 25,

        backgroundColor: 'white',

        // Shadow
        shadowColor:'black',
        shadowOffset:{
           width: 0, height: 2
        },
        shadowOpacity:0.1,

        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchText: {
        // Font info
        textAlign: 'left',
        fontSize: 18,
        flexGrow: 9
    },
    searchIcon: {
        marginRight: "5%",
        fontSize: 24,
        opacity: 0.7,
        flexGrow:0
    }
});