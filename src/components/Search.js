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

function Search({ panTo }) {
    const {ready, 
        value, 
        suggestions: { status, data },
        setValue,
        clearSuggestions, } = 
        usePlacesAutoComplete({
        requestOptions: {
            location: {lat: () => 38.8960499, lng: () => -77.0648878},
            radius: 150 * 1000, 
        }
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
          console.log("Error with Geocode ", error);
        }
      };

    return (
        <div className='search'>
            <Combobox onSelect={ handleSelect }>
                <ComboboxInput 
                value={value} 
                onChange={ handleInput }
                disabled={!ready}
                placeholder='enter an address'
                />
            
                <ComboboxPopover> 
                    {status === 'OK' && data.map(({id, description}) => (
                        <ComboboxOption key={id} value={description} />
                    )) }
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default Search