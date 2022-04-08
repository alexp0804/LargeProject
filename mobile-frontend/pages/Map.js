import {useState} from 'react'

export default function Map({markerArray})
{
    const [markers, setMarkers] = useState([]);
    setMarkers(markerArray)
    return markers
}