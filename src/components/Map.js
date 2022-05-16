import React, { useSatte} from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'

const center = { lat: 38.8960499, lng: -77.0648878}
const libraries = ['places']

const Map = () => {
    
    const { isLoaded, LoadError  } = useLoadScript ({
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
            libraries
        });
    if (!isLoaded) {
       return  <h1>Loading....</h1>
    }

    return (
        <>

       
        </>
    )
}

export default Map