import api from "../../../../../services/api";

export default async function getIndicador() {
    try {
        const { data } = await api.get('/identificador');
        return data
    } catch (error: any) {
        return [];
    }
}