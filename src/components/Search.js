import usePlacesAutocomplete, {
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
import React, { useState, useCallback, useRef} from 'react'

function Locate({ panTo }) {
    return (
        <button className='locate'
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

// export default {Locate, PlacesAutocomplete}
