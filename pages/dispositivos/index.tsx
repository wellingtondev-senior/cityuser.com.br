import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Menu from '../../components/menu';
import Infoall from '../../components/widgets/infoAll'
import Resumo from '../../components/widgets/resumo';
import { IoAddCircleSharp, IoEye } from 'react-icons/io5';
import io from 'socket.io-client';
import ModalWindow from '../../components/modal';
import useMenu from '../../components/menu/store/useMenu';
import Indentificador from '../../components/form/indentificador';
import Lottie from 'react-lottie-player'
import loading from '../../assets/lottie/loading.json'
import Stats from '../../components/widgets/stats';
import Weather from '../../components/widgets/weather';
import { connect, ConsumeMessage } from 'amqplib';
import useSocket from '../../hook/useSocket';
import { FaFilter } from 'react-icons/fa';
import { useAdreessClick } from '../../components/form/indentificador/store/useAdreess.store';
import { useWaterLevel } from '../../components/form/indentificador/store/useWaterLevel';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookie } from '../../utils/cookies';
import { isTokenExpireVerefic } from '../../utils/tokenExpire';
import { MdDelete } from 'react-icons/md';
import useAlertForm from '../../components/alert/alertForm/store/useAlertForm';
import AlertForm from '../../components/alert/alertForm/alertForm';
import AlertFormSuccess from '../../components/alert/alertForm/AlertFormSuccess';
import deleteDispositivo from '../../components/dispositivo/http/deleteDispositivo';
import getAllDispositivos from '../../components/site/http/getAllDispositivo';



const openMenu = "px-10 md:px-4 ml-[300px] md:ml-[17em] w-full flex flex-col  justify-center mr-0 mt-4 transition-1 ease-in-out duration-700"
const closeMenu = "px-10  md:px-4 ml-0 md:ml-0 w-full flex flex-col  justify-center mr-0 md:mr-0 mt-4 transition-1 ease-in-out duration-700"

type DispositivosProps = {
    token: string
}
const url = process.env.NEXT_PUBLIC_URLAPI ? process.env.NEXT_PUBLIC_URLAPI : '';


const Dispositivos = ({ token }: DispositivosProps) => {
    // const socket = getSocket();
    const [isEventData, setIsEventData] = useState<[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const stateMenu = useMenu((state: any) => state.stateMenu);
    const [dispositivo, setDispositivo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const useWaterLevelState = useWaterLevel((state: any) => state);
    const useAlertFormState = useAlertForm((state:any)=>state);

    const openModal = (e: any) => {
        setDispositivo(e)
        setModalOpen(true);
    };

    const closeModal = (e: any) => {
        setDispositivo(e)
        setModalOpen(false);
    };


    const deleteDispo = async (id: number) => {
        console.log(id)
        setIsLoadingDelete(true)
        try {
            await deleteDispositivo(id);
            getDispositivos();
            setIsLoadingDelete(false)
            useAlertFormState.actionOpenSuccess("SUCCESS: Deletado com sucesso");
            
        } catch (error: any) {
            setIsLoadingDelete(false);
            const ob = error.toJSON();
            if (ob.status == 403) {
                useAlertFormState.actionOpen("ERROR: Error ao deletar o administrador");
            } else if (ob.config.timeout >= 8000) {
                useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente.");

            }
        }

    }

  
    async function getDispositivos(){
     try {
      const data = await getAllDispositivos();
      setIsEventData(data)
     } catch (error:any) {
      
        const ob = error.toJSON();
        if (ob.status == 403) {
          useAlertFormState.actionOpen("ERROR: email ou password estão incorreto", "#DB2777");
        } else if (ob.config.timeout >= 8000) {
          useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente.", "#DB2777");
  
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
            setIsEventData(message)
            setIsLoading(false)
        });


    }, [url]);

    return (
        <section className='flex w-full bg-[rgb(232,243,253)] '>
            <AlertForm visible={useAlertFormState.stateVisible} title={useAlertFormState.stateTitulo} />
            <AlertFormSuccess visible={useAlertFormState.stateVisibleSuccess} title={useAlertFormState.stateTitulo} />


            <Menu token={token} />

            <article className={stateMenu ? openMenu : closeMenu}>
                <Header />
                <h2 className="mt-10 text-2xl leading-tight">
                    Resumo
                </h2>
                <div className=" w-full ">
                    <div className="">
                        <div className="flex flex-row md:flex-col mt-4 items-center justify-between">

                            <Infoall data={isEventData} />

                            <Stats data={isEventData} />

                        </div>
                        <div className="flex flex-row items-end justify-between w-full mb-1 sm:mb-0">

                            <h2 className="mt-10 text-2xl leading-tight">
                                Dispositivos
                            </h2>
                            {/* <div className="flex items-center justify-end">
                                <form className="flex flex-row justify-center items-center mr-2">
                                    <div className=" relative ">
                                        <input type="text" className="mr-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="ID, NOME, SIGLA" />
                                    </div>
                                    <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                        Filter
                                    </button>
                                </form>
                                <button className="w-[40px] h-[40px] flex items-center justify-center p-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                                    <FaFilter />
                                </button>
                            </div> */}
                        </div>

                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                <table className="w-full leading-normal bg-white">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-5 py-3 text-sm text-left  text-gray-800 uppercase font-bold bg-white border-b border-gray-200 ">
                                                <p className="flex items-center justify-center">Dispositivos</p>
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                                <p className="flex items-center justify-center"> Level</p>
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                                <p className="flex items-center justify-center">Bateria</p>
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                                <p className="flex items-center justify-center">Sinal</p>
                                            </th>

                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                                <p className="flex items-center justify-center">Indentificado</p>
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                                <p className="flex items-center justify-center"> Sigla</p>
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                                <p className="flex items-center justify-center">status</p>
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm text-left text-gray-800 uppercase font-bold bg-white border-b border-gray-200">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            isEventData.length == 0 ?
                                                <tr className='w-full h-[180px] bg-white'>
                                                    <td colSpan={7} className='w-full h-[80px]'>
                                                        <div className='w-full flex items-center justify-center'>
                                                            <div className='w-[80px] h-[80px]'>
                                                                <Lottie
                                                                    animationData={loading}
                                                                    play={true}
                                                                    loop={true}

                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                                : isEventData?.map((e: any, i: number) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <div className="flex items-center justify-center">
                                                                    <div className="flex-shrink-0">
                                                                        <a href="#" className="relative block">
                                                                        </a>
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-gray-900 whitespace-no-wrap">
                                                                            {e.indentidade.length == 0 ? e.dispositivo.dispositivoId : <span className="font-bold">{e.indentidade[0].nome}</span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <div className="whitespace-no-wrap flex items-center justify-center">
                                                                    {
                                                                        e.dispositivo.waterLevel == "0000" ? <span className="inline-flex items-center m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
                                                                            <span className="ml-1">
                                                                                Alerta Verde
                                                                            </span>
                                                                        </span> :
                                                                            e.dispositivo.waterLevel == "1000" ? <span className="inline-flex items-center m-2 px-3 py-1 bg-yellow-200 hover:bg-yellow-400 rounded-full text-sm font-semibold text-yellow-600 hover:text-yellow-800">
                                                                                <span className="ml-1">
                                                                                    Alerta Amarelo
                                                                                </span>
                                                                            </span> :
                                                                                e.dispositivo.waterLevel == "1100" ? <span className="inline-flex items-center m-2 px-3 py-1 bg-orange-200 hover:bg-orange-400 rounded-full text-sm font-semibold text-orange-600">
                                                                                    <span className="ml-1">
                                                                                        Alerta Laranja
                                                                                    </span>
                                                                                </span> :
                                                                                    e.dispositivo.waterLevel == "1110" ? <span className="inline-flex items-center m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                                                                                        <span className="ml-1">
                                                                                            Alerta Vermelho
                                                                                        </span>
                                                                                    </span> :
                                                                                        e.dispositivo.waterLevel == "1111" ? <span className="inline-flex items-center m-2 px-3 py-1 bg-[#6657ac] hover:bg-[#3b2d79] rounded-full text-sm font-semibold text-[#d5ccff]">
                                                                                            <span className="ml-1">
                                                                                                Alerta Roxo
                                                                                            </span>
                                                                                        </span> :
                                                                                            <span className="inline-flex items-center m-2 px-3 py-1 bg-[#dfdfdf] hover:bg-[#adadad] rounded-full text-sm font-semibold text-[#3a3a3b]">
                                                                                                <span className="ml-1">
                                                                                                    Desconhecido
                                                                                                </span>
                                                                                            </span>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                                                                    {e.dispositivo.batteryLevel}
                                                                </p>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                                                                    {e.dispositivo.signalConection}
                                                                </p>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                                                                    {
                                                                        e.indentidade.length <= 0 ?
                                                                            <button onClick={() => {
                                                                                openModal(e)
                                                                                useWaterLevelState.setWaterLevel(e.dispositivo.waterLevel);
                                                                            }} className="btn btn-outline btn-primary">
                                                                                <span className='text-[12px] mr-2'>Sem Registro</span>
                                                                                <div className='text-[20px]'><IoAddCircleSharp /></div>
                                                                            </button>
                                                                            :
                                                                            <button className="btn btn-outline btn-disabled">
                                                                                <span className='text-[12px] mr-2'>Registrado</span>

                                                                            </button>


                                                                    }
                                                                </p>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                                                                    {e.indentidade.length <= 0 ? '--' : e.indentidade[0].sigla}
                                                                </p>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <p className='flex items-center justify-center'>{
                                                                    e.indentidade.length <= 0 ?
                                                                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-[#c23616]">
                                                                            <span aria-hidden="true" className="absolute inset-0 bg-[#ff6b81] rounded-full opacity-50">
                                                                            </span>

                                                                            <span className="relative">
                                                                                desactive
                                                                            </span>
                                                                        </span> :

                                                                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                                            </span>

                                                                            <span className="relative">
                                                                                active
                                                                            </span>
                                                                        </span>
                                                                }</p>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                {
                                                                    e.indentidade.length == 0 ? <></> :
                                                                    isLoadingDelete ? 
                                                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-gray-700"></div>:
                                                                        <button onClick={()=>deleteDispo(e.indentidade[0].id)} className='text-red-500 text-[20px]'>
                                                                            <MdDelete />
                                                                        </button>
                                                                }

                                                                {/* {
                                                                    e.indentidade.length == 0 ? <></>:<div className="dropdown dropdown-left">
                                                                    <label tabIndex={0} className="text-indigo-600 hover:text-indigo-900 text-[25px]"> <IoAddCircleSharp /></label>
                                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                                        <li><a>Editar</a></li>
                                                                        <li><a>Excluir</a></li>
                                                                        <li><a>Visualizar</a></li>
                                                                    </ul>
                                                                </div>
                                                                    
                                                                }
                                                                 */}

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        }




                                    </tbody>
                                </table>
                                {/* <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                                    <div className="flex items-center">
                                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">

                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                                            1
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                            2
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                                            3
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                            4
                                        </button>
                                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">

                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </article>


            <ModalWindow isOpen={modalOpen} closeModal={closeModal}>
                <Indentificador data={dispositivo} close={closeModal} />
            </ModalWindow>


        </section>

    );
}

export default Dispositivos;
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const cookies: { [key: string]: string } = parseCookie(ctx.req)
    const { token } = cookies;

    if (token) {

        if (isTokenExpireVerefic(token)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login"
                }
            }
        } else {
            return { props: { token } }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
}