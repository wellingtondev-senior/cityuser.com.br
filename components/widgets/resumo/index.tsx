import { RiBattery2ChargeFill } from "react-icons/ri";
import { BiWifiOff } from "react-icons/bi";
import { Props } from "react-apexcharts";

const index = ({data}: any) => {
    return (

        <div className="relative w-full p-4 overflow-hidden ml-4 bg-blue-500 shadow-lg rounded-xl md:w-64 dark:bg-gray-800">
            <p className="mb-4 text-2xl font-light text-white">
                Desempenho
            </p>
            <div className="flex items-center justify-between my-4 text-blue-500 rounded">
                <button className=" w-full p-2 bg-white rounded-lg text-[25px]">
                    <RiBattery2ChargeFill />
                    <div className="flex flex-row items-start w-full ml-2 justify-evenly">
                        <p className="text-lg text-gray-700">
                            45%
                        </p>
                        <p className="text-sm text-blue-200">
                            Your growth
                        </p>
                    </div>
                </button>

            </div>
            <div className="flex items-center justify-between text-blue-500 rounded">
                <span className="p-2 bg-white rounded-lg">
                   <BiWifiOff/>
                </span>
                <div className="flex flex-col items-start w-full ml-2 justify-evenly">
                    <p className="text-lg text-white">
                        70%
                    </p>
                    <p className="text-sm text-blue-200">
                        Your delivery
                    </p>
                </div>
            </div>

        </div>

    );
}

export default index;