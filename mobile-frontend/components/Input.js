import {View, TextInput} from 'react-native-picasso';



export default function Input( {value, setValue, placeholder, secure, color})
{
    return (
        <TextInput className = "p-sm size-lg " placeholder= {placeholder} 
            placeholderTextColor={color} textAlign="left" textAlignVertical='top'
            value= {value} onChangeText= {setValue} 
            secureTextEntry = {secure} style= {{width: "92%"}}> 
        </TextInput>
    );
}