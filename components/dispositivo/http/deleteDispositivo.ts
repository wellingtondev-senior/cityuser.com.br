import api from "../../../services/api";

export default async function deleteDispositivo(id:number){
const {data} = await api.delete(`/identificador/${id}`);
return data
}