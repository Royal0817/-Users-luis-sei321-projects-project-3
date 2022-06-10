import React, { useState, useCallback, useRef} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'
// import Search from './Search'
// import Locate from './Search'
// import {Search, Locate } from './Search' not working? 
import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';


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
        googleMapsPlaces: process.env.REACT_APP_PLACES_API,
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

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
      }, []);
    

    if (LoadError) return 'Error Loading Maps';
    if (!isLoaded) return  <h1>Loading....</h1>; 
    

    return (
        <>
        <Search panTo={panTo} />
        <Locate panTo={panTo} />
        {/* // Renders map onto page */}
        <GoogleMap 
            className='map'
            mapContainerStyle={mapContainerStyle} 
            zoom={13} 
            center={center} 
            options={options} 
            onClick={onMapClick}
            onLoad={onMapLoad}>  

        {/* Sets marker for reccomendation */}
        {markers.map((marker) => (
            <Marker 
                // key={marker.time.toISOString()} 
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng}} 
                onClick={() => {
                    setMarkerSelected(marker)
                }}/>
        ))} 
        {markerSelect ? (
            <InfoWindow position={{lat: markerSelect.lat, lng: markerSelect.lng}}
            onCloseClick={() => {
                setMarkerSelected(null);
              }}>
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


function Locate({ panTo }) {
    return (
        <button
            className='locate'
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    });
                },
                () => null
                );
            }}
        >
        <img src='https://www.kindpng.com/picc/m/11-115956_icon-google-maps-compass-north-hd-png-download.png' alt='compass' />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready, 
        value, 
        suggestions: { status, data },
        setValue,
        clearSuggestions, } 
        = usePlacesAutoComplete({
        requestOptions: {
            location: { lat: () => 38.8960499, lng: () => -77.0648878 },
            radius: 150 * 1000, 
        },
    });

    const handleInput = (e) => {
        setValue(e.target.value);
        };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log('Error with Geocode ', error);
        }
    };

return (
    <div className='search'>
        <Combobox onSelect={ handleSelect }>
            <ComboboxInput
                value={ value }
                onChange={ handleInput }
                disabled={ !ready }
                placeholder='Search a bar or something'
            />
            <ComboboxPopover>
                <ComboboxList>
                {status === 'OK' && data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </div>
    );
}
    
  

export default Map