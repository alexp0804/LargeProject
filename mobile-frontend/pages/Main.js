import React, {useState} from 'react';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const icon = require("../components/icon.svg")
const countries = require("../components/Countries.json")

export default function Main ({route, navigation})
{   
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
        <LeafletView mapCenterPosition={{lat:27.964157, lng: -82.452606}}
            onLoadStart={loadMarkers} mapMarkers={markerArray}
        />
    )
}
