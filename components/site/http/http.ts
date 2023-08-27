import api from "../../../services/api";

export async function get(searchInput: string) {
    try {

        const { data } = await api.get('/identificador/search', {
            params: {
                q: searchInput
            }
        });
        return data

    } catch (error: any) {
        return []
    }

}