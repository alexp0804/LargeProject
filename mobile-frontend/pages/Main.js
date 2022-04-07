import React, {useState} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, Text,View, StyleSheet} from 'react-native'
import { LatLng, LeafletView } from 'react-native-leaflet-view';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {CheckBox} from 'react-native-elements';

const icon = require("../components/icon.svg")
const countries = require("../components/Countries.json")

export default function Main ({route, navigation})
{  
   const [filterLikes, setFilterLikes] = useState(false)
   const [filterFavorites, setFilterFavorites] = useState(false)
   const [filterMine, setFilterMine] = useState(false)
   const [modalVisible, setModalVisible] = useState(false);
   const [blur, setBlur] = useState(1);
   const [overAmt, setOverAmt] = useState(-1)

   function mapSettings()
   {
     setModalVisible(true);
     setOverAmt(1000);
     for (let i = 0; i < 5; i++) {
         setBlur(i * 10);
     }
   }

   function addRecipe()
   {
        console.warn(route.params);
   }

   function closeModal()
   {
       setModalVisible(false);
       setOverAmt(-1)
       for (let i = 5; i >= 0; i--) {
        setBlur(i * 10);
    }
    setOverAmt(-1)
   }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
                <TouchableOpacity onPress={() => addRecipe()} style={{borderColor:"blue", borderWidth:2}}>
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
    let markerArray = [] 

    function loadMarkers()
    {

        countries.forEach((country) => {
           let tmp = {
                id: country.id,
                position: {lat: [country.latitude],lng: [country.longitude]},
                icon: "icon no worky 😔"
            }

            markerArray.push(tmp)
        })
    }
    const handleCheckboxPress = () => {
        setChecked(prev => {
          return !prev
        })
      }
    
    return(
       <SafeAreaView style={{height:"150%"}}> 
          <BlurView intensity={blur} tint="default" style={{height:"100%", width:"100%", position:"absolute", zIndex:overAmt}}>
            </BlurView>
            <LeafletView mapCenterPosition={{lat:27.964157, lng: -82.452606}}
                onLoadStart={loadMarkers} mapMarkers={markerArray}></LeafletView>
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