import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import loading from '../../../assets/lottie/loading.json'

const Infoall = ({ data }: any) => {


    const [isTotalDispositivo, setIsTotalDispositivo] = useState<number>(data.length);
    const [isVerde, setIsVerde] = useState<number>(0);
    const [isAmarelo, setIsAmarelo] = useState<number>(0);
    const [isLaranja, setIsLaranja] = useState<number>(0);
    const [isVermelho, setIsVermelho] = useState<number>(0);
    const [isRoxo, setIsRoxo] = useState<number>(0);

    function getColor(dataArray: any[]) {
        setIsTotalDispositivo(dataArray.length)
        const verdeArray = new Array();
        const amarelorray = new Array();
        const laranjarray = new Array();
        const vermelhorray = new Array();
        const roxorray = new Array();

        for (let index = 0; index < dataArray.length; index++) {
            const element = dataArray[index];
            if (element.dispositivo.waterLevel == "0000") {
                verdeArray.push(element.dispositivo)
            } else if (element.dispositivo.waterLevel == "1000") {
                amarelorray.push(element.dispositivo)
            } else if (element.dispositivo.waterLevel == "1100") {
                laranjarray.push(element.dispositivo)
            } else if (element.dispositivo.waterLevel == "1110") {
                vermelhorray.push(element.dispositivo)
            } else if (element.dispositivo.waterLevel == "1111") {
                roxorray.push(element.dispositivo)
            }

        }
        setIsVerde(verdeArray.length)
        setIsAmarelo(amarelorray.length)
        setIsLaranja(laranjarray.length)
        setIsVermelho(vermelhorray.length)
        setIsRoxo(roxorray.length)
    }







    useEffect(() => {
        if (data.length != 0) {
            getColor(data)
        }
    }, [data])

    return (

        <div className="min-w-[400px] md:w-full w-[30%] h-full p-8 text-gray-700 bg-white shadow-lg rounded-lg   ">
            {
               data.length == 0?
                    <div className="w-full h-[250px] flex items-center justify-center">
                        <div className='w-[80px] h-[80px]'>
                            <Lottie
                                animationData={loading}
                                play={true}
                                loop={true}

                            />
                        </div>
                    </div> :
                    <div className="block w-full h-full">
                        <div className="w-full">
                            <p className="mb-4 text-2xl font-light text-gray-700 dark:text-white">
                                Informação de Dispositivo por alerta em %
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <p>
                                    Nivel de 0cm a 19cm
                                </p>
                                <p>
                                    {`${isVerde / isTotalDispositivo * 100 + "%"}`}
                                </p>
                            </div>
                            <div className="w-full h-2 mb-4 bg-green-100 rounded-full">
                                <div style={{ width: isVerde / isTotalDispositivo * 100 + "%" }} className={" h-full text-xs text-center text-white bg-green-400 rounded-full"}>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <p>
                                    Nivel de 20cm a a 49cm
                                </p>
                                <p>
                                {`${isAmarelo/ isTotalDispositivo * 100 + "%"}`}
                                </p>
                            </div>
                            <div className="w-full h-2 mb-4 bg-yellow-100 rounded-full">
                                <div style={{ width: isAmarelo / isTotalDispositivo * 100 + "%" }} className=" h-full text-xs text-center text-white bg-[#FFC312] rounded-full">
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <p>
                                    Nivel de 50cm a 79cm
                                </p>
                                <p>
                                {`${isLaranja / isTotalDispositivo * 100 + "%"}`}
                                </p>
                            </div>
                            <div className="w-full h-2 mb-4 bg-orange-100 rounded-full">
                                <div style={{ width: isLaranja / isTotalDispositivo * 100 + "%" }} className=" h-full text-xs text-center text-white bg-[#F79F1F] rounded-full">
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <p>
                                    Nivel de 80cm a 109cm
                                </p>
                                <p>
                                {`${isVermelho / isTotalDispositivo * 100 + "%"}`}
                                </p>
                            </div>
                            <div className="w-full h-2 mb-4 bg-red-100 rounded-full">
                                <div style={{ width: isVermelho / isTotalDispositivo * 100 + "%" }} className=" h-full text-xs text-center text-white bg-[#EA2027] rounded-full">
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <p>
                                    Acima de 110cm
                                </p>
                                <p>
                                {`${isRoxo / isTotalDispositivo * 100 + "%"}`}
                                </p>
                            </div>
                            <div className="w-full h-2 bg-purple-100 rounded-full">
                                <div style={{ width: isRoxo / isTotalDispositivo * 100 + "%" }} className=" h-full text-xs text-center text-white bg-purple-800 rounded-full">
                                </div>
                            </div>
                        </div>
                    </div>

            }
        </div>

    );
}

export default Infoall;