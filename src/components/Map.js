import React, { useState, useCallback, useRef} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'




const center = { lat: 38.8960499, lng: -77.0648878}
const options = { 
    mapId: process.env.REACT_APP_MAP_ID,
    disableDefaultUI: true,
    zoomControl: true
};

const mapContainerStyle = {
    width: '60vw',
    height: '75vh',
};

const libraries = ['places'];

const Map = () => {
    
    const { isLoaded, LoadError  } = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        // googleMapsPlaces: process.env.REACT_APP_PLACES_API,
        libraries
    });

    const [markers, setMarkers] = useState([]); 

    const [markerSelect, setMarkerSelected] = useState(null);

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current, 
            {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(), 
            time: new Date() 
            },
        ])
    }, []);


    //allows to call map wihtout rerendering 
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
                 position={{ lat: marker.lat, lng: marker.lng}} 
                 onClick={() => {
                     setMarkerSelected(marker)
                 }}/>
        ))} 
        {markerSelect ? (
            <InfoWindow position={{lat: markerSelect.lat, lng: markerSelect.lng}}>
                <div className='Referred'> 
                    <h2>
                        Referred by me
                    </h2>
                </div> 
        </InfoWindow>
        ): null}
        </GoogleMap>
        </>

        )
    } 
  

export default Map