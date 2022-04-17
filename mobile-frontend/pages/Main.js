import React, {useState, useRef, useCallback} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, Text,View, StyleSheet, TextInput, ScrollView} from 'react-native'
import { LatLng, LeafletView, } from 'react-native-leaflet-view';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {CheckBox} from 'react-native-elements';
import URL from '../components/URL';

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
   const [viewRecVis, setViewRecVis] = useState(false)
   const [likeRecipe, setLikeRecipe] = useState(false)
   const [favoriteRecipe, setFavoriteRecipe] = useState(false)

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
   
   async function checkRecipe(checkBox)
   {
       if (checkBox == "like")
       {
           if(likeRecipe == true)
           {
                try
                {
                    let response = await fetch(url + "deleteLike", {method:"POST", 
                    body: JSON.stringify({userID: route.params.id, recipeID: recipe._id}), 
                    headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
                    let txt = await response.text();
                    let res = JSON.parse(txt);
                    if (res.error != "")
                    {
                        console.warn(res.error)
                        return
                    }
                }
                catch(error)
                {
                    console.warn(error.toString())
                }
           }
           else if(likeRecipe == false)
           {
                try
                {
                    let response = await fetch(url + "addLike", {method:"POST", 
                    body: JSON.stringify({userID: route.params.id, recipeID: recipe._id}), 
                    headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
                    let txt = await response.text();
                    let res = JSON.parse(txt);
                    if (res.error != "")
                    {
                        console.warn(res.error)
                        return
                    }
                }
                catch(error)
                {
                    console.warn(error.toString())
                }
            }
            setLikeRecipe(!likeRecipe)
       }

       if (checkBox == "favorite")
       {
            if(favoriteRecipe == true)
            {
                try
                {
                    let response = await fetch(url + "deleteFavorite", {method:"POST", 
                    body: JSON.stringify({userID: route.params.id, recipeID: recipe._id}), 
                    headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
                    let txt = await response.text();
                    let res = JSON.parse(txt);
                    if (res.error != "")
                    {
                        console.warn(res.error)
                        return
                    }
                }
                catch(error)
                {
                    console.warn(error.toString())
                }
            }
            else if(favoriteRecipe == false)
            {
                try
                {
                    let response = await fetch(url + "addFavorite", {method:"POST", 
                    body: JSON.stringify({userID: route.params.id, recipeID: recipe._id}), 
                    headers:{'Content-Type': 'application/json', 'x-access-token': route.params.token}})
                    let txt = await response.text();
                    let res = JSON.parse(txt);
                    if (res.error != "")
                    {
                        console.warn(res.error)
                        return
                    }
                }
                catch(error)
                {
                    console.warn(error.toString())
                }
            }
            setFavoriteRecipe(!favoriteRecipe)
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

   async function mapMessage(message)
   {
     if(message.event === "onMapClicked")
     {
         if(addingRecip == true)
         {
            addRecipe(message.payload.touchLatLng)
            setAddingRecip(false)
            setUpdateMapVis(true)
            
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

                setViewRecVis(true)
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
            name:recipe.name,
            desc:recipe.desc,
            text:recipe.text,
            country:recipe.country,
            creator:recipe.creator,
            pic:recipe.pic,
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
            console.warn(res.error)

            if (res.error == null)
            {
                console.warn("testing")
                let temp = markerArray
                let temporary= {
                            id:res.recipeID,
                            position:{lat:[coords.lat], lng:[coords.lng]},
                            icon: "icon no worky 😔"
                }
                temp.push(temporary)
                console.warn("testing")
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
        try
        {
            console.warn("Is it breaking here")
            console.warn(filteredArray)
            let tempArray = []
            filteredArray.forEach((recipe) => {
                console.warn("Testing" + recipe._id)
                let tmp = {
                    id: recipe._id,
                    position: {lat:[recipe.coordinates[0]], lng: [recipe.coordinates[1]]},
                    icon: "icon no worky 😔"
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

   function closeAddModal()
   {
      setUpdateMapVis(false)
   }

   function closeViewRecipeModal()
   {
      setViewRecVis(false)
      console.warn("This is working")
      setLikeRecipe(false)
      setFavoriteRecipe(false)
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

    async function loadMarkers()
    {
        let tempArray = []

       try
       { 
           let response = await fetch(url + 'getUserRecipes',  {method:'POST', body:JSON.stringify({userID: route.params.id}), 
           headers:{'Content-Type': 'application/json', "x-access-token":route.params.token}});
           let txt = await response.text();
           console.warn(txt);
           let recipes = JSON.parse(txt);

          console.warn(recipes);

         recipes.forEach((recipe) => {
            console.warn(recipe)
            let tmp = {
                id: recipe._id,
                position: {lat:[recipe.coordinates[0]], lng: [recipe.coordinates[1]]},
                icon: "icon no worky 😔"
            }

            tempArray.push(tmp);            
        })
        setMarkerArray(tempArray);
       }
       catch(error)
       {
           console.warn(error.toString())
       }

    }
    
    return(
       <SafeAreaView style={{height:"150%"}}> 
          <BlurView intensity={blur} tint="default" style={{height:"100%", width:"100%", position:"absolute", zIndex:overAmt}}>
            </BlurView>
            <LeafletView doDebug={true}  mapCenterPosition={{lat:27.964157, lng: -82.452606}}
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
            <Modal animationType="slide" transparent={false} visible={viewRecVis}>
                <ScrollView style={{marginTop:"10%"}}>
                    <TouchableOpacity onPress={closeViewRecipeModal}>
                        <Feather name="x" size={28} color="black"/>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        Recipe: {recipe.name}
                    </Text>
                    <Text>
                        Description: {recipe.desc}
                    </Text>
                    <Text>
                        Pic: {recipe.pic}
                    </Text>
                    <Text>
                        Directions: {recipe.text}
                    </Text>
                    <Text>
                        Country: {recipe.country}
                    </Text>
                    <CheckBox 
                        title="Like this Recipe" 
                        checked={likeRecipe} 
                        onPress={() => checkRecipe("like")} 
                        checkedTitle="Remove from liked recipes"
                        checkedColor="green"
                    />
                    <CheckBox 
                        title="Favorite this Recipe" 
                        checked={favoriteRecipe} 
                        onPress={() => checkRecipe("favorite")} 
                        checkedTitle="Remove from favorite recipes"
                        checkedColor="green"
                    />
                </ScrollView>
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