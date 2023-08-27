import api from "../../../../../services/api";

export async function findWhatsapp(whatsapp:string, identificadorId:number){
   try {
   
      const {data }= await api.get('/newslleter', {
        params:{
            whatsapp,
            id:identificadorId
        }
      });
       return data
   } catch (error:any) {
     return []
   } 
}