import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useState } from 'react';
import { LatLng } from 'leaflet';
import axios from 'axios';
import { MarkerCustom } from './marker';
import { useAdreessClick } from '../store/useAdreess.store';
import { useWaterLevel } from '../store/useWaterLevel';

export type MarkersType = {
    id: number
    name: string
    slug: string
    location: {
        longitude: number
        latitude: number

    }
}
export type MapsPropsType = {
    places?: MarkersType[],
}


const Map = ({ places }: MapsPropsType) => {
    const stateMarkerAddress = useAdreessClick((state:any)=>state);
    const stateWaterLevel = useWaterLevel((state: any) => state)


    const [marker, setMarker] = useState({
        city: "",
        city_district: "",
        country: "",
        country_code: "",
        postcode: "",
        state: "",
        neighbourhood: "",
        road: "",
        location: new LatLng(0, 0)
    });

    async function getAdreess(lat: number, lng: number) {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const { data } = response
            console.log(data)
            return data
        } catch (error: any) {
            console.log(error.message)
            return null
        }
    }

    function MapClickHandler() {
        const map = useMapEvents({
            click: async (e) => {
                const { lat, lng } = e.latlng;
                const data = await getAdreess(lat, lng);
                const { address } = data
                setMarker({
                    city: address.city,
                    city_district: address.city_district,
                    country: address.country,
                    country_code: address.country_code,
                    postcode: address.postcode,
                    state: address.state,
                    neighbourhood: address.neighbourhood,
                    road: address.road,
                    location: new LatLng(lat, lng)
                });
                //stateMarkerAddress?.removeAdreess();
                stateMarkerAddress?.actionAdreess({
                    city: address.city,
                    city_district: address.city_district,
                    country: address.country,
                    country_code: address.country_code,
                    postcode: address.postcode,
                    state: address.state,
                    neighbourhood: address.neighbourhood,
                    road: address.road,
                    location: new LatLng(lat, lng)
                });

            },
        });

        return null;
    };
    return (
        <MapContainer
            center={[-22.661, -50.3995]}
            zoom={13}
            style={{ width: '100%', height: "100%",cursor: 'pointer' }}
        >
            <MapClickHandler />
            <MarkerCustom marker={marker} position={marker.location} waterlevel={stateWaterLevel.waterLevel} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
        </MapContainer>
    );
}

export default Map;