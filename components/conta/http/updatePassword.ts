import api from "../../../services/api";

type updatePasswordProps = {
    email:string, 
    password:string
}

export default async function updatePassword({email,  password}:updatePasswordProps){
    const data = await api.put('/admin', {
        email,
        password
    });
    return data
}