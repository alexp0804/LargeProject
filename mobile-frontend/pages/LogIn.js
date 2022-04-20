import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Image} from 'react-native';
import { SafeAreaView, Text, View } from 'react-native-picasso';
import { Feather, Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';
import { StackActions } from '@react-navigation/native';
import URL from '../components/URL';

const url = URL();

export default function LogIn( { navigation } )
{
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    async function doLogin(user, password, setUser, setPassword, navigation)
    {
        try
        {
            // Try logging user in
            let loginObj = {username: user, password: password};
            let js = JSON.stringify(loginObj);

            let response = await fetch(url + 'login', {
                                          method: 'POST',
                                          body: js,
                                          headers: { 'Content-Type': 'application/json' }
                                      });

            let txt = await response.text();
            let res = JSON.parse(txt);

            // If not verified, navigate to the verification page.
            if (res.verified == "no")
            {
                navigation.navigate("Verify", { username: user });
                return;
            }
            // If an error occured, don't login, and send the error
            else if (res.error != null)
            {
                setUser("");
                setPassword("");
                setError(res.error);
            }
            // If successful, navigate to the landing page with the user info
            else
            {
                console.warn("TESTING")
                console.warn(res._id)
                console.warn(res.username)
                console.warn(res.token)
                navigation.dispatch(StackActions.replace("Mid", {
                        id: res._id,
                        username: res.username,
                        token: res.token,
                        value:"Test"
                    },
                ));
            }
        }
        // Something went wrong during login.
        catch(e)
        {
            setUser("");
            setPassword("");
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>

                {/* Log In Title */}
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        ReciPin.{'\n'}
                        Recipes.{'\n'}
                        Anytime.{'\n'}
                        Anywhere.{'\n'}
                    </Text>
                    {/* <Image source="../assets/map_tilt.png">
                    </Image> */}
                
                </View>
                
                {/* Username Form */}
                <View style= {styles.forms}>

                    <Ionicons name="md-person-outline"
                              size={24}
                              color="black"
                              style={styles.icons} />

                    <Input placeholder="Username"
                           value= {user} 
                           setValue= {setUser}
                           />
                </View>

                {/* Password Form */}
                <View style= {styles.forms}>
                    <Feather name="lock"
                             size={24}
                             color="black"
                             style={styles.icons} />

                    <Input placeholder="Password"
                           value= {password} 
                           setValue={setPassword}
                           secure={true} />
                </View>
                
                {/* Login Button */}
                <View className= "pt-lg">
                    <TouchableOpacity activeOpacity={0.5}
                                      style={styles.loginButton}
                                      onPress={ 
                                          doLogin.bind(this, user, password, setUser, setPassword, navigation)
                                      }>

                        <Text className="align-center"
                              style={{color: "white", fontSize: 16, fontWeight: "500"}}>
                            Login 
                        </Text>

                    </TouchableOpacity>

                    {/* Error Message */}
                    <Text className = "align-center" style = {{color:"red", paddingTop:"15%", fontSize:20, fontWeight:"700"}}>
                        {error}
                    </Text>
                </View>

                {/* Register Button */}
                <View style={{marginTop:"25%"}}>
                    <Text className="align-center"
                          onPress={() => navigation.navigate('Sign Up')}
                          style={{fontSize: 18, textDecorationLine:"underline"}}>
                        Don't have an account? Sign up here!
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: "25%",
        textAlign: "left",
        display: "flex",
        justifyContent:"center",
        flexDirection:"row",
    },
    titleText: {
        fontSize: 36,
        fontWeight: "700",
    },
    forms: {
        height: 55,

        margin: "2%",
        marginLeft: "13%",
        marginRight: "13%",

        paddingLeft: "4%",
        paddingRight: "4%",

        flexDirection: "row",
        borderRadius: 50,

        borderColor: "gray",
        backgroundColor: 'white',

        // Shadow
        shadowColor:'black',
        shadowOffset: {
           width: 0, height: 2
        },
        shadowOpacity: 0.1,

        display: 'flex',
        alignItems: 'center',

    },
    loginButton: {
        marginLeft: "13%",
        marginRight: "13%",
        padding: "3%",
        backgroundColor: "blue",
        borderRadius: 10,
        alignSelf: "center",
    },
    icons: {
        alignContent: 'center',
        opacity: 0.5,
    }
});