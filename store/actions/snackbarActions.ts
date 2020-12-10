import { snackMessage } from '../reducers/SnackbarReducer'
import { SNACKBAR_ADDED_MESSAGE, SNACKBAR_CLEAR } from './actionTypes'

export const addedSnackbarMessages = (messages: snackMessage[]) => {
    return {
        type: SNACKBAR_ADDED_MESSAGE,
        payload: {
            messages
        }
    }
}

export const clearSnackbarMessage = () => {
    return {
        type: SNACKBAR_CLEAR
    }
}