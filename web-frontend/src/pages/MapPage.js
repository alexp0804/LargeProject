
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MappyMap from '../components/MappyMap';
import DraggableMarkerExample from '../components/DragPin';
import EventsExample from '../components/ZoomEvent';


// Patrick if you want to test drag icon or pan just type < DraggableMarkerExample / > instead of MappyMap
// they're already exported into here 

const MapPage = () =>
{
    return (

      <body>
      

      

        <MappyMap /> 


      </body>
    );
};

export default MapPage;