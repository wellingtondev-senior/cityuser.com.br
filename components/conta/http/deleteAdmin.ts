import api from "../../../services/api";

export default async function deleteAdmin(email:string){
const {data}= await api.delete('/admin',{
    data:{
        email
    }
})
return data;
}