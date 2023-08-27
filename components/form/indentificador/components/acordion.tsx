import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useAdreessClick } from "../store/useAdreess.store";
import { FiEdit } from "react-icons/fi";
import { IndetificadorType, useIdentificador } from "../hook/useIdentificador";

interface DataDispositivoType {
    dataDispositivo: any

}

const open = "";
const close = ""




const Acordion = ({ dataDispositivo }: DataDispositivoType) => {
    const router = useRouter();
    const stateMarkerAddress = useAdreessClick((state: any) => state);
    const [openIndentificador, setOpenIndentificador] = useState<boolean>(false);
    const [styleButtonAddress, setStyleButtonAddress] = useState<string>("btn  btn-disabled  btn-primary mt-4")
    const [inputComplemento, setInputComplemento] = useState('');
    const [inputNome, setInputNome] = useState('');
    const [inputSigla, setInputSigla] = useState('');
    const { create, isError, isErrorMessage, isErrorCode } = useIdentificador();



    function confirmarAddress() {
        if (inputComplemento != "") {
            setOpenIndentificador(true)
        } else {
            alert("O campo complemento precisa ser preenchido");
        }

    }



    const handleSubmit = async () => {

        if (inputNome != "" && inputSigla != "") {

            const indentificado:IndetificadorType = {
                nome: inputNome,
                sigla: inputSigla,
                endereco: `${stateMarkerAddress.road ? stateMarkerAddress.road : "DESCONHECIDO"} - ${inputComplemento}`,
                latitude: stateMarkerAddress.location.lat,
                longitude: stateMarkerAddress.location.lng,
                bairro: stateMarkerAddress.neighbourhood ? stateMarkerAddress.neighbourhood : "DESCONHECIDO",
                cidade: stateMarkerAddress.city.toUpperCase(),
                cep: stateMarkerAddress.postcode,
                uf: stateMarkerAddress.uf.toUpperCase(),
                active: true,

            }
            await create(dataDispositivo.id, indentificado);
            if(isError){
                alert('Erro ao indentificar esse dispositivo');
            }else{
                alert('Dispositivo identificado  com sucesso');
                window.location.reload();
            }

        } else {
            alert("Os campos Complemento NOME, SIGLA precisa ser preenchido");
        }


    };

    useEffect(() => {
        setOpenIndentificador(false)
        if (stateMarkerAddress.city != "") {
            setStyleButtonAddress("btn  btn-active  btn-primary mt-4")

        }

    }, [stateMarkerAddress.city])



    return (
        <article className="mt-10">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <span className=" text-xl font-medium">1. Adiciconar uma localização para o dispositivo</span>
                    {openIndentificador ? <button onClick={() => setOpenIndentificador(false)} className="btn btn-outline btn-primary"><FiEdit /></button> : <></>}
                </div>
                <div className={openIndentificador ? "hidden" : ""}>
                    <div className="my-4">
                        <span>
                            Clique em um ponto do mapa para setar o endereço do dipositivo
                        </span>
                    </div>
                    <div className="border border-[#ecf0f1] rounded p-4">
                        <p >Endereço: <span className="font-bold">{stateMarkerAddress?.road}</span></p>
                        <p >Bairro:<span className="font-bold">{stateMarkerAddress?.neighbourhood}</span></p>
                        <p >Cidade:<span className="font-bold">{stateMarkerAddress?.city}</span></p>
                        <p >Complemento: <input type="text" placeholder="Complemento" onChange={(event) => setInputComplemento(event.target.value)} className="input input-bordered input-error w-full max-w-xs my-2" />
                        </p>
                    </div>
                    <div>
                        <button onClick={confirmarAddress} className={styleButtonAddress}>Confirmar</button>

                    </div>
                </div>

            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className=" flex items-center justify-between">
                    <span className="text-xl font-medium">2. Escolher um identificador para o dispositivo</span>
                </div>

                <div className={openIndentificador ? "my-4" : "hidden"}>

                    <input onChange={(event) => setInputNome(event.target.value)} type="text" placeholder="Nome do Dispositivo" className="input input-bordered input-error w-full max-w-xs my-2" />
                    <input onChange={(event) => setInputSigla(event.target.value)} type="text" placeholder="Sigla para Dispositivo" className="input input-bordered input-error w-full max-w-xs my-2" />
                    <div className="py-4 flex items-center justify-between">
                        <button onClick={() => handleSubmit()} className="btn  btn-active  btn-primary mt-4">ENVIAR OS DADOS</button>
                        <button onClick={() => location.href = "/dispositivos"} className="btn  btn-active  btn-primary mt-4">CANCELAR</button>
                    </div>

                </div>

            </div>

        </article>
    );
}

export default Acordion;