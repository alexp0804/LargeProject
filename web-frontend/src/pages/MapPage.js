
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import MappyMap from '../components/MappyMap';


const MapPage = () =>
{
    return (
      <body>
      
        <Sidebar />

        <MappyMap />

      </body>
    );
};

export default MapPage;