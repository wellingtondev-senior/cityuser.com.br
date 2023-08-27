import L, { Icon, IconOptions, LatLng, icon } from "leaflet";
import { FaCarSide, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import markerVerde from '../../../../assets/svg/marker-verde.svg'
import markerAmarelo from '../../../../assets/svg/marker-amarelo.svg'
import markerLaranja from '../../../../assets/svg/marker-laranja.svg'
import markerVermelho from '../../../../assets/svg/marker-vermelho.svg'
import markerRoxo from '../../../../assets/svg/marker-roxo.svg';
import markerDefeito from '../../../../assets/svg/marker-defeito.svg'
import { useEffect } from "react";
import WaterAnimation from "../water";

interface MarkerCustomType {
    marker: {
        indentidade: [
            {
                nome: string,
                sigla: string,
                latitude: number,
                longitude: number
                bairro: string
                cidade: string
                uf: string
                cep: string
                endereco: string
                active: boolean
            }
        ]


    },
    position: LatLng,
    waterlevel: string,
}




const MarkerCustom = ({ marker, position, waterlevel }: MarkerCustomType) => {



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
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].cidade}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].endereco}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].cep}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].bairro} - </span>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].uf}</span>
                                <div className="p-2 mt-4 bg-green-600 rounded-lg text-white font-bold text-[12px] flex items-center justify-center">ALERTA VERDE</div>
                                <div className="mt-4 p-4">
                                    <span className="">
                                        O alerta verde indica que a área está com nível de água abaixo de 19cm.
                                    </span>
                                </div>
                                <div className="w-full h-[120px]  flex items-end justify-center">

                                    <WaterAnimation /><div className="absolute bottom-0 text-[100px] flex items-end text-gray-950"> <FaCarSide /></div>
                                    <div className="w-full absolute flex flex-row justify-end right-4">
                                        <div className="relative text-[11px]  h-[100px]  rounded-[20%] bg-transparent flex items-end justify-end">
                                            <div className="w-auto h-[50px]  bg-blue-400"><span className="font-bold text-gray-200 px-2">120cm</span></div>
                                        </div>



                                    </div>

                                </div>
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
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].cidade}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].endereco}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].cep}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].bairro} - </span>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].uf}</span>
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
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].cidade}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].endereco}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].cep}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].bairro} - </span>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].uf}</span>
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
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].cidade}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].endereco}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].cep}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].bairro} - </span>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].uf}</span>
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
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].cidade}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].endereco}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].cep}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].bairro} - </span>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].uf}</span>
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
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].cidade}</span>
                                <div>
                                    <span className='font-bold text-[12px]'>ENDEREÇO:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].endereco}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[12px]'>CEP:</span>
                                    <span className='text-[12px]'>{marker.indentidade[0].cep}</span>
                                </div>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].bairro} - </span>
                                <span className='font-bold text-[18px]'>{marker.indentidade[0].uf}</span>
                            </div>
                        </Popup>
                    </Marker>
                );


        }
    }






    return (
        <Point />
    );
}



export { MarkerCustom };