
import React, { useState } from 'react';
import MappyMap from '../components/MappyMap';
import { MapContainer} from 'react-leaflet' 

const MapPage = () =>
{
    const [center, setCenterMappy] = useState([50.8333, 4])
    const [alreadyLoaded, setAlreadyLoaded] = useState(false)
    return (

      <body>
      

      
      <MapContainer center={[50,3]} zoom={6} minZoom={3} >
        <MappyMap setCenterMappy = {setCenterMappy} setAlreadyLoaded = {setAlreadyLoaded} wait = {alreadyLoaded}/> 
        </MapContainer>


      </body>
    );
};

export default MapPage;