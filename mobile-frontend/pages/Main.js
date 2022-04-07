import React, {useState} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, Text,View} from 'react-native'
import { LatLng, LeafletView } from 'react-native-leaflet-view';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const icon = require("../components/icon.svg")
const countries = require("../components/Countries.json")

export default function Main ({route, navigation})
{  

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
          headerRight: () => (
                <TouchableOpacity onPress={() => mapSettings()} style={{borderColor:"blue", borderWidth:2}}>
                  <Feather name="menu" size={24} color="black" />
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
                <View style={{width:"100%", height:"70%",marginTop: "60%",
                              backgroundColor: "white"}}>
                    <TouchableOpacity onPress={closeModal}>
                       <Feather name="x" size={28} color="black"/>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
        
    )
}
