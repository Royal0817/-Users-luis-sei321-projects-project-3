import React, { useState} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'

const center = { lat: 38.8960499, lng: -77.0648878}
const options = { 
    mapId: process.env.REACT_APP_MAP_ID
}

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
    
} 

const libraries = ['places'];
const Map = () => {
    
    const { isLoaded, LoadError  } = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        // googleMapsPlaces: process.env.REACT_APP_PLACES_API,
        libraries
    });

    const [markers, setMarkers] = React.useState([]);
    
    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current, 
            {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(), 
            time: new Date() 
            },
        ])
    }, [])

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
            onClick={(e) => {
                
            }}>  

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