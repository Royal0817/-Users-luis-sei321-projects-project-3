// import usePlacesAutoComplete, {
//     getGeocode,
//     getLatLng,
// } from 'use-places-autocomplete';
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from '@reach/combobox';
// import '@reach/combobox/styles.css';

// // const panTo = useCallback(({ lat, lng }) => {
// //     mapRef.current.panTo({ lat, lng });
// //     mapRef.current.setZoom(14);
// //   }, []);

// function Locate({ panTo }) {
//     return (
//         <button
//             className='locate'
//             onClick={() => {
//                 navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     panTo({
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                     });
//                 },
//                 () => null
//                 );
//             }}
//         >
//         <img src='https://www.kindpng.com/picc/m/11-115956_icon-google-maps-compass-north-hd-png-download.png' alt='compass' />
//         </button>
//     );
// }


// function Search({ panTo }) {
//     const {
//         ready, 
//         value, 
//         suggestions: { status, data },
//         setValue,
//         clearSuggestions, } 
//         = usePlacesAutoComplete({
//         requestOptions: {
//             location: { lat: () => 38.8960499, lng: () => -77.0648878 },
//             radius: 150 * 1000, 
//         },
//     });

//     const handleInput = (e) => {
//         setValue(e.target.value);
//         };

//     const handleSelect = async (address) => {
//         setValue(address, false);
//         clearSuggestions();

//         try {
//             const results = await getGeocode({ address });
//             const { lat, lng } = await getLatLng(results[0]);
//             panTo({ lat, lng });
//         } catch (error) {
//             console.log('Error with Geocode ', error);
//         }
//     };

//     return (
//     <div className='search'>
//         <Combobox onSelect={ handleSelect }>
//             <ComboboxInput
//                 value={ value }
//                 onChange={ handleInput }
//                 disabled={ !ready }
//                 placeholder='Search a bar or something'
//             />
//             <ComboboxPopover>
//                 <ComboboxList>
//                 {status === 'OK' && data.map(({ id, description}) => (
//                     <ComboboxOption key={id} value={description} />
//                     ))}
//                 </ComboboxList>
//             </ComboboxPopover>
//         </Combobox>
//     </div>
//     );
// }


// // export default Search
