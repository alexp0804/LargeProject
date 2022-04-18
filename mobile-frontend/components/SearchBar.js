import React from 'react'
import {TextInput} from 'react-native'

export default function SearchBar( {placeholder, color, value, onChangeText})
{
    return (
        <TextInput  placeholder= {placeholder} 
            placeholderTextColor={color} textAlign="left"
            value= {value} onChangeText= {onChangeText} /> 
    );
}