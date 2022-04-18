import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import countryPosition from "../data/CountriesUpdated.json"
import Sidebar from './Sidebar';
import RecipeReviewCard from './SideBar/Menu/ProfileRecipesMap';





function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  return images;
}


const images = importAll(require.context('../assets/images/flagpng', false, /\.(png|jpe?g|svg)$/));




const MappyMap = () =>
{
  const [markerList, setMarkerList] = useState([]);
  const lower = countryPosition.id

  function createMarker(recipe)
  {
    return(<Marker
        key={recipe['_id']}
        position={recipe['coordinates']}
      >
        <Popup position={recipe['coordinates']}>
          <div>
            <h2>

              < RecipeReviewCard />

            </h2>
          </div>
        </Popup>
      </Marker>);
  }

  const flags = lower + '.png'

  
        // {countryPosition.map((countryYoink) => (
        //   <Marker
        //     key={countryYoink.id}
        //     position={[countryYoink.latitude, countryYoink.longitude]}
        //   >
        //     <Popup position={[countryYoink.latitude, countryYoink.longitude]}>
        //       <div>
        //         <h2>
        //           {/* <img src={images[flags]} />

        //           <img src= {images[countryYoink.id.toLowerCase() + '.png']} /> */}

        //           < RecipeReviewCard / >

        //         </h2>
        //       </div>
        //     </Popup>
        //   </Marker>
        // ))}



  
    return (


      <MapContainer center={[50.8333, 4]} zoom={6} minZoom={3} >

        < Sidebar createMarker= {createMarker} setMarkerList = {setMarkerList} />


        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {window.localStorage.setItem('createMarker', createMarker)}
        {window.localStorage.setItem('setMarkerList', setMarkerList)}
        
        {markerList.map(createMarker)}
      </MapContainer>
    );
};

export default MappyMap;