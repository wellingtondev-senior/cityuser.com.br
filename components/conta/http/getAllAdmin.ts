import api from "../../../services/api";

export default async function getAllAdmin() {
    const data = await api.get('/admin/all');
    return data
}