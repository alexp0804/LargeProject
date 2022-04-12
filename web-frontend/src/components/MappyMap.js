import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import countryPosition from "../data/CountriesUpdated.json"


function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../assets/images/flagpng', false, /\.(png|jpe?g|svg)$/));




const MappyMap = () =>

  // const filteredStations = countryPosition.filter(cntry => cntry.alpha2 == "US")
  // console.log(countryPosition)  



{

  // const flags = countryPosition.id.toLowerCase();

  
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
                  <h2>

                  {/* <img src={images[`${flags}.png`].default} alt={flags} height={150} width={150}/> */}
                   
                    {countryYoink.id}
                    
                    
                    </h2>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
    );
};

export default MappyMap;