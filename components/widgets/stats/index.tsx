import { useEffect, useState } from "react";
import { BsFillFileXFill, BsFillGeoAltFill } from "react-icons/bs";
import { MdOutlineNearbyError } from "react-icons/md";
import { RiBatteryChargeLine } from "react-icons/ri";
import { SlCursor } from "react-icons/sl";
import useStats from "./state/useStats";
import { formToJSON } from "axios";

interface StatsType {
    data: []
}

const Stats = ({ data }: StatsType) => {

    const [isTotalActive, setIsTotalActive] = useState<number>(0);
    const [isTotalDesactive, setIsTotalDesactive] = useState<number>(0);
    const [isTotalNoIdentificado, setIsTotalNoIdentificado] = useState<number>(0);
    const [isTotalBateria, setIsTotalBateria] = useState<number>(0);

    const setDispositivoAtivo = (dataArr: []) => {
        const dispositivoAtivoArray = [];
        for (let i = 0; i < dataArr.length; i++) {
            const element: any = dataArr[i];
            if (element.indentidade.length > 0 && element.indentidade[0].active) {
                dispositivoAtivoArray.push(element.indentidade)
            }
        }
        setIsTotalActive(dispositivoAtivoArray.length);
    }

    const setDispositivoDefeito = (dataArr: []) => {
        const dispositivoDefeitoArray = [];
        const waterlevelArray = ["0000", "1000", "1100", "1110", "1111"];

        for (let i = 0; i < dataArr.length; i++) {
            const element: any = dataArr[i];
            if (!waterlevelArray.includes(element.dispositivo.waterLevel)) {
                dispositivoDefeitoArray.push(element)
            }


        }
        setIsTotalDesactive(dispositivoDefeitoArray.length);
    }

    const setDispositivoNoIdentificado = (dataArr: []) => {

        setIsTotalNoIdentificado(dataArr.length - isTotalActive);
    }


    const setDispositivoBateriaBaixa = (dataArr: []) => {
        const dispositivoArray = [];

        for (let i = 0; i < dataArr.length; i++) {
            const element: any = dataArr[i];
            const bateria = parseInt(element.dispositivo.batteryLevel)
            if (bateria < 30) {
                dispositivoArray.push(element)
            }


        }
        setIsTotalBateria(dispositivoArray.length);
    }

    useEffect(() => {
        if (data.length > 0) {
            setDispositivoAtivo(data)
            setDispositivoDefeito(data)
            setDispositivoNoIdentificado(data);
            setDispositivoBateriaBaixa(data);
        }
    }, [data])







    return (
        <section className="px-4 w-full text-gray-100">
            <div className="container grid grid-cols-1 gap-6  mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
                <div className="flex overflow-hidden rounded-lg bg-white text-gray-800">
                    <div className="flex items-center justify-center px-4 bg-blue-400 text-gray-800 text-[25px]">
                        <BsFillGeoAltFill />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <div className="text-2xl font-semibold">
                            {
                                data.length == 0 ?
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-gray-700"></div> :
                                    isTotalActive
                            }
                        </div>
                        <p className="font-bold">DISPOSITIVOS ATIVOS</p>
                    </div>
                </div>
                <div className="flex overflow-hidden rounded-lg bg-white text-gray-800">
                    <div className="flex items-center justify-center px-4 bg-blue-400 text-gray-800 text-[25px]">
                        <MdOutlineNearbyError />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <div className="text-2xl font-semibold">
                            {
                                data.length == 0 ?
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-gray-700"></div> :
                                    isTotalDesactive
                            }
                        </div>
                        <p className="font-bold">DISPOSITIVOS COM DEFEITOS</p>
                    </div>
                </div>
                <div className="flex overflow-hidden rounded-lg bg-white text-gray-800">
                    <div className="flex items-center justify-center px-4 bg-blue-400 text-gray-800 text-[25px]">
                        <BsFillFileXFill />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <div className="text-2xl font-semibold">
                            {
                                data.length == 0 ?
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-gray-700"></div> :
                                    isTotalNoIdentificado
                            }
                        </div>
                        <p className="font-bold">DISPOSITIVOS NÃO CADASTRADOS</p>
                    </div>
                </div>
                <div className="flex overflow-hidden rounded-lg bg-white text-gray-800">
                    <div className="flex items-center justify-center px-4 bg-blue-400 text-gray-800 text-[25px]">
                        <RiBatteryChargeLine />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <div className="text-2xl font-semibold">
                            {
                                data.length == 0 ?
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-gray-700"></div> :
                                    isTotalBateria
                            }
                        </div>
                        <p className="font-bold">DISPOSITIVOS COM BATERIA ABAIXO DE 30%</p>
                    </div>
                </div>




            </div>
        </section>
    );
}

export default Stats;