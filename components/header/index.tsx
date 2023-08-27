import { FaBars } from "react-icons/fa";
import useMenu from "../menu/store/useMenu";
import { MdLogout, MdNotifications } from "react-icons/md";
import useLogin from "../login/state/useLogin";

const Header = () => {
    const actionMenu = useMenu((state: any) => state.action);
    const useLoginState = useLogin((state:any)=>state);


    return (
        <header className="flex items-center justify-between py-4 bg-white shadow-lg  rounded-lg">
            <div className="flex flex-row items-center justify-start w-[10%]">
                <button onClick={actionMenu} className="text-[20px] px-4">
                    <FaBars />
                </button>
            </div>

            <div className="flex flex-row w-[90%] items-center justify-end h-full  flex-center">
                {/* <button className=" w-[30px] h-[30px] flex items-center justify-center">
                    <div className="relative top-[-10px] left-[25px] w-[15px] h-[15px]  flex items-center justify-center rounded-full text-white bg-red-500">
                        <span className="p-1 text-[9px]">
                            0
                        </span>
                    </div>
                    <div className="text-[20px]">
                        <MdNotifications />
                    </div>
                </button> */}

            </div>
            <button onClick={()=>useLoginState.setIslogout()} className="text-[20px] px-4">
                < MdLogout />
            </button>


        </header >



    );
}

export default Header;