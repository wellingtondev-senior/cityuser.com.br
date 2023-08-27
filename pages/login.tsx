import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Lottie from 'react-lottie-player'
import authAnimation from '../assets/lottie/auth.json'
import AlertForm from '../components/alert/alertForm/alertForm'
import useAlertForm from '../components/alert/alertForm/store/useAlertForm'
import Link from 'next/link'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { FaLock, FaSignInAlt } from 'react-icons/fa';
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import auth from '../components/login/http/auth'
import { useState } from 'react'
import { on } from 'events'
import AlertFormSuccess from '../components/alert/alertForm/AlertFormSuccess'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import useLogin from '../components/login/state/useLogin'


export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useAlertFormState = useAlertForm((state: any) => state);
  const useLoginState = useLogin((state:any)=>state);
  const [cookies, setCookies, removeCookie] = useCookies(['token'])
  const { watch, control, register, handleSubmit, formState: { errors }, reset } = useForm();

  async function submitForm(dataForm: any) {
    setIsLoading(true)
    try {
      const data = await auth(dataForm.email, dataForm.password);
      setCookies('token', JSON.stringify(data))
      useAlertFormState.actionOpenSuccess("SUCCESS: Aguarde estamos fazendo o redirecionando...");
      setIsLoading(false)
     
      setTimeout(() => { 
        useLoginState.setIsLoggin();
        window.location.href ="/dispositivos"
      }, 3000)

    } catch (error: any) {
      setIsLoading(false)
      const ob = error.toJSON();
      if (ob.status == 403) {
        useAlertFormState.actionOpen("ERROR: email ou password estão incorreto", "#DB2777");
      } else if (ob.config.timeout >= 8000) {
        useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente.", "#DB2777");

      }

    }

  }



  return (
    <div className="bg-[#00A699] relative md:h-screen" style={{
      backgroundImage: "url('/assets/textura/liquid-cheese.svg')",
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      backgroundSize: "cover"

    }}>
      <AlertForm visible={useAlertFormState.stateVisible} title={useAlertFormState.stateTitulo} />
      <AlertFormSuccess visible={useAlertFormState.stateVisibleSuccess} title={useAlertFormState.stateTitulo} />

      <div className="w-full h-full">
        <div className="flex  md:text-left flex-row h-full md:justify-center justify-between md:items-start items-center w-full">
          <div className="flex flex-col items-center justify-between w-full h-screen bg-white md:hidden">
            <div>

            </div>
            <div className=" md:hidden  w-[400px] h-[400px]">
              <Lottie
                animationData={authAnimation}
                play={true}
                loop={true}
              />
            </div>
            <div>
              <p className='font-semibold text-[10px] py-4'>Copyright © 2023 - All right reserved by cityuser.com.br</p>
            </div>
          </div>
          <div className="w-full   md:px-0 ">
            <div className='w-full flex items-center  justify-center py-4 md:mt-10 md:mb-16'>
              <div className="w-[180px] md:w-[200px] h-[70px] md:h-[40px]" style={{
                backgroundImage: "url('/assets/logo.png')",
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain"

              }} />
            </div>
            <div className="bg-white p-10 flex flex-col w-[80%] mx-auto shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                Painel de Controle
              </h2>
              <form onSubmit={handleSubmit(submitForm)} className="w-full" >
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="username" className="text-gray-500 mb-2 text-left w-full">Username</label>
                  <input
                    placeholder="email@email.com"
                    type="email"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    {...register("email", { required: true, maxLength: 30 })}
                  />
                  {errors.email && <span className='text-[11px] text-red-600 py-2'>Campo email é obrigatório</span>}
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2 text-left w-full">Password</label>
                  <input
                    placeholder="*********"
                    type="password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                  />
                  {errors.password && <span className='text-[11px] text-red-600 py-2'>Minimo de 6 caracteres</span>}
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type="submit"
                    className=" btn w-full  border-[#C1FF72] bg-[#C1FF72] rounded-lg text-[#4f6e26] hover:text-[#c6f090]">

                    {
                      isLoading ? 
                      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-violet-50"></div> : 
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <FaSignInAlt />
                        </div>
                        <div className="font-bold">ENTRAR</div>
                      </div>
                    }
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
