import React, { useState, useCallback, useRef} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'

import { 
    ComboBox,
    ComboBoxInput,
    ComboBoxPopOver,
    ComboBoxList,
    ComboBoxOption,
} from '@reach/combobox'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'



const center = { lat: 38.8960499, lng: -77.0648878}
const options = { 
    mapId: process.env.REACT_APP_MAP_ID
};

const mapContainerStyle = {
    width: '75vw',
    height: '75vh'
    
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
        {/* <Profile /> */}
        </GoogleMap>
        </>

        )
    } 
    function Search() {
        const {ready, value, suggestions: { status, data}, setValue, clearSuggestion,} = usePlacesAutocomplete({
            requestOptions: {
                location:{ lat: () => 38.8960499, lng: () => -77.0648878 },
                radius: 175 * 1000,
            }
        });
        return (
        <>
        <ComboBox onSelect={(address) => {
            console.log(address) 
        }}>
            <ComboBoxInput value={value} onChange={(e) => {
                setValue(e.target.value);   
            }}
            disabled={!ready}
            placeholder='Enter a Reference'
            />
        </ComboBox>
        </>
        )

    }

export default Map