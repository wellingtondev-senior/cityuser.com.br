import api from "../../../services/api";

export default async function createAdmin(nome: string, email: string, whatsapp: string, password: string, adminPaiEmail: string) {
    const { data } = await api.post('/admin',{
            nome,
            email,
            whatsapp,
            password,
            adminPaiEmail
        
    });
    return data;

}