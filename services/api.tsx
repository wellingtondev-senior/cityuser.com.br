import axios from 'axios';
import Cookies from 'universal-cookie';


const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URLAPI}/v1`,
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(async (config: any) => {
    const cookies = new Cookies();
    const tokenHeaders = cookies.get('token')
    const token = tokenHeaders;

    try {
        if(token){
            const { access_token } = token
            
           config.headers.Authorization = `Bearer ${access_token}`;
           
        }
       
        return config; 

    } catch (err: any) {
        console.log({
            serviceApi: err.message
        })
    }
})

export default api;



