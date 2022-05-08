import SelectInput from '@mui/material/Select/SelectInput';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet'
import countryPosition from "../data/CountriesUpdated.json"
import Sidebar from './Sidebar';
import RecipeReviewCard from './SideBar/Menu/ProfileRecipesMap';
import { useMemo } from 'react';
import DraggableMarker from './DragPin.js'


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

  const [addingRecipe, setAddingRecipe] = useState(false);


  const lower = countryPosition.id;
  let flaggy = true;

  let mappy= useMap();

  const cry = useMapEvents({dragend(e){
      let bounds = mappy.getBounds()
      let northEast = bounds['_northEast']
      let southWest = bounds['_southWest']
      getRecipesInView([northEast['lng'], northEast['lat']], [southWest['lng'], southWest['lat']] );

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

  const getRecipesInView = async (northEast , southWest) =>
  {

      let jsonPayLoad = JSON.stringify({
            topRight: northEast,
            bottomLeft: southWest
      });

      try 
      {
          // returns liked, favorited
          const response = await fetch(buildPath("api/getRecipesInBounds"), {
              method: "POST",
              body: jsonPayLoad,
              headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

          let res = JSON.parse(await response.text());

        if (flaggy)
        {
            await new Promise(resolve => setTimeout(resolve,1500));
            flaggy = false;
        }

        // if we haven't loaded in yet
        if (!props.wait)
        {
            await new Promise(resolve => setTimeout(resolve,1000))
            props.setAlreadyLoaded(true);

        }
      
        setMarkerList(res);
              

      }
      catch(e)
      {
          console.log(e)
      }
  };

  useEffect(() => {getRecipesInView([23.35, 53.98], [-17.35, 45.65]);}, []);
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


  const flags = lower + '.png'


    function renderTheMarkers()
    {
        if (addingRecipe) 
            return <DraggableMarker setAddingRecipe = {setAddingRecipe} />
        else
            return markerList.map(createMarker);
    }
  
    return (


      <>

        < Sidebar setAddingRecipe = {setAddingRecipe} setMarkerList = {setMarkerList} favs = {favList} likes = {likedList}/>


        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {renderTheMarkers()}

        </>
      
    );
};

export default MappyMap;