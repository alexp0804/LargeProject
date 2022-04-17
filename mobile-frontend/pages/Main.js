import React, {useState, useRef, useCallback} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, Text,View, StyleSheet, TextInput, ScrollView} from 'react-native'
import {WebView} from 'react-native-webview'
import { LatLng, LeafletView, } from 'react-native-leaflet-view';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {CheckBox} from 'react-native-elements';
import URL from '../components/URL';
import Map from './Map';

const icon = require("../components/icon.svg")
const countries = require("../components/Countries.json")
const url = URL()

export default function Main ({route, navigation})
{  
   const [filterLikes, setFilterLikes] = useState(false)
   const [filterFavorites, setFilterFavorites] = useState(false)
   const [filterMine, setFilterMine] = useState(false)
   const [modalVisible, setModalVisible] = useState(false);
   const [addRecipeVis, setAddRecipeVis] = useState(false)
   const [markerArray, setMarkerArray] = useState([])
   const [blur, setBlur] = useState(1);
   const [overAmt, setOverAmt] = useState(-1)
   const [desc, setDesc] = useState("")
   const [name, setName] = useState("")
   const [directions, setDirections] = useState("")
   const [addingRecip, setAddingRecip] = useState(false)
   const [recipe, setRecipe] = useState({})
   const [country, setCountry] = useState("")
   const [updateMapVis, setUpdateMapVis] = useState(false)
   function mapSettings()
   {
     setModalVisible(true);
     setOverAmt(1000);
     for (let i = 0; i < 5; i++) {
         setBlur(i * 10);
     }
   }
   

   function addRecipeModal()
   {
        setAddRecipeVis(true)
   }

   function addingRecipe(name, desc, text, country, id)
   {
        setAddRecipeVis(false)
        setAddingRecip(true)
        setRecipe({
            name:name,
            desc:desc,
            text:text,
            country:country,
            creator:id,
            pic:"test"
        })
   }

   function mapMessage(message)
   {
     if(message.event === "onMapClicked")
     {
         if(addingRecip == true)
         {
            addRecipe(message.payload.touchLatLng)
            console.warn(message.payload.touchLatLng)
            setAddingRecip(false)
            setUpdateMapVis(true)
            
         }
     }
   }

   async function addRecipe(coords)
   {
        let tmp = {
            name:recipe.name,
            desc:recipe.desc,
            text:recipe.text,
            country:recipe.country,
            creator:recipe.creator,
            pic:recipe.pic,
            coordinates:coords,
            token: route.params.token
        }
        setRecipe(tmp);
        console.warn(recipe)
        try
        {
            let response = await fetch(url + 'createRecipe',  {method:'POST', body:JSON.stringify(recipe), 
                                         headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}, query:{token:route.params.token}});
            let txt= await response.text()
            console.warn(txt)
            let res = JSON.parse(txt)
            console.warn(res)

            if (res.error == "")
            {
                let temp = markerArray
                let temporary= {
                            id:"Test",
                            position:{lat:[coords.lat], lng:[coords.lng]},
                            icon: "icon no worky 😔"
                }
                temp.push(temporary)
                console.warn(temporary)
                setMarkerArray(temp)
            
            }
        }
        catch(error)
        {
            console.warn(error.toString())
        }
   }

   function closeRecipe()
   {
       console.warn(desc)
       console.warn(name)
       console.warn(directions)
       setAddRecipeVis(false)
   }

   function closeModal()
   {
       setModalVisible(false);
       for (let i = 5; i > 0; i--) {
        setBlur(i * 10);
        }
    setBlur(1)
    setOverAmt(-1)
   }

   function closeAddModal()
   {
      setUpdateMapVis(false)
   }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
                <TouchableOpacity onPress={() => addRecipeModal()} style={{borderColor:"blue", borderWidth:2}}>
                  <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
          ),
        });
        navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity>
                  <Feather name="menu" size={24} color="black" onPress={() => mapSettings()}/>
              </TouchableOpacity>
            ),
          });
      }, [navigation]);

    console.warn(JSON.stringify(route))

    function loadMarkers()
    {
        let tempArray = [];
        countries.forEach((country) => {
           let tmp = {
                id: country.id,
                position: {lat: [country.latitude],lng: [country.longitude]},
                icon: "icon no worky 😔"
            }

            tempArray.push(tmp);            
        })
        setMarkerArray(tempArray);
    }
    
    return(
       <SafeAreaView style={{height:"150%"}}> 
          <BlurView intensity={blur} tint="default" style={{height:"100%", width:"100%", position:"absolute", zIndex:overAmt}}>
            </BlurView>
            <LeafletView doDebug={true}  mapCenterPosition={{lat:27.964157, lng: -82.452606}}
                onLoadStart={loadMarkers}  mapMarkers={markerArray}
                onMessageReceived={(message) => mapMessage(message, recipe)}></LeafletView>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={modalStyles.modalView}>
                    <TouchableOpacity onPress={closeModal}>
                       <Feather name="x" size={28} color="black"/>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center", fontSize:20, color:"black", fontWeight:"500"}}>
                        Filter Options
                    </Text>
                    <CheckBox 
                        title="My Liked Recipes" 
                        checked={filterLikes} 
                        onPress={() => setFilterLikes(!filterLikes)} 
                        checkedTitle="Filtering by Liked Recipes"
                        checkedColor="green"
                    />
                    <CheckBox 
                        title="My Favorite Recipes" 
                        checked={filterFavorites} 
                        onPress={() => setFilterFavorites(!filterFavorites)} 
                        checkedTitle="Filtering by Favorited Recipes"
                        checkedColor="green"
                    />
                    <CheckBox 
                        title="My Created Recipes" 
                        checked={filterMine} 
                        onPress={() => setFilterMine(!filterMine)} 
                        checkedTitle="Filtering by My Recipes"
                        checkedColor="green"
                    />
                </View>
            </Modal>
            <Modal animationType="slide"
                transparent={false}
                visible={addRecipeVis}
            >
                <ScrollView style={{width:"100%", height:"95%", marginTop:"10%"}}>
                    <TouchableOpacity onPress={closeRecipe}>
                       <Feather name="x" size={28} color="black"/>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        Add Recipe
                    </Text>
                    <TextInput placeholderTextColor="black" placeholder='Enter recipe name' value={name} onChangeText={setName} style={{padding:"5%", borderColor:"black", borderWidth:2}}/>
                    <TextInput placeholderTextColor="black" placeholder='Enter description' value={desc} onChangeText= {setDesc}style={{padding:"5%", borderColor:"black", borderWidth:2}}/>
                    <TextInput placeholderTextColor="black" placeholder='Enter directions'  value={directions} onChangeText={setDirections}style={{padding:"5%", borderColor:"black", borderWidth:2}}/>
                    <TextInput placeholderTextColor="black" placeholder='Enter country'  value={country} onChangeText={setCountry}style={{padding:"5%", borderColor:"black", borderWidth:2}}/>
                    <TouchableOpacity activeOpacity= {0.5} style= {{width: "60%", padding:"3%", backgroundColor: "green", 
                            borderRadius: 10, shadowOpacity: ".2", alignSelf: "center", marginTop:"3%"}} onPress={() => addingRecipe(name, desc, directions, country, route.params.id)}>
                        <Text>
                            Add Recipe
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
            <Modal animationType="slide" transparent={false} visible={updateMapVis}>
                <View style={{marginTop:"10%"}}>
                    <TouchableOpacity onPress={closeAddModal}>
                        <Feather name="x" size={28} color="black"/>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        You just added a recipe!
                    </Text>
                </View>
            </Modal>
        </SafeAreaView>
        
    )
}

const modalStyles = StyleSheet.create({
    modalView: {
        width:425,
        height:500,
        margin: 500,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        padding: 35,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})