import { API_URL } from "../../config"

// Get Story By Id 
export const getStoryById = (story_id: string | string[]) => {
    const url = `${API_URL}/story/${story_id}`
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }
    return fetch(url, options)
}