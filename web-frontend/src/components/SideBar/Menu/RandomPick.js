import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { useState } from 'react';


const RandomPick = () => {

  const [mapShow, setMapShow] = useState(false);


    return (
      <>
        <MapContainer onClick={() => setMapShow(true)} center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker show={mapShow} position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </>
    );
}

export default RandomPick