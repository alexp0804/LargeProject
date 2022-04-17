import { useState } from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, Text, View, TextInput} from 'react-native-picasso';
import { Ionicons } from '@expo/vector-icons';
import URL from '../components/URL';

const url = URL();

export default function Verify({route, navigation})
{
    const [authCode, setAuthCode] = useState('');
    let apiObj = {
        auth: authCode,
        username: route.params.user
    }

    async function doAuth(authCode, navigation)
    {
        let username = route.params.username
        console.warn(username)
        try
        {
            let response = await fetch(url + 'verify' + '/' + authCode + '/' + username
                                        , {method:'GET', headers:{'Content-Type': 'application/json'}})
            console.warn(response.status)
            if (response.status != 200)
            {
                // add error code saying invalid auth code
                console.warn("something is wrong boy!")
                setAuthCode("");
                return;
            }
            else
            {
                navigation.navigate("Log In")
            }
        }
        catch(e)
        {
            console.warn(e.toString())
            setAuthCode("");
        }
    }
    return(
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View style={{paddingTop:"35%"}}>
                    <Text style={{textAlign:"center", fontWeight: "600", fontSize:24}}>
                        We need to make sure you're you
                    </Text>
                </View>
                <View style={{marginLeft: "8%", marginRight:"8%", paddingTop: "40%", 
                      flexDirection:"row", borderBottomColor:"gray", borderBottomWidth:2}}>
                    <Ionicons name="finger-print" size={24} color="black" style={{paddingRight:"3%"}} />
                    <TextInput placeholder='Enter email verification code' value= {authCode} 
                    onChangeText= {setAuthCode} style={{fontSize: 24, width: "92%"}}/>
                </View>
                <View style= {{paddingTop: "25%"}}>
                    <TouchableOpacity activeOpacity= {0.5} style= {{width: "30%", padding:"3%", backgroundColor: "blue", 
                    borderRadius: 10, shadowOpacity: ".2", alignSelf: "center"}} onPress={doAuth.bind(this, authCode, navigation)}>
                    <Text className= "align-center" style= {{color: "white", fontSize: 16, fontWeight: "500"}}>
                        Verify
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:"25%"}}>
                    <Text className= "align-center" style={{fontSize: 18, textDecorationLine:"underline"}}>
                      Didn't get a code? Click here to resend.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}