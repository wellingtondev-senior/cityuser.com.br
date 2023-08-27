import L, { Icon, IconOptions, icon } from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import markerVerde from '../../../../assets/svg/marker-verde.svg'
import markerAmarelo from '../../../../assets/svg/marker-amarelo.svg'
import markerLaranja from '../../../../assets/svg/marker-laranja.svg'
import markerVermelho from '../../../../assets/svg/marker-vermelho.svg'
import markerRoxo from '../../../../assets/svg/marker-roxo.svg';
import markerDefeito from '../../../../assets/svg/marker-defeito.svg'
import { useEffect } from "react";
import { useAdreessClick } from "../store/useAdreess.store";

interface MarkerCustomType {
    marker: any,
    position: any,
    waterlevel: string
}




const MarkerCustom = ({ marker, position, waterlevel }: MarkerCustomType) => {

    const stateMarkerAddress = useAdreessClick((state:any)=>state);

    const setMarker =()=>{
    stateMarkerAddress.actionAdreess(marker, position);

    }


  

    function Point() {

        switch (waterlevel) {
            case '0000':
                return (
                    <Marker 
                    position={position} 
                    
                    icon={L.icon({
                        iconUrl: markerVerde.src,
                        iconSize: [40, 40], 
                        iconAnchor: [20, 39]                  
                     })} >
                        <Popup>
                            <div>
                                <span className='font-bold text-[18px]'>{marker.city}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.road}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.postcode}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.neighbourhood} - </span>
                                <span className='font-bold text-[18px]'>{marker.state}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            case '1000':
                return (
                    <Marker 
                    position={position} 
                    
                    icon={L.icon({
                        iconUrl: markerAmarelo.src,
                        iconSize: [40, 40], 
                        iconAnchor: [20, 39]                  
                     })} >
                        <Popup>
                            <div>
                                <span className='font-bold text-[18px]'>{marker.city}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.road}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.postcode}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.neighbourhood} - </span>
                                <span className='font-bold text-[18px]'>{marker.state}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            case '1100':
                return (
                    <Marker 
                    position={position} 
                    
                    icon={L.icon({
                        iconUrl: markerLaranja.src,
                        iconSize: [40, 40], 
                        iconAnchor: [20, 39]                  
                     })} >
                        <Popup>
                            <div>
                                <span className='font-bold text-[18px]'>{marker.city}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.road}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.postcode}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.neighbourhood} - </span>
                                <span className='font-bold text-[18px]'>{marker.state}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            case '1110':
                return (
                    <Marker 
                    position={position} 
                    
                    icon={L.icon({
                        iconUrl: markerVermelho.src,
                        iconSize: [40, 40], 
                        iconAnchor: [20, 39]                  
                     })} >
                        <Popup>
                            <div>
                                <span className='font-bold text-[18px]'>{marker.city}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.road}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.postcode}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.neighbourhood} - </span>
                                <span className='font-bold text-[18px]'>{marker.state}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            case '1111':
                return (
                    <Marker 
                    position={position} 
                    
                    icon={L.icon({
                        iconUrl: markerRoxo.src,
                        iconSize: [40, 40], 
                        iconAnchor: [20, 39]                  
                     })} >
                        <Popup>
                            <div>
                                <span className='font-bold text-[18px]'>{marker.city}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.road}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.postcode}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.neighbourhood} - </span>
                                <span className='font-bold text-[18px]'>{marker.state}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            default:

  return (
                    <Marker 
                    position={position} 
                    icon={L.icon({
                        iconUrl: markerDefeito.src,
                        iconSize: [40, 40], 
                        iconAnchor: [20, 39]                  
                     })} >
                        <Popup>
                            <div>
                                <span className='font-bold text-[18px]'>{marker.city}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.road}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.postcode}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.neighbourhood} - </span>
                                <span className='font-bold text-[18px]'>{marker.state}</span>
                            </div>
                        </Popup>
                    </Marker>
                );


        }
    }






    return (
        <Point/>
    );
}



export { MarkerCustom };