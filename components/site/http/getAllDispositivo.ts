import api from "../../../services/api";

export default async function getAllDispositivos():Promise<[]>{
    const {data} = await api.get('/dispositivo/all');
    return data;

}