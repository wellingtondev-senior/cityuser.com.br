import { useEffect, useState } from "react";
import useSearchZoom from "../search/useSearchZoom";
import useNewslleterState from "../newslleter/state/useNewslleterState";
import getIndicador from "./http/getIndicador";
import Mapa from "./mapa";
import SearchComponent from "../search/search";
import NewslleterWindow from "../newslleter/newslleter";
import { MdSearch } from "react-icons/md";
import Lottie from "react-lottie-player";
import loadMap from '../../../../assets/lottie/load-mapa.json'

interface MapaContainerProps {
    data: []
}
const MapaContainer = ({ data }: MapaContainerProps) => {

    const useSearchZoomState = useSearchZoom((state: any) => state);
    const useNewslleterStates = useNewslleterState((state: any) => state);
    const [isdata, setIsData] = useState<any[]>([]);

    const findAll = async (d: any[]) => {
        try {
            const dispositivoActiveArray = new Array();
            for (let index in d) {
                const element = d[index]
                if (element.indentidade.length > 0 && element.indentidade[0].active) {
                    dispositivoActiveArray.push(element);
                }
            }
            console.log(`total Active: ${dispositivoActiveArray.length}`)
            setIsData(dispositivoActiveArray)
        } catch (error: any) {

        }
    }

    useEffect(() => {
        console.log(data)
        if (data.length > 0) {
            findAll(data);

        }
    }, [data]);
    return (
        <div id="mapa" className="w-full md:h-[600px] h-[500px] mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 bg-[#177079] cursor-pointer">
            {
                data.length > 0 ?
                    <Mapa dataMarker={isdata} >
                        <div className="flex absolute  right-0 z-[9998] w-full  h-full">
                            <SearchComponent visible={useSearchZoomState.inputVisible} />
                            <NewslleterWindow data={isdata} />
                            <div className="absolute w-[50px] h-full bg-transparent flex flex-col items-center justify-end right-0 pr-4 pb-10">
                                <button onClick={() => {
                                    useSearchZoomState.setInputVisible();
                                    useNewslleterStates.setActiveWindow(false);
                                }} className=" w-10 h-10  mb-10 bg-[#2980b9] hover:bg-[#070b0e] rounded-full  flex items-center justify-center transition-[0.5s] ease-in-out duration-700">
                                    <div className="w-[26px] h-[26px] text-[16px] text-gray-200 flex items-center justify-center">
                                        <MdSearch />
                                    </div>
                                </button>

                            </div>
                        </div>
                    </Mapa> :
                    <div className="w-full h-full flex items-center justify-center">
                        <div className=" md:w-[100px] md:h-[100px] w-[300px] h-[300px]"><Lottie
                            animationData={loadMap}
                            play={true}
                            loop={true}
                        /></div>
                        
                    </div>
            }

        </div>
    );
}

export default MapaContainer;