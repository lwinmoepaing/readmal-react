import { API_URL } from "../../config"

// Get Story By Id 
export const getEpisodeById = (episode_id: string | string[], token?: string) => {
    const url = `${API_URL}/episode/${episode_id}`
    const options = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    return fetch(url, options)
}