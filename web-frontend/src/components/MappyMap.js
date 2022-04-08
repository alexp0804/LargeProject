import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import countryPosition from "../data/Countries-position.json"


const MappyMap = () =>

  // const filteredStations = countryPosition.filter(cntry => cntry.alpha2 == "US")
  // console.log(countryPosition)  

{
    return (
        <MapContainer center={[50.8333, 4]} zoom={6}>


          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> 

          {countryPosition.map((countryYoink) => (
            <Marker
              key={countryYoink.id}
              position={[countryYoink.latitude, countryYoink.longitude]}
            >
              <Popup position={[countryYoink.latitude, countryYoink.longitude]}>
                <div>
                  <h2>{countryYoink.country}</h2>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
    );
};

export default MappyMap;