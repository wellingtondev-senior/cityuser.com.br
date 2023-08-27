import { useState } from "react"
import api from "../../../../services/api"

export type UseIdentificadorType = {
    create: (dispositivoId: string, data: IndetificadorType) => Promise<[]>,
    update: (data: IndetificadorType) => void,
    remove: (id: number) => void,
    isError: boolean,
    isErrorMessage: string,
    isErrorCode: string

}

type DispositivoType  = {
   
        batteryLevel:string
        corSatus:string
        id:number
        idDispositivo:string
        modeConection:boolean
        signalConection:string
        waterLevel:string
    

}


export type IndetificadorType = {
    nome: string,
    sigla: string,
    endereco: string,
    latitude: number
    longitude: number,
    bairro: string,
    cidade: string,
    cep: string,
    uf: string,
    active: boolean
   

}




export const useIdentificador = (): UseIdentificadorType => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isErrorMessage, setIsErrorMessage] = useState<string>("");
    const [isErrorCode, setIsErrorCode] = useState<string>("");


    const create = async (dispositivoId: string, data: any): Promise<[]> => {
        try {
            const createData: any = await api.post(`/identificador/dispositivo/${dispositivoId}`, data
            );

            return createData
        } catch (error: any) {
            console.log(error.message)
            setIsError(true);
            setIsErrorMessage(error.message);
            setIsErrorCode(error.code);
            return [];
        }

    }
    const update = (data: IndetificadorType) => { }
    const remove = (id: number) => { }


    return {
        create,
        update,
        remove,
        isError,
        isErrorMessage,
        isErrorCode
    }

}