import axios from "axios";
import api from "../../../services/api";

export default async function auth(email:string, password:string){
   
    var options = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_URLAPI}/v1/auth`,
        headers: {'Content-Type': 'application/json'},
        data: {email, password}
      };
      
     const {data}  = await axios.request(options);
        return data
   
}