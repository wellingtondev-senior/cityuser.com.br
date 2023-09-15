import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Footer from '../components/site/components/footer/footer'
import ComoFunciona from '../components/site/components/comoFunciona/comoFunciona'
import Hero from '../components/site/components/hero/hero'
import useAlertForm from '../components/alert/alertForm/store/useAlertForm'
import getAllDispositivos from '../components/site/http/getAllDispositivo'
import Stats from '../components/site/components/comoFunciona/stats'


export default function Home() {

  const [isEventData, setIsEventData] = useState<[]>([]);
  const useAlertFormState = useAlertForm((state: any) => state);
  const url = process.env.NEXT_PUBLIC_URLAPI ? process.env.NEXT_PUBLIC_URLAPI :  '';

  async function getDispositivos(){
   try {
    const data = await getAllDispositivos();
    setIsEventData(data)
   } catch (error:any) {
    
      const ob = error.toJSON();
      if (ob.status == 403) {
        useAlertFormState.actionOpen("ERROR: session expired", "#DB2777");
      } else if (ob.config.timeout >= 8000) {
        useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente em alguns instantes", "#DB2777");

      }

   }
  }

    useEffect(() => {
      getDispositivos();
        const socket = io(url, { transports: ['websocket'] });
        // socket.connect();
        socket.on('connect', () => {
            console.log('Conectado ao servidor WebSocket');
        });
        socket.on('list-dispositivos', (message: any) => {
          console.log(message)
            setIsEventData(message)
        });

    }, [url]);


  return (
    <section className='w-full h-full flex flex-col justify-center items-center'>
      <Hero data={isEventData}/>
      <Stats/>
      <ComoFunciona/>
      <Footer/>
    </section>
  )
}
