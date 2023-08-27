import { IoLogOut } from "react-icons/io5";
import { BsFillPieChartFill } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import useMenu from "./store/useMenu";
import { useEffect } from "react";
import Link from "next/link";
import useLogin from "../login/state/useLogin";


const openMenu = ' bg-[rgb(197,217,236)] w-[300px] md:w-[17em] h-full fixed  left-0 transition-1 ease-in-out duration-700';
const closeMenu = 'bg-[rgb(197,217,236)] w-[300px] md:w-[17em] h-full fixed   left-[-300px] md:left-[-17em] transition-1 ease-in-out duration-700';

type MenuProps = {
    token:string
}


const Menu = ({token}:MenuProps) => {
    const stateMenu = useMenu((state: any) => state.stateMenu);
    const useLoginState = useLogin((state:any)=>state);
    const user = JSON.parse(token);

    useEffect(()=>{
      console.log(stateMenu)
    },[stateMenu])

    return (
        <div className={stateMenu ? openMenu : closeMenu}>
            <div className=" w-full flex items-center justify-center mt-4">
                <div className="flex items-center justify-between w-[90%] p-2 bg-white shadow-lg rounded-lg">
                    <div className="bg-[#2c3e50] border-4 border-[#34495e] w-[40px] h-[40px] flex items-center justify-center rounded-full ">
                        <span className="font-bold text-white">W</span>
                    </div>
                    <div className="w-3/6">
                        <p className="text-sm text-gray-500 font-bold">
                            {
                                user.nome ? user.nome : "Master"
                            }
                            
                          
                        </p>
                        <p>
                            {user.email}
                        </p>
                    </div>
                    <button onClick={()=>useLoginState.setIslogout()} className="w-[40px] text-right text-[25px] ">
                        <IoLogOut/>
                    </button>
                </div>
            </div>



            <aside className="w-full" aria-label="Sidebar">
                <div className="px-3 py-4 overflow-y-auto rounded bg-[rgb(197,217,236)] dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/dispositivos"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MdDashboardCustomize/>
                                <span className="ml-3">Dispositivos</span>
                            </Link>
                        </li>
                        {/* <li>
                            <a href="#" target="_blank"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <BsFillPieChartFill/>
                                <span className="flex-1 ml-3 whitespace-nowrap">Dispositivos</span>
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </a>
                        </li> */}

                        {/* <li>
                            <a href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <FaUsers/>
                                <span className="flex-1 ml-3 whitespace-nowrap">Consumer</span>
                            </a>
                        </li> */}
                        <li>
                            <Link href="/dispositivos/conta"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                               <HiBellAlert/>
                                <span className="flex-1 ml-3 whitespace-nowrap">Conta ADM</span>
                            </Link>
                        </li>

                    
                    </ul>
                </div>
            </aside>


        </div>
    );
}

export default Menu;