import { FaMapMarkerAlt } from "react-icons/fa";

const Stats = () => {
    return (
        <section className="flex flex-col items-center justify-center max-md:my-0  mt-10 w-full ">
            <div className="w-[90%] md:w-full flex md:flex-col flex-row items-center justify-center">
                <div className="w-[50%] md:w-full flex p-4 space-x-4 rounded-lg md:space-x-6 ">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-green-200 text-[30px] text-verde-primary">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-2xl font-semibold leadi text-verde-segundary">ALERTA VERDE</p>
                        <p className="text-semibold text-sm"> Esse alerta começa com essa cor, estar indicando que a área não está sofrendo com enchentes no momento.</p>
                    </div>
                </div>
                <div className="w-[50%] md:w-full flex p-4 space-x-4 rounded-lg md:space-x-6">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-yellow-200 text-[30px] text-amarelo-segundary">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-2xl font-semibold leadi text-amarelo-segundary">ALERTA AMARELO</p>
                        <p className="text-semibold text-sm"> Esse alerta com essa cor estar indicando que a área estar começando a subir o nivel de agua e que no momento estar acima de 19cm.</p>
                    </div>
                </div>
                <div className="w-[50%] md:w-full flex p-4 space-x-4 rounded-lg md:space-x-6">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-orange-200 text-[30px] text-laranja-primary">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-2xl font-semibold leadi text-laranja-segundary">ALERTA LARANJA</p>
                        <p className="text-semibold text-sm"> Esse alerta com essa cor estar indicando que a área estar em nivel critico e estar acima de  39cm.</p>
                    </div>
                </div>
               
            </div>
            <div className="w-[90%] md:w-full flex md:flex-col flex-row items-center justify-center">
                <div className="w-[50%] md:w-full flex p-4 space-x-4 rounded-lg md:space-x-6 ">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-red-200 text-[30px] text-vermelho-primary">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-2xl font-semibold leadi text-vermelho-segundary">ALERTA VERMELHO</p>
                        <p className="text-semibold text-sm"> Esse alerta, com essa cor, está indicando que esse ponto precisa ser evitado, pois o nível de água está acima de 59 cm.</p>
                    </div>
                </div> 
                 <div className="w-[50%] md:w-full flex p-4 space-x-4 rounded-lg md:space-x-6 ">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-purple-200 text-[30px] text-roxo-primary">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-2xl font-semibold leadi text-roxo-segundary">ALERTA ROXO</p>
                        <p className="text-semibold text-sm"> Esse alerta começa com essa cor, indicando que a área está sofrendo enchente, pois o nível de água está acima de 99 cm.</p>
                    </div>
                </div>
                <div className="w-[50%] md:w-full flex p-4 space-x-4 rounded-lg md:space-x-6 ">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-gray-200 text-[30px] text-gray-800">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-2xl font-semibold leadi text-gray-800">ALERTA DESCONHECIDO </p>
                        <p className="text-semibold text-sm"> Esse alerta indica que o local estar passando por manutenção no momento.</p>
                    </div>
                </div>
              
               
            </div>

        </section>
    );
}

export default Stats;