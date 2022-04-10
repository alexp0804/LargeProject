// import React from 'react'
// import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
// import { useState } from 'react';


// const MenuLink = ({ title, active, icon }) => {

//   const [smShow, setSmShow] = useState(false);
//   const [lgShow, setLgShow] = useState(false);


//   return (
//     <>
//       <Modal
//         size="lg"
//         show={lgShow}
//         onHide={() => setLgShow(false)}
//         aria-labelledby="example-modal-sizes-title-lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-lg">
//             Stand in modal - should be a randomizer 
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>...</Modal.Body>
//       </Modal>

//       <Container onClick={() => setLgShow(true)} active={active}>
//         <Title active={active}>{title}</Title>
//       </Container>
//     </>
//   );
// }


// const RandomPick = () => {

//   const [mapShow, setMapShow] = useState(false);


//     return (
//       <>
//         <MapContainer onClick={() => setMapShow(true)} center={[51.505, -0.09]} zoom={13}>
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker show={mapShow} position={[51.505, -0.09]}>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </>
//     );
// }

// export default RandomPick