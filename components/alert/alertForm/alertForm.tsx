import { BsFillPatchExclamationFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import useAlertForm from "./store/useAlertForm";
import { useEffect } from "react";

const open = "z-[999999999999] w-full fixed top-0 lef-0 right-0 z-[999999] transition-1 ease-in-out duration-700";
const close = "z-[99999999999] w-full fixed top-[-100px] lef-0 right-0 z-[999999] transition-1 ease-in-out duration-700";

interface AlertFormType {
    visible: boolean,
    title: string
}


const AlertForm = ({ visible, title }: AlertFormType) => {

    const useAlertFormState = useAlertForm((state: any) => state);



    
    return (
        <article className={visible ? open : close}>
            <div className="w-full  bg-pink-600  p-2">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center flex-1 w-0">
                        <span className="flex p-2 bg-pink-800 rounded-lg text-white">
                            <BsFillPatchExclamationFill />
                        </span>
                        <p className="ml-3 font-medium text-white truncate">
                            <span className="md:hidden">
                                {title}
                            </span>

                        </p>
                    </div>

                    <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
                        <button onClick={()=>useAlertFormState.actionClose()} type="button" className="flex p-2 -mr-1 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                            <span className="text-[25px] text-white"><IoClose /></span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default AlertForm;