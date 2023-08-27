import { BsFillCpuFill } from "react-icons/bs";
import useAlertForm from "../../../alert/alertForm/store/useAlertForm";
import Acordion from "./acordion";
import { useWaterLevel } from "../store/useWaterLevel";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const open = 'flex flex-col fixed z-[99999] bg-white w-[580px] md:w-full h-full md:h-[40em] bottom-0 md:left-0 right-0 overflow-y-auto transition-1 ease-in-out duration-700';
const close = 'flex flex-col fixed z-[99999] bg-white w-[580px] md:w-full h-[50px] md:h-[50px] bottom-0 md:left-0 right-0 overflow-y-auto transition-1 ease-in-out duration-700'

const openIcon = "flex items-center justify-center text-[#fff] text-[19px] transition-1 ease-in-out duration-700";
const closeIcon = "flex items-center justify-center text-[#fff] text-[19px] rotate-180 transition-1 ease-in-out duration-700";
const PageSteps = ({ dispositivo }: any) => {
    const state = useAlertForm((state: any) => state);
    const stateWaterLevel = useWaterLevel((state: any) => state)
    const [upDown, setUpDown] = useState<boolean>(true);
    const loop =1



    function SelectCorDispositivo() {
        switch (dispositivo.waterLevel) {
            case '0000':
                return (
                    <span className="inline-flex items-center m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
                        <span className="ml-1">
                            Alerta Verde
                        </span>
                    </span>
                )
            case '1000':
                return (
                    <span className="inline-flex items-center m-2 px-3 py-1 bg-yellow-200 hover:bg-yellow-400 rounded-full text-sm font-semibold text-yellow-600 hover:text-yellow-800">
                    <span className="ml-1">
                      Alerta Amarelo
                    </span>
                  </span>
                )
            case '1100':
                return (
                    <span className="inline-flex items-center m-2 px-3 py-1 bg-yellow-200 hover:bg-yellow-400 rounded-full text-sm font-semibold text-yellow-600">
                    <span className="ml-1">
                      Alerta Laranja
                    </span>
                  </span>
                )
            case '1110':
                return (
                    <span className="inline-flex items-center m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                        <span className="ml-1">
                            Alerta Vermelho
                        </span>
                    </span>)
            case '1111':
                return (
                    <span className="inline-flex items-center m-2 px-3 py-1 bg-[#6657ac] hover:bg-[#3b2d79] rounded-full text-sm font-semibold text-[#d5ccff]">
                    <span className="ml-1">
                      Alerta Roxo
                    </span>
                  </span>
                )
            default:
                return (<span className='text-[#000] font-bold'>ALERTA DESCONHECIDO</span>)
        }
    }

   


    

    return (
        <div className={upDown ? open : close}>
            <div className='fixed w-[580px] md:w-full h-[50px] bg-[#1e90ff] p-2  flex items-center justify-between'>
                <span className='text-white font-bold text-[14px]'>Indentificando o Dispositivo</span>
                <button onClick={()=>setUpDown(!upDown)} className='w-[40px] h-[40px]  rounded-lg  '>
                    <div className={upDown ? openIcon : closeIcon}><FaChevronDown /></div>
                </button>
            </div>
            <div className='w-full h-auto p-2 pt-16'>
                <div className='w-full p-2  bg-white rounded-lg shadow-lg flex items-center'>
                    <div className=' text-[15px] flex  items-center  px-4'>
                        {/* <BsFillCpuFill />  */}
                        <span> Id:</span>
                    </div>
                    <span className='text-[18px] font-bold px-4'>{dispositivo.dispositivoId} </span>
                    <SelectCorDispositivo />
                </div>
                <Acordion dataDispositivo={dispositivo} />
            </div>





            <button onClick={() => state.actionOpen('teste alert')}>
                open
            </button>

        </div>

    );
}

export default PageSteps;