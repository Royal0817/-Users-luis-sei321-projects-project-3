import React, { useState, useCallback, useRef, useMemo} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'
// import place_id from '@react-google-places/api'
// import Search from './Search'
// import Locate from './Search'
// import {Search, Locate } from './Search' 
import usePlacesAutocomplete,{  
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

const libraries = ['places'];

const mapContainerStyle = {
    width: '96vw',
    height: '75vh',
};

const options = { 
    mapId: process.env.REACT_APP_MAP_ID,
    disableDefaultUI: true,
    zoomControl: true
};


const Map = () => {
    
    const { isLoaded, LoadError  } = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        googleMapsPlaces: process.env.REACT_APP_PLACES_API,
        libraries,
    });
    
    const center = useMemo(() => ({ lat: 38.8960499, lng: -77.0648878 }), []);
    const [markers, setMarkers] = useState([]); 
    
    const [markerSelect, setMarkerSelected] = useState(null);
    
    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current, 
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            },
        ]);
    }, []);
    
    //allows to call map wihtout rerendering 
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        
    }, []);
    
    // gets to marker 
    // const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng });
    //     mapRef.current.setZoom(14);
    // }, []);
    
    if (LoadError) return 'Error Loading Maps';
    if (!isLoaded) return 'Loading....'; 
    
    return (
        <>
        <PlacesAutocomplete setMarkerSelected={setMarkerSelected}/>
        <Locate setMarkerSelected={setMarkerSelected} />

        {/* rendered map */}
        <GoogleMap 
            id='map'
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
                    key={`${marker.lat},${marker.lng}`}
                    position={{ lat: marker.lat, lng: marker.lng}} 
                    onClick={() => {
                        setMarkerSelected(marker)
                    }}
                />
            ))}

            {/* {markerSelect ? (
                <InfoWindow position={{lat: markerSelect.lat, lng: markerSelect.lng}}
                    onCloseClick={() => {
                        setMarkerSelected();
                    }}
                >
                   <Marker />
                </InfoWindow>            
            ): null} */}

            {markerSelect && <Marker position={markerSelect}/>}
            
        </GoogleMap>
        
        </>
    ); 
}

function Locate({ setMarkerSelected }) {
    return (
        <button className='locate'
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setMarkerSelected({
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

const PlacesAutocomplete = ({ setMarkerSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();
    
    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();
        
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setMarkerSelected({ lat, lng }) ;
        
    };
    
    return (
        <>
        <Combobox onSelect={handleSelect}>
            
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className='combobox-input'
                placeholder='Search an address or bar'
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === 'OK' &&
                    data.map(({ place_id, description}) => (
                            <ComboboxOption key={place_id} value={description}/>
                        ))}
                        {/* {data.map(({place_id, description}) => (
                            console.log({data})
                        ))} */}
                </ComboboxList>
            </ComboboxPopover>
      </Combobox>
      </>
    );
  };

export default Map