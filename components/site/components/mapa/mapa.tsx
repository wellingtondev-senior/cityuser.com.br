import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react';
import { LatLng } from 'leaflet';
import { MarkerCustom } from '../marker/marker';
import { IndetificadorType } from '../../../form/indentificador/hook/useIdentificador';
import useSearchZoom from '../search/useSearchZoom';
import useNewslleterState from '../newslleter/state/useNewslleterState';

interface  MarkerType {
    dataMarker:any[],
    children:any

}


const Mapa = ({dataMarker, children}:MarkerType) => {

  const useSearchZoomState = useSearchZoom((state:any)=>state)
  const useNewslleterStates = useNewslleterState((state:any)=>state);
  const [reloadKey, setReloadKey] = useState(0);

    function handleMarkerClick(marker:any){
      if(useSearchZoomState.inputVisible){
        useSearchZoomState.setInputVisible();
      }
      useNewslleterStates.setWaterLevel(marker.dispositivo.waterLevel);
      useNewslleterStates.setCorStatus(marker.dispositivo.corStatus);
      useNewslleterStates.setIdentificadorId(marker.indentidade[0].id);
      useNewslleterStates.setActiveWindow(true);
    }
   

    const MapEvents = () => {
        useMapEvents({
          click(e) {
            dataMarker.forEach((dispositivo) => {
              const latlng = new LatLng(dispositivo.indentidade[0].latitude, dispositivo.indentidade[0].longitude);
              const distance = e.latlng.distanceTo(latlng);
              if (distance < 10*useSearchZoomState.zoom/1.9 && distance > 1) {
                handleMarkerClick(dispositivo);
              }
            });
          },
        });
    
        return null;
      };
    

 
    return (
        <MapContainer
            center={[useSearchZoomState.latitude, useSearchZoomState.longitude]}
            zoom={useSearchZoomState.zoom}
            style={{ width: '100%', height: "100%", cursor: 'pointer' }}
            key={useSearchZoomState.latitude}
        >
            <MapEvents />
            {
               dataMarker.length > 0 ?  dataMarker.map((dispositivo, i)=>{
                return (
                <MarkerCustom 
                key={i} 
                marker={dispositivo} 
                position={new LatLng(dispositivo.indentidade[0].latitude, dispositivo.indentidade[0].longitude)} 
                waterlevel={dispositivo.dispositivo.waterLevel} />)

               }):<></>
            }
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        
        </MapContainer>
    );
}

export default Mapa;