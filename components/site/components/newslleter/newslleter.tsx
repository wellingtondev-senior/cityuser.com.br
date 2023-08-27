import { RiCloseCircleLine } from "react-icons/ri";
import useNewslleterState from "./state/useNewslleterState";
import { IoClose } from "react-icons/io5";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { useEffect, useRef, useState } from "react";
import { create } from "./http/createWhatsapp";
import { findWhatsapp } from "./http/findWhatsapp";
import ModalWindow from "../../../modal";
import { useRouter } from "next/router";


const open = "relative  md:bottom-0  left-0 md:w-full w-[400px] md:h-auto h-full bg-white flex flex-col items-center justify-start shadow-lg transition-1 ease-in-out duration-700 drop-shadow-2xl"
const close = "relative md:bottom-[-650px]  left-[-450px] md:left-0 md:w-full w-[400px] md:h-[600px] h-full bg-white flex flex-col items-center justify-start shadow-lg transition-1 ease-in-out duration-700 drop-shadow-2xl"

const NewslleterWindow = ({ data }: any) => {
    const router = useRouter();

    const [formattedValue, setFormattedValue] = useState('');
    const useNewslleterStates = useNewslleterState((state: any) => state);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
   
    const newslletterSubmit = async (opcao:string) => {
        switch (opcao) {
            case "telegram":
                router.push('/config', `send?app=telegram&id=${useNewslleterStates.identificadorId}`)
                break;
        
            case "whatsapp":
                router.push('/config', `send?app=whatsapp&id=${useNewslleterStates.identificadorId}`)
                break;
        }
        // setIsLoading(true)
        // try {
        //     if (formattedValue.length < 11) {
        //         setIsLoading(false)
        //         alert("O campo precisa ser preenchido corretamente");
        //     } else {
        //         const findWhatsappData = await findWhatsapp(formattedValue, useNewslleterStates.identificadorId);
        //         if(findWhatsappData.length > 0){            
        //             setIsLoading(false)
        //             alert("Você ja estar acompanhado esse ponto no mapa");

        //         }else{
                    
        //         const whatsappObj = {
        //             indentificadordispositivoId: useNewslleterStates.identificadorId,
        //             whatsapp: formattedValue,
        //             cidade: "null",
        //             uf: "null"
        //         }
        //         await create(whatsappObj);
        //         setIsLoading(false)
        //         alert("Pronto, Agora você recebera uma mensagem de confirmação em seu whatsapp");
        //         setFormattedValue("");
                
        //         useNewslleterStates.setActiveWindow(false);
        //         }
        //     }
        // } catch (error: any) {
        //     setIsLoading(false)
        //     console.log(error.message)
        // }
    };

    const AlertImagem = ()=>{
        switch (useNewslleterStates.waterLevel) {
            case "0000":
                return ( 
                <button style={{
                    backgroundImage: "url('/assets/verde.jpeg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
    
                }} className="w-[400px] h-full">
    
                </button>
                )
            case "1000":
               return ( 
                <button style={{
                    backgroundImage: "url('/assets/amarelo.jpeg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
    
                }} className="w-[400px] h-full">
    
                </button>
                )
            case "1100":
                return ( 
                    <button style={{
                        backgroundImage: "url('/assets/laranja.jpeg')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain"
        
                    }} className="w-[400px] h-full">
        
                    </button>
                    )
            case "1110":
                return ( 
                    <button style={{
                        backgroundImage: "url('/assets/vermelho.jpeg')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain"
        
                    }} className="w-[400px] h-full">
        
                    </button>
                    )
            case "1111":
                return ( 
                    <button style={{
                        backgroundImage: "url('/assets/roxo.jpeg')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain"
        
                    }} className="w-[400px] h-full">
        
                    </button>
                    )
            default:
                return ( 
                    <button style={{
                        backgroundImage: "url('/assets/defeito.svg')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain"
        
                    }} className="w-[400px] h-full">
        
                    </button>
                    )

        }
    }


    const AlertColor = () => {
        switch (useNewslleterStates.waterLevel) {
            case "0000":
                return (
                    <div className=" flex flex-col items-center justify-between p-2 leading-normal text-verde-segundary bg-green-100 rounded-lg" role="alert">
                        <div className="w-full flex flex-row items-center justify-between">
                            <p>Esse ponto estar em
                                <span className="font-bold"> Alerta Verde</span>
                            </p>
                            <button onClick={() => useNewslleterStates.setActiveWindow(false)} className="w-[30px] h-[30px] text-[20px] p-2 flex justify-center items-center  bg-verde-primary hover:bg-verde-segundary focus:ring-verde-segundary focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center  font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                <IoClose />
                            </button>
                        </div>
                        <span className="mt-2 font-bold">
                            Essa cor representa o nivel atual de água no local indicado.
                            No momeno estar  abaixo de 19cm
                        </span>

                    </div>
                )
            case "1000":
                return (
                    <div className=" flex flex-col items-center justify-between p-2 leading-normal text-amarelo-segundary bg-yellow-100 rounded-lg" role="alert">
                        <div className="w-full flex flex-row items-center justify-between">
                            <p>Esse ponto estar em
                                <span className="font-bold"> Alerta Amarelo</span>
                            </p>
                            <button onClick={() => useNewslleterStates.setActiveWindow(false)} className="w-[30px] h-[30px] text-[20px] p-2 flex justify-center items-center  bg-amarelo-primary hover:bg-amarelo-segundary focus:ring-verde-segundary focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center  font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                <IoClose />
                            </button>
                        </div>
                        <span>
                            Essa cor representa o nivel atual de água no local indicado.
                            No momeno estar  acima de 19cm e abaixo de 49cm
                        </span>

                    </div>
                )
            case "1100":
                return (
                    <div className=" flex flex-col items-center justify-between p-2 leading-normal text-laranja-segundary bg-orange-100 rounded-lg" role="alert">
                        <div className="w-full flex flex-row items-center justify-between">
                            <p>Esse ponto estar em
                                <span className="font-bold"> Alerta Laranja</span>
                            </p>
                            <button onClick={() => useNewslleterStates.setActiveWindow(false)} className="w-[30px] h-[30px] text-[20px] p-2 flex justify-center items-center  bg-laranja-primary hover:bg-laranja-segundary focus:ring-laranja-segundary focus:ring-offset-orange-200 text-white transition ease-in duration-200 text-center  font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                <IoClose />
                            </button>
                        </div>
                        <span className="mt-2 font-bold">
                            Essa cor representa o nivel atual de água no local indicado.
                            No momeno estar  acima de 49cm e abaixo de 79cm
                        </span>

                    </div>
                )
            case "1110":
                return (
                    <div className=" flex flex-col items-center justify-between p-2 leading-normal text-vermelho-segundary bg-red-100 rounded-lg" role="alert">
                        <div className="w-full flex flex-row items-center justify-between">
                            <p>Esse ponto estar em
                                <span className="font-bold"> Alerta Vermelho</span>
                            </p>
                            <button onClick={() => useNewslleterStates.setActiveWindow(false)} className="w-[30px] h-[30px] text-[20px] p-2 flex justify-center items-center  bg-vermelho-primary hover:bg-vermelho-segundary focus:ring-vermelho-segundary focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center  font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                <IoClose />
                            </button>
                        </div>
                        <span className="mt-2 font-bold">
                            Essa cor representa o nivel atual de água no local indicado.
                            No momeno estar acima de 79cm e abaixo de 99cm
                        </span>

                    </div>
                )
            case "1111":
                return (
                    <div className=" flex flex-col items-center justify-between p-2 leading-normal text-roxo-segundary bg-purple-100 rounded-lg" role="alert">
                        <div className="w-full flex flex-row items-center justify-between">
                            <p>Esse ponto estar em
                                <span className="font-bold"> Alerta Roxo</span>
                            </p>
                            <button onClick={() => useNewslleterStates.setActiveWindow(false)} className="w-[30px] h-[30px] text-[20px] p-2 flex justify-center items-center  bg-roxo-primary hover:bg-roxo-segundary focus:ring-roxo-segundary focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center  font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                <IoClose />
                            </button>
                        </div>
                        <span className="mt-2 font-bold">
                            Essa cor representa o nivel atual de água no local indicado.
                            No momeno estar acima de 99cm 
                        </span>

                    </div>
                )
                default:
                    return (
                        <div className=" flex flex-col items-center justify-between p-2 leading-normal text-gray-600 bg-gray-100 rounded-lg" role="alert">
                            <div className="w-full flex flex-row items-center justify-between">
                                <p>Esse ponto estar em
                                    <span className="font-bold"> Alerta DESCONHECIDO</span>
                                </p>
                                <button onClick={() => useNewslleterStates.setActiveWindow(false)} className="w-[30px] h-[30px] text-[20px] p-2 flex justify-center items-center  bg-gray-600 hover:bg-gray-800 focus:ring-gray-700 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center  font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    <IoClose />
                                </button>
                            </div>
                            <span className="mt-2 font-bold">
                                Essa cor representa o nivel atual de água no local indicado.
                                No momeno estamos fazendo manutenção nesse ponto
                            </span>
    
                        </div>
                    )

        }
    }


    const ButtonEnviar = () => {

        switch (useNewslleterStates.waterLevel) {
            case "0000":
                return (<>
                    {/* <button onClick={()=>newslletterSubmit('whatsapp')} type="button" className="w-full h-[40px] flex justify-center items-center  bg-verde-primary hover:bg-verde-segundary focus:ring-verde-primary focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                        {
                      isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                      <>
                     <FaWhatsapp/>
                        <span className="mx-2">Whatsapp</span>
                      </>
                    }
                    </button> */}
                     <button onClick={()=>newslletterSubmit("telegram")} type="button" className="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                   isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                   <>
                  <FaTelegramPlane/>
                     <span className="mx-2">Telegram</span>
                   </>
                 }
                 </button>
                </>)
            case "1000":
                return (<>
                    {/* <button onClick={()=>newslletterSubmit("whatsapp")} type="button" className="mt-2 py-2 px-4 flex justify-center items-center  bg-amarelo-primary hover:bg-amarelo-segundary focus:ring-amarelo-segundary focus:ring-offset-yellow-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                      isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                      <>
                     <FaWhatsapp/>
                        <span className="mx-2">Whatsapp</span>
                      </>
                    }
                    </button> */}
                     <button onClick={()=>newslletterSubmit("telegram")} type="button" className="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                   isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                   <>
                  <FaTelegramPlane/>
                     <span className="mx-2">Telegram</span>
                   </>
                 }
                 </button>
                </>)
            case "1100":
                return (<>
                    {/* <button onClick={()=>newslletterSubmit("whatapp")} type="button" className="mt-2 py-2 px-4 flex justify-center items-center  bg-laranja-primary hover:bg-laranja-segundary focus:ring-laranja-primary focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                       {
                      isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                      <>
                     <FaWhatsapp/>
                        <span className="mx-2">Whatsapp</span>
                      </>
                    }
                    </button> */}
                     <button onClick={()=>newslletterSubmit("telegram")} type="button" className="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                   isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                   <>
                  <FaTelegramPlane/>
                     <span className="mx-2">Telegram</span>
                   </>
                 }
                 </button>
                </>)
            case "1110":
                return (<>
                    {/* <button onClick={()=>newslletterSubmit("whatsapp")} type="button" className="mt-2 py-2 px-4 flex justify-center items-center  bg-vermelho-primary hover:bg-vermelho-segundary focus:ring-vermelho-primary focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                       {
                      isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                      <>
                     <FaWhatsapp/>
                        <span className="mx-2">Whatsapp</span>
                      </>
                    }
                    </button> */}
                     <button onClick={()=>newslletterSubmit("telegram")} type="button" className="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                   isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                   <>
                  <FaTelegramPlane/>
                     <span className="mx-2">Telegram</span>
                   </>
                 }
                 </button>
                </>)
            case "1111":
                return (<>
                    {/* <button onClick={()=>newslletterSubmit("whatsapp")} type="button" className="mt-2 py-2 px-4 flex justify-center items-center  bg-roxo-primary hover:bg-roxo-segundary focus:ring-roxo-primary focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                      {
                      isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                      <>
                     <FaWhatsapp/>
                        <span className="mx-2">Whatsapp</span>
                      </>
                    }
                    </button> */}
                     <button onClick={()=>newslletterSubmit("telegram")} type="button" className="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                   isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                   <>
                  <FaTelegramPlane/>
                     <span className="mx-2">Telegram</span>
                   </>
                 }
                 </button>
                </>)
            default:
                return (<>  
                {/* <button onClick={()=>newslletterSubmit("whatsapp")} type="button" className="mt-2 py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-800 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                       {
                      isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                      <>
                     <FaWhatsapp/>
                        <span className="mx-2">Whatsapp</span>
                      </>
                    }
                    </button> */}
                     <button onClick={()=>newslletterSubmit("telegram")} type="button" className="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                     {
                   isLoading ?<div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-violet-50"></div>:
                   <>
                  <FaTelegramPlane/>
                     <span className="mx-2">Telegram</span>
                   </>
                 }
                 </button>
                </>)

        }
    }

    return (
        <div className={useNewslleterStates.activeWindow ? open : close}>
            <div className="w-full p-4">
                <AlertColor />
            </div>
            <div className="py-2 px-5 w-full">
                <span className="text-[18px] font-bold">Receba alertas em tempo real pelo  Telegram.</span><br />
                <span className="text-[12px] font-normal">Temos o nosso Bot de alertas de enchente.</span>
            </div>
            <div className="w-full px-5 py-2">

                {/* <div className="h-[40px] border border-1 shadow-lg rounded-lg mt-2 flex items-center justify-between">
                    <div className="w-[40px] h-[40px] flex items-center justify-center text-green-700 text-[20px] font-bold">
                        <FaWhatsapp />
                    </div>
                    <PatternFormat
                        value={formattedValue}
                        displayType={'input'}
                        onValueChange={(e) => setFormattedValue(e.value)}
                        customInput={InputComponent}
                        format="(##) ##### ####"
                        className="h-[38px] w-full outline-none mr-2 text-lg"
                        allowEmptyFormatting mask="_"
                    />;
                </div> */}
                <ButtonEnviar />
            </div>
         <AlertImagem/>
        
        </div>
    );
}

const InputComponent = (props: any) => {
    return <input {...props} />;
};

export default NewslleterWindow;