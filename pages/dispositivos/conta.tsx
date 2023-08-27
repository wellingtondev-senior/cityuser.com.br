import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Menu from '../../components/menu';
import useMenu from '../../components/menu/store/useMenu';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookie } from '../../utils/cookies';
import { isTokenExpireVerefic } from '../../utils/tokenExpire';
import useAlertForm from '../../components/alert/alertForm/store/useAlertForm';
import AlertForm from '../../components/alert/alertForm/alertForm';
import AlertFormSuccess from '../../components/alert/alertForm/AlertFormSuccess';
import updatePassword from '../../components/conta/http/updatePassword';
import getAllAdmin from '../../components/conta/http/getAllAdmin';
import { MdDelete } from 'react-icons/md';
import deleteAdmin from '../../components/conta/http/deleteAdmin';
import ModalWindow from '../../components/modal';
import { BsPersonFillAdd } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import createAdmin from '../../components/conta/http/createAdmin';

type ContaProps = {
    token: string
}


const openMenu = "overflow-y-auto px-10 md:px-4 ml-[300px] md:ml-[17em] w-full flex flex-col  justify-start mr-0 mt-4 transition-1 ease-in-out duration-700"
const closeMenu = "overflow-y-auto px-10  md:px-4 ml-0 md:ml-0 w-full flex flex-col  justify-start mr-0 md:mr-0 mt-4 transition-1 ease-in-out duration-700"

const Conta = ({ token }: ContaProps) => {

    const [isModal, setIsModal] = useState<boolean>(false);
    const [isEmail, setIsEmail] = useState<string>("");
    const [isModalAddAdm, setIsModalAddAdm] = useState<boolean>(false);
    const [isListAdmin, setIsListAdmin] = useState<[]>([]);
    const [isPAssword, setIsPAssword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    const stateMenu = useMenu((state: any) => state.stateMenu);
    const useAlertFormState = useAlertForm((state: any) => state); 4
    const { watch, control, register, handleSubmit, formState: { errors }, reset } = useForm();
    const user = JSON.parse(token);

    async function submitForm(dataForm: any) {
        setIsLoading(true)
        try {
           await createAdmin(
                dataForm.nome,
                dataForm.email,
                dataForm.whatsapp,
                dataForm.password,
                user.email
            ); 
            await allAdmin();
            setIsLoading(false)
            setIsModalAddAdm(false)

            reset({
                nome: "",
                email: "",
                whatsapp: "",
                password: ""
            })
           
            useAlertFormState.actionOpenSuccess("SUCCESS: Password atualizado com sucesso");

        } catch (error:any) {
            setIsLoading(false)
            setIsModalAddAdm(false)
            const ob = error.toJSON();
            if (ob.status == 403) {
                useAlertFormState.actionOpen("ERROR: email ou password estão incorreto", "#DB2777");
            } else if (ob.config.timeout >= 8000) {
                useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente.", "#DB2777");

            }
        }


    }

    const update = async () => {
        try {
            setIsLoading(true);
            if (user.id === 0) {
                useAlertFormState.actionOpen("ERROR: Esta conta é de nível master e não é possível modificar a senha.");
            } else if (isPAssword == "") {
                useAlertFormState.actionOpen("ERROR: Campo password estar vazio");
            } else {
                const data = await updatePassword({
                    email: user.email,
                    password: isPAssword,
                });
                console.log(data)
                setIsLoading(false)
                setIsPAssword("")
                useAlertFormState.actionOpenSuccess("SUCCESS: Password atualizado com sucesso");
            }


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
    const allAdmin = async () => {
        try {
            const { data } = await getAllAdmin();
            setIsListAdmin(data);
        } catch (error: any) {
            const ob = error.toJSON();
            if (ob.status == 403) {
                useAlertFormState.actionOpen("ERROR: Error ao Listar os administradores");
            } else if (ob.config.timeout >= 8000) {
                useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente.");

            }
        }
    }

    function formatarData(data: any) {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    async function deleteEmail() {
        setIsLoading(true);
        try {
            if (isEmail == user.email) {
                useAlertFormState.actionOpen("ERROR: Esse administrador não pode ser excluido por essa conta.");
                setIsModal(false)
            } else {
                await deleteAdmin(isEmail);
                await allAdmin();
                useAlertFormState.actionOpenSuccess("SUCCESS: Deletado com sucesso");
                setIsLoading(false);
                setIsModal(false)
                
            }
          

        } catch (error: any) {
            setIsLoading(false);
            const ob = error.toJSON();
            if (ob.status == 403) {
                useAlertFormState.actionOpen("ERROR: Error ao deletar o administrador");
            } else if (ob.config.timeout >= 8000) {
                useAlertFormState.actionOpen("ERROR: Estamos trabalhando para melhorias, tente novamente.");

            }
        }
    }


    useEffect(() => {
        allAdmin()
    }, [token])



    return (
        <section className='flex w-full h-screen fixed bg-[rgb(232,243,253)] '>
            <AlertForm visible={useAlertFormState.stateVisible} title={useAlertFormState.stateTitulo} />
            <AlertFormSuccess visible={useAlertFormState.stateVisibleSuccess} title={useAlertFormState.stateTitulo} />

            <Menu token={token} />

            <article className={stateMenu ? openMenu : closeMenu}>
                <Header />
                <h2 className="my-6 text-2xl leading-tight">
                    Update Password
                </h2>
                <div className="flex flex-col w-full h-auto p-4 rounded-lg shadow bg-white">
                    <div className='w-full p-4 flex'>
                        <div className='mr-4 font-semibold'>Nome:</div>
                        <div className=' flex items-center justify-start'>{user.nome ? user.nome : "Master"}</div>
                    </div>
                    <div className='w-full p-4 flex'>
                        <div className='mr-4 font-semibold'>Email:</div>
                        <div className='flex items-center justify-start'>{user.email}</div>
                    </div>
                    <div className='w-full p-4 flex'>
                        <div className='w-[20%] font-semibold'>
                            <input
                                type="password"
                                placeholder="*********"
                                onChange={(e) => setIsPAssword(e.target.value)}
                                className="input input-bordered w-full " />
                        </div>
                        <div className='w-[78%] flex items-center justify-start ml-4'>
                            <button onClick={() => update()} className="btn btn-success">UPDATE</button>
                        </div>
                    </div>

                </div>
                <div className='mt-10  flex items-center justify-between'>
                    <h2 className="text-2xl leading-tight">
                        Contas Admin
                    </h2>
                    <div className='flex items-center justify-end '>
                        <button onClick={() => setIsModalAddAdm(true)} className='flex items-center justify-center btn bg-slate-500 hover:bg-slate-700 border-slate-500 hover:border-slate-500'>
                            <div><BsPersonFillAdd /></div>
                            <span>Add Administrador</span>
                        </button>
                    </div>
                </div>

                <div className=" w-full h-auto">
                    <div className="">
                        <div className="flex flex-row items-end justify-between w-full mb-1 sm:mb-0">
                        </div>
                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                            <div className=" w-full overflow-hidden rounded-lg shadow bg-white">

                                <div className="w-full px-4 mx-auto sm:px-8">
                                    <div className="py-8">
                                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                                            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                                <table className="w-full leading-normal">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                                <p className='flex items-center justify-center'>User</p>
                                                            </th>
                                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                                <p className='flex items-center justify-center'> Email</p>
                                                            </th>
                                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                                <p className='flex items-center justify-center'> Role </p>
                                                            </th>
                                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                                <p className='flex items-center justify-center'> Criação Data </p>
                                                            </th>
                                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                                <p className='flex items-center justify-center'>Action</p>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            isListAdmin.map((e: any, i) => {

                                                                return (
                                                                    <tr key={i}>
                                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0">
                                                                                    <a href="#" className="relative block">
                                                                                        <div className="mx-auto rounded-full h-10 w-10 flex items-center justify-center bg-slate-500" >
                                                                                            <span className='uppercase font-semibold text-white'>{e.nome[0]}</span>
                                                                                        </div>
                                                                                    </a>
                                                                                </div>
                                                                                <div className="ml-3">
                                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                                        {e.nome}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                            <div className="flex items-center justify-center">
                                                                                <div className="ml-3">
                                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                                        {e.email}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                            <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                                                                                Admin
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                            <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                                                                                {formatarData(e.createdAt)}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                            <div className='flex items-center justify-center'>
                                                                                <button onClick={() => {
                                                                                    setIsModal(true);
                                                                                    setIsEmail(e.email)
                                                                                }} className='flex items-center justify-center text-red-600 text-[25px]'>
                                                                                    <MdDelete />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </article>

            <ModalWindow isOpen={isModalAddAdm}>
                <div className="w-[40%] p-4 m-auto bg-white shadow-lg rounded-2xl ">
                    <form onSubmit={handleSubmit(submitForm)} >
                        <div className='h-[90%] flex flex-col items-center justify-around'>
                            <input
                                placeholder="Nome Completo"
                                type="text"
                                className="w-full mb-4 appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                {...register("nome", { required: true, maxLength: 50 })}
                            />
                            <input
                                placeholder="email@email.com"
                                type="email"
                                className="w-full mb-4 appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                {...register("email", { required: true, maxLength: 30 })}
                            />
                            <input
                                placeholder="(##) ##### ####)"
                                type="number"
                                className="w-full mb-4 appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                {...register("whatsapp", { required: true, maxLength: 30 })}
                            />
                            <input
                                placeholder="*********"
                                type="password"
                                className="w-full mb-4 appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                            />
                            {errors.password && <span className='text-[11px] text-red-600 py-2'>Minimo de 6 caracteres</span>}
                            <input
                                type="hideen"
                                {...register("adminPaiEmail")}
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <button onClick={() => {
                                setIsModalAddAdm(false)
                                reset({
                                    nome: "",
                                    email: "",
                                    whatsapp: "",
                                    password: ""
                                })
                            }} type="button" className='btn w-[48%]'>
                                Cancelar
                            </button>
                            <button type="submit" className='btn w-[48%] btn-success'>
                               {
                                isLoading ?  <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-violet-50"></div> :
                                "cadastrar"
                               }
                            </button>
                        </div>
                    </form>
                </div>
            </ModalWindow>

            <ModalWindow isOpen={isModal}>
                <div className="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl ">
                    <div className="w-full h-full text-center">
                        <div className="flex flex-col justify-between h-full">
                            <div className='flex items-center justify-center text-[80px]'>
                                <MdDelete />
                            </div>
                            <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                                Confirmação
                            </p>
                            <p className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                                Tem certeza que deseja deletar a conta {isEmail} ?
                            </p>
                            <div className="flex items-center justify-between w-full gap-4 mt-8">
                                <button onClick={() => {
                                    deleteEmail()
                                    
                                }} type="button" className=" flex items-center justify-center  py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    {
                                isLoading ?  
                                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-violet-50"></div> :
                                "DELETAR"
                               }
                                </button>
                                <button onClick={() => setIsModal(false)} type="button" className=" py-2 px-4  bg-gray-500 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-indigo-200  text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWindow>


        </section >

    );
}

export default Conta;
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