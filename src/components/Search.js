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

function Search() {
    const {ready, 
        value, 
        suggestions: { status, data },
        setValue,
        clearSuggestion, } = 
        usePlacesAutoComplete({
        requestOptions: {
            location: {lat: () => 38.8960499, lng: () => -77.0648878},
            radius: 150 * 1000, 
        }
    });

    return (
        <div className='search'>
            <Combobox onSelect={ async (address) => {
                try {
                    const results = await getGeocgitode({address});
                    console.log(results[0])
                } catch (error) {
                    console.log('Error with Async Search!')
                }
            }}>
                <ComboboxInput 
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder='enter a adress'
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