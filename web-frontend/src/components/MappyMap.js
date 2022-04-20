import SelectInput from '@mui/material/Select/SelectInput';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet'
import countryPosition from "../data/CountriesUpdated.json"
import Sidebar from './Sidebar';
import RecipeReviewCard from './SideBar/Menu/ProfileRecipesMap';
import { useMemo } from 'react';


function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  return images;
}


const images = importAll(require.context('../assets/images/flagpng', false, /\.(png|jpe?g|svg)$/));

const app_name = 'reci-pin';
function buildPath(route)
{
  if (process.env.NODE_ENV === 'production')
      return 'https://' + app_name + '.herokuapp.com/' + route;
  else
      return 'http://localhost:5000/' + route;
}

const MappyMap = (props) =>
{
  const [markerList, setMarkerList] = useState([]);

  const [favList, setFavList] = useState([]);
  const [likedList, setLikedList] = useState([]);


  const lower = countryPosition.id;
  let flaggy = true;

  let mappy= useMap();
  
  let counter = 0;

  const cry = useMapEvents({dragend(e){
      let middle =  mappy.getCenter();
      getRecipesInView([middle['lat'], middle['lng']], 2000.3);
      console.log(mappy.getBounds())
    console.log(mappy.getCenter())
   }, });



  const getLikes = async () =>
  {
      let jsonPayLoad = JSON.stringify({
          userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
      });

      try 
      {
          // returns liked, favorited
          const response = await fetch(buildPath("api/getLikes"), {
              method: "POST",
              body: jsonPayLoad,
              headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

          let res = JSON.parse(await response.text());

         let hashy = new Map();


          for (let i = 0; i < res.length; i++)
          {
            hashy.set(res[i]['_id'], res[i])
          }
      
          setLikedList(hashy)
              



      }
      catch(e)
      {
          console.log(e)
      }
  };

  const getFavs = async () =>
  {
      let jsonPayLoad = JSON.stringify({
          userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
      });

      try 
      {
          // returns liked, favorited
          const response = await fetch(buildPath("api/getFavorites"), {
              method: "POST",
              body: jsonPayLoad,
              headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

          let res = JSON.parse(await response.text());


         let hashy = new Map();


          for (let i = 0; i < res.length; i++)
          {
            hashy.set(res[i]['_id'], res[i])
          }
      
          setFavList(hashy)


      }
      catch(e)
      {
          console.log(e)
      }
  };

  const getRecipesInView = async (center ,distances) =>
  {

      let jsonPayLoad = JSON.stringify({
            location: center,
            distance: distances
      });

      try 
      {
          // returns liked, favorited
          const response = await fetch(buildPath("api/getNearbyRecipes"), {
              method: "POST",
              body: jsonPayLoad,
              headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

          let res = JSON.parse(await response.text());

          console.log(res);

        if (flaggy)
        {
            await new Promise(resolve => setTimeout(resolve,1500));
            flaggy = false;
        }

        // if we haven't loaded in yet
        if (!props.wait)
        {
            await new Promise(resolve => setTimeout(resolve,1500))
            props.setAlreadyLoaded(true);
            console.log("WAITING")
        }
      
        setMarkerList(res);
              



      }
      catch(e)
      {
          console.log(e)
      }
  };

  useEffect(() => {getRecipesInView([50, 3], 900.3);}, []);
  useEffect(() => {getLikes();}, []);
  useEffect(() => {getFavs();}, []);

  

  function createMarker(recipe)
  {
      let x = recipe['location']['coordinates'][1]
      let y = recipe['location']['coordinates'][0]
    return(<Marker
        key={recipe['_id']}
        position={[x, y]}
      >
        <Popup position={[x, y]}>
          <div>
            <h2>

              < RecipeReviewCard 
              key = {recipe['_id']}
              recipe = {recipe} 
              like= {likedList.get(recipe['_id']) != undefined? true: false} 
              fav = {favList.get(recipe['_id']) != undefined? true: false}
              likeMethod = {setLikedList}
              favMethod = {setFavList} />

            </h2>
          </div>
        </Popup>
      </Marker>);
  }

  const eventHandlers = useMemo(() => ({dragend(){console.log('dragged')},  }), [],);

  const flags = lower + '.png'
  
    return (


      <>

        < Sidebar createMarker= {createMarker} setMarkerList = {setMarkerList} getRecipesInView = {getRecipesInView} favs = {favList}/>


        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    
        {markerList.map(createMarker)}

        </>
      
    );
};

export default MappyMap;