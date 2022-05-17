import React, { useState, useCallback, useRef} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

const center = { lat: 38.8960499, lng: -77.0648878}
const options = { 
    mapId: process.env.REACT_APP_MAP_ID
}

const mapContainerStyle = {
    width: '65vw',
    height: '65vh'
    
} 

const libraries = ['places'];

const Map = () => {
    
    const { isLoaded, LoadError  } = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        // googleMapsPlaces: process.env.REACT_APP_PLACES_API,
        libraries
    });

    const [markers, setMarkers] = useState([]); 
    // const [markerSelect, setMarkerSelect] = useState
    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current, 
            {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(), 
            time: new Date() 
            },
        ])
    }, [])

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (LoadError) return 'Error Loading Maps';
    if (!isLoaded) return  <h1>Loading....</h1>; 
    

    return (
        <>
        {/* // Renders map onto page */}
        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={13} 
            center={center} 
            options={options} 
            onClick={onMapClick}
            onLoad={onMapLoad}>  

        {/* Sets marker for reccomendation */}
        {markers.map((marker) => (
            <Marker 
                key={marker.time.toISOString()} 
                 position={{ lat: marker.lat, lng: marker.lng}} />
        ))} 

        </GoogleMap>

       
        </>
    )
} 

export default Map