import api from "../../../../../services/api";

export async function create(newslleterData:any){
   try {
   
      const data = await api.post('/newslleter', newslleterData);
       return data
   } catch (error:any) {
     return []
   } 
}