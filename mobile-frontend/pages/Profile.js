import {TouchableOpacity, ScrollView, Image, StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native-picasso';

export default function Profile ({route, navigation})
{
    return(
        <SafeAreaView>
            <ScrollView style={{width:"100%", height:"100%"}}>
                {/* Profile Information (picture, username) */}
                <View>
                    <Image
                        style={{width:200, height:200, borderRadius:1000000, alignSelf:"center", marginTop: "15%"}}
                        source={{
                        uri: 'https://cdn.discordapp.com/attachments/963149385875738684/963149436173832222/darth_early_2020_pfp.jpg',
                        }}
                    />
                    <Text style={{textAlign:"center", fontWeight:"900", fontSize:20, marginTop:"3%"}}>
                        {route.params.username}
                    </Text>
                </View>

                {/* Buttons (CRUD) */}
                <View>
                    {/* Primary Buttons */}
                    <View style={{marginTop:"10%"}}>
                        {/* Add Recipe */}
                        <TouchableOpacity
                            activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                Add Recipe
                            </Text>
                        </TouchableOpacity>
                        {/* My Recipe */}
                        <TouchableOpacity
                            activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                My Recipes
                            </Text>
                        </TouchableOpacity>
                        {/* My Favorites */}
                        <TouchableOpacity
                            activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} >
                            <Text style={{textAlign:"center", fontSize:20, color:"white", fontFamily:"Times New Roman", fontWeight:"500"}}>
                                My Favorites
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Secondary Buttons (Logout, Settings)*/}
                    <View >

                    </View>
                </View>
                <View style= {{marginTop: "25%"}}>
                    <Text style= {{textAlign: "center"}}>
                        TODO: Add create recipe button (implement add recipe) {"\n"}
                        TODO: Add profile picture {"\n"}
                        TODO: Add profile information {"\n"}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}