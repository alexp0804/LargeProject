import {View, TextInput} from 'react-native-picasso';



export default function Input( {value, setValue, placeholder, secure})
{
    return (
        <TextInput className = "p-sm size-lg " placeholder= {placeholder} 
            value= {value} onChangeText= {setValue} 
            secureTextEntry = {secure}>
        </TextInput>
    );
}