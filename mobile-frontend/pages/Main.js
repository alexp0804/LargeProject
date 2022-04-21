import React, {useState, useRef, useCallback} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, Text,View, StyleSheet, TextInput, ScrollView} from 'react-native'
import { LatLng, LeafletView, } from 'react-native-leaflet-view';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {CheckBox} from 'react-native-elements';
import URL from '../components/URL';
import RecModal from '../components/RecModal';
import CountryCodes from '../components/CountryCodes';

const icon = require("../components/icon.svg")
const countries = require("../components/Countries.json")
const url = URL()
const countryHash = CountryCodes()


export default function Main ({route, navigation})
{  
   const [filterLikes, setFilterLikes] = useState(false)
   const [filterFavorites, setFilterFavorites] = useState(false)
   const [filterMine, setFilterMine] = useState(false)
   const [modalVisible, setModalVisible] = useState(false);
   const [markerArray, setMarkerArray] = useState([])
   const [blur, setBlur] = useState(1);
   const [overAmt, setOverAmt] = useState(-1)
   const [recipe, setRecipe] = useState({})
   const [likeRecipe, setLikeRecipe] = useState(false)
   const [favoriteRecipe, setFavoriteRecipe] = useState(false)
   const [openModalShowing, setOpenModalShowing] = useState(false)

   console.warn(route.params)

   function mapSettings()
   {
     setModalVisible(true);
     setOverAmt(1000);
     for (let i = 0; i < 5; i++) {
         setBlur(i * 10);
     }
   }
   

   function compareRecipe (id, array, box)
   {
       console.warn(id)
       console.warn(array)
       array.forEach((rec) => {
           if (rec._id == id)
           {
               if (box == "like")
               {
                   setLikeRecipe(true)
               }

               if (box == "favorite")
               {
                   setFavoriteRecipe(true)
               }
           }
       })
   }
   
   
   function addRecipeNav()
   {
        navigation.navigate("AddRecipe")
   }


   async function mapMessage(message)
   {
     if(message.event === "onMapClicked")
     {
         if(route.params.adding == true)
         {
            addRecipe(message.payload.touchLatLng)
            
         }
     }

     if (message.event == "onMapMarkerClicked")
     {
        try
        {
            let response = await fetch (url + "viewRecipe", {method:"POST" , headers:{'Content-Type': 'application/json', 
                                        "x-access-token":route.params.token}, body:JSON.stringify({id:message.payload.mapMarkerID})});
            let txt = await response.text();
            let res = JSON.parse(txt);
            if (res.error == null)
            {    
                setRecipe(res)
                
                try
                {
                     let resp = await (fetch(url + "getLikes", {method:"POST", 
                                       body: JSON.stringify({userID: route.params.id}), 
                                       headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}}))
                    
                    txt = await resp.text()
                    let newRes = JSON.parse(txt);

                    if (newRes.error == null)
                    {
                        compareRecipe(res._id, newRes, "like")
                    }
                    else if (newRes.error != null)
                    {
                        console.warn(newRes.error)
                    }
                }
                catch (error)
                {
                    console.warn(error.toString())
                }
                
                try
                {
                     let resp = await (fetch(url + "getFavorites", {method:"POST", 
                                       body: JSON.stringify({userID: route.params.id}), 
                                       headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}}))
                    
                    txt = await resp.text()
                    let newRes = JSON.parse(txt);

                    if (newRes.error == null)
                    {
                        console.warn("Is it favorites?")
                        compareRecipe(res._id, newRes, "favorite")
                    }
                    else
                    {
                        console.warn(newRes.error)
                    }
                }
                catch (error)
                {
                    console.warn(error.toString())
                }

                setOpenModalShowing(true)
            }
            else
            {
                console.warn(res.error);
            }
        }

        catch(error)
        {
            console.warn(error.toString())
        }
     }
   }

   async function addRecipe(coords)
   {
        let tmp = {
            name:route.params.name,
            desc:route.params.desc,
            instructions:route.params.instructions,
            country:route.params.country,
            creator:route.params.id,
            pic:route.params.pic,
            ingredients:route.params.ingredients,
            coordinates:[coords.lat, coords.lng],
            token: route.params.token
        }
        setRecipe(tmp);

        try
        {
            let response = await fetch(url + 'createRecipe',  {method:'POST', body:JSON.stringify(tmp), 
                                         headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}, query:{token:route.params.token}});
            let txt= await response.text()
            console.warn(txt)
            let res = JSON.parse(txt)
            console.warn("Testing456")
            console.warn(res)

            if (res.error == null)
            {
                console.warn("testing")
                let temp = markerArray
                let temporary= {
                            id:res.recipeID,
                            position:{lat:[coords.lat], lng:[coords.lng]},
                            icon: `https://res.cloudinary.com/deks041ua/image/upload/v1650347912/flags/${countryHash[recipe.country]}.png`
                }
                temp.push(temporary)
                console.warn("testing")
                setMarkerArray(temp)
                setOpenModalShowing(true);
                navigation.setParams({adding:false})
            
            }
        }
        catch(error)
        {
            console.warn(error.toString())
        }
   }


   async function closeModal()
   {
       for (let i = 5; i > 0; i--) {
        setBlur(i * 10);
        }
        setBlur(1)
        setOverAmt(-1)
        let filtered = {}
        let filteredArray = []

        if (filterLikes == true)
        {
            try
            {
                let response = await (fetch(url + "getLikes", {method:"POST", 
                                        body: JSON.stringify({userID: route.params.id}), 
                                        headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}}))
                let txt = await response.text()
                let res = JSON.parse(txt)
                res.forEach((rec) => {
                    if (!(rec._id in filtered))
                    {
                        filtered[rec._id] = 1
                        filteredArray.push(rec)
                    }
                })
                
            }
            catch(error)
            {
                console.warn(error.toString())
            }
        }

        if (filterFavorites == true)
        {
            try
            {
                let response = await (fetch(url + "getFavorites", {method:"POST", 
                                        body: JSON.stringify({userID: route.params.id}), 
                                        headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}}))
                let txt = await response.text()
                let res = JSON.parse(txt)
                res.forEach((rec) => {
                    if (!(rec._id in filtered))
                    {
                        filtered[rec._id] = 1
                        filteredArray.push(rec)
                    }
                })
                
            }
            catch(error)
            {
                console.warn(error.toString())
            }
        }

        if (filterMine == true)
        {
            try
            {
                let response = await (fetch(url + "getUserRecipes", {method:"POST", 
                                        body: JSON.stringify({userID: route.params.id}), 
                                        headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}}))
                let txt = await response.text()
                let res = JSON.parse(txt)
                res.forEach((rec) => {
                    if (!(rec._id in filtered))
                    {
                        filtered[rec._id] = 1
                        filteredArray.push(rec)
                    }
                })
                
            }
            catch(error)
            {
                console.warn(error.toString())
            }
        }

        if ((filterFavorites == false) && (filterLikes == false) && (filterMine == false))
        {
            loadMarkers();
        }
        try
        {
            console.warn("Is it breaking here")
            console.warn(filteredArray)
            let tempArray = []
            filteredArray.forEach((recipe) => {
                console.warn("Testing" + recipe._id)
                let tmp = {
                    id: recipe._id,
                    position: {lat:[recipe.location.coordinates[0]], lng: [recipe.location.coordinates[1]]},
                    icon: `https://res.cloudinary.com/deks041ua/image/upload/v1650347912/flags/${countryHash[recipe.country]}.png`
                }

                tempArray.push(tmp);            
            })
            setMarkerArray(tempArray);
        }
        catch(error)
        {
            console.warn(error.toString())
        }
        
        console.warn(markerArray)
        console.warn(filtered)
        setModalVisible(false);
   }


    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
                <TouchableOpacity onPress={() => addRecipeNav()} style={{borderColor:"blue", borderWidth:2}}>
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

    async function loadMarkers()
    {
        let tempArray = []

       try
       { 
           let response = await fetch(url + 'searchRecipe',  {method:'POST', body:JSON.stringify({searchTerm:""}), 
           headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}});
           let txt = await response.text();
           console.warn("Testing 123456")
           let recipes = JSON.parse(txt);
           console.warn(recipes)

         recipes.forEach((recipe) => {
             console.warn(recipe)
            let tmp = {
                id: recipe._id,
                position: {lat:[recipe.location.coordinates[1]], lng: [recipe.location.coordinates[0]]},
                icon: `https://res.cloudinary.com/deks041ua/image/upload/v1650347912/flags/${countryHash[recipe.country]}.png`
            }

            tempArray.push(tmp);            
        })
        console.warn(tempArray)
        setMarkerArray(tempArray);
       }
       catch(error)
       {
           console.warn(error.toString())
       }

    }
    function closeViewModalTest()
    {
        setOpenModalShowing(false);
        console.warn(openModalShowing)
    }
    
    return(
       <SafeAreaView style={{height:"150%"}}> 
          <BlurView intensity={blur} tint="default" style={{height:"100%", width:"100%", position:"absolute", zIndex:overAmt}}>
            </BlurView>
            <LeafletView doDebug={true}  mapCenterPosition={{lat:50.8333, lng: 4}} zoom={6}
                onLoadStart={() => loadMarkers()}  mapMarkers={markerArray}
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
            
            <Modal 
                visible={openModalShowing} animationType="slide" 
                transparent={true} height="10%">
                <RecModal
                    name={recipe.name}
                    desc={recipe.desc}
                    country={recipe.country}
                    pic={recipe.pic}
                    ingredients={recipe.ingredients}
                    instructions={recipe.instructions}
                    userID={route.params.id}
                    recID={recipe._id}
                    token={route.params.token}
                    faved={favoriteRecipe}
                    liked={likeRecipe}
                    onXClick={closeViewModalTest}
                    adding={route.params.adding}
                />
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
