import { BsFillGeoAltFill } from "react-icons/bs";
import { FaRegHandPointer, FaWhatsapp } from "react-icons/fa";
import { FiZoomIn } from "react-icons/fi";
import Stats from "./stats";

const ComoFunciona = () => {
    return (
        <section id="como-funciona" className="dark:bg-gray-800 dark:text-gray-100 w-full h-full">
            
            <div className="w-full container mx-auto flex flex-col p-6">
                <div className="w-full flex items-center justify-center">
                    <h2 className="pb-10 md:text-[30px] text-[50px] font-bold">Como Funciona ?</h2>

                </div>
                <div className="w-full divide divide-gray-700">
                    <div className="mt-6 flex md:flex-col items-center justify-start">
                        <div className="flex items-center justify-center lg:col-span-1 col-span-full text-[80px]">
                            <FiZoomIn />
                        </div>
                        <div className="w-full flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracki uppercase dark:text-violet-400">Etapa 1 - Amplie o Zoom</span>
                            <span className="text-xl font-bold md:text-2xl">Amplie o Zoom</span>
                            <span className="mt-4 py-6 dark:text-gray-300">Certifique-se de que o nível de zoom esteja definido acima de 12 para obter uma visualização mais detalhada do mapa.</span>
                        </div>
                    </div>
                </div>
                <div className="w-full divide divide-gray-700">
                    <div className="mt-6 flex md:flex-col items-center justify-start">
                        <div className="flex items-center justify-center lg:col-span-1 col-span-full text-[80px]">
                            <FaRegHandPointer />
                        </div>
                        <div className="w-full flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracki uppercase dark:text-violet-400">Etapa 2 - Navegue pelo Mapa</span>
                            <span className="text-xl font-bold md:text-2xl">Navegue pelo Mapa</span>
                            <span className="mt-4 py-6 dark:text-gray-300">Arraste e mova o mapa para encontrar a área desejada. Use os controles de zoom ou a roda do mouse para ajustar o zoom com precisão.</span>
                        </div>
                    </div>
                </div>
                <div className="w-full divide divide-gray-700">
                    <div className="mt-6 flex md:flex-col items-center justify-start">
                        <div className="flex items-center justify-center lg:col-span-1 col-span-full text-[80px]">
                            <BsFillGeoAltFill />
                        </div>
                        <div className="w-full flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracki uppercase dark:text-violet-400">Etapa 3 - Encontre o Local</span>
                            <span className="text-xl font-bold md:text-2xl">Encontre o Local</span>
                            <span className="mt-4 py-6 dark:text-gray-300">Localize o ponto exato onde deseja selecionar clicando e movendo o cursor para a área desejada.</span>
                        </div>
                    </div>
                </div>
                <div className="w-full divide divide-gray-700">
                    <div className="mt-6 flex md:flex-col items-center justify-start">
                        <div className="flex items-center justify-center lg:col-span-1 col-span-full text-[80px]">
                            <FaWhatsapp />
                        </div>
                        <div className="w-full flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracki uppercase dark:text-violet-400">Etapa 4 - Marque o Local</span>
                            <span className="text-xl font-bold md:text-2xl">Marque o Local</span>
                            <span className="mt-4 py-6 dark:text-gray-300">Uma vez que você tenha encontrado o local desejado, clique no ícone de marcador (marker) no mapa. Isso abrirá a janela lateral com informações de enchente desse local e poderar companhar com seu whatsapp.</span>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}

export default ComoFunciona;