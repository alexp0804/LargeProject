import React, {useState} from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, View, Image } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/routers';
import * as ImagePicker from 'expo-image-picker'
import URL from '../../components/URL';

const url = URL()
export default function Pic({route, navigation})
{
    let countryFlagImg = `https://res.cloudinary.com/deks041ua/image/upload/v1650347912/flags/${countryMap[route.params.country]}.png`
    const [recImg, setRecImg] = useState(null)
    function closeNav()
    {
        navigation.dispatch(StackActions.replace("Landing", {screen:"Map" ,params:{adding:false}}));
    }

    function backToMap()
    {
        let finalRecImg = (recImg === null || recImg === "") ? countryFlagImg : recImg
        navigation.dispatch(StackActions.replace("Landing", {screen:"Map" ,params:{adding:true, name:route.params.name, desc:route.params.desc, 
                                                             instructions:route.params.instructions, ingredients:route.params.ingredients, 
                                                             country:route.params.country, pic:finalRecImg}}));
    }

    let openImagePickerAsync = async() =>
    {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false)
            return;

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true
        });

        console.log(pickerResult)

        let base64img = `data:image/jpg;base64,${pickerResult.base64}`;

        if (pickerResult.cancelled === true)
            return;

        await addRecImg(base64img);
    };

    async function addRecImg(uri)
    {
        let response = await fetch(url + 'uploadImage', {
                            method: 'POST',
                            body: JSON.stringify( { pic: uri } ), 
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': route.params.token
                            }});

        let txt = await response.text();
        console.log(txt)
        let res = JSON.parse(txt);
        setRecImg(res.url)
    }

    return(
        <ScrollView style={{width:"100%", height:"95%", marginTop:"15%"}}>
            <TouchableOpacity onPress={closeNav}>
            <Feather name="x" size={28} color="black"/>
            </TouchableOpacity>
            <Image
            style={{
              width: "80%",
              marginTop: ".5%",
              left: 10,
              resizeMode: "contain",
            }}
            source={require("../../assets/pic.png")}
          ></Image>
            <Text style={{textAlign:"center", paddingTop:"5%", paddingBottom:"10%", fontWeight:"bold", fontSize:30}}>
                Almost finished!
            </Text>
            <Text style={{textAlign:"center", paddingTop:"1%", paddingBottom:"10%", fontWeight:"bold", fontSize:20}}>
                1. Upload a picture.{"\n"}
                2. Hit the Check Mark.{"\n"}
                3. Drop the pin on the map.
            </Text>
            <TouchableOpacity
                activeOpacity= {0.5} onPress={openImagePickerAsync} style= {{width: "60%", padding:"3%", backgroundColor: "black", 
                borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                <Text style={{textAlign:"center", padding: "3%", fontSize:20, color:"white", fontFamily:"Arial", fontWeight:"500"}}>
                    Upload Photo
                </Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row", marginTop:"20%", alignSelf:"center"}}>
                <TouchableOpacity style={{ backgroundColor:"black", width:"25%", borderRadius:7,  alignSelf:"center"}} 
                onPress={() => navigation.navigate("CountrySelection" , {name:route.params.name, desc:route.params.desc, 
                                                                         ingredients:route.params.ingredients, instructions:route.params.instructions, country:route.params.country})}>
                    <Ionicons name="arrow-back" size={34} color="white" style={{textAlign:"center"}} />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"black",  width:"25%", borderRadius:7, marginLeft:"10%", alignSelf:"center"}} onPress={backToMap}>
                    <Ionicons name="checkmark-done-sharp" size={34} color="white" style={{textAlign:"center"}}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}