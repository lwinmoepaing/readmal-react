import {
    SNACKBAR_ADDED_MESSAGE,
    SNACKBAR_CLEAR
  } from '../actions/actionTypes'

  export interface snackMessage {
      message: string
      variant: 'default' | 'error' | 'success' | 'warning' | 'info'
  }
  
  export interface SnackbarReducerType {
    messages: snackMessage[]
  }
  
  interface ReducerType {
    type: String,
    payload: SnackbarReducerType
  }
  
  const initialState = {
    messages: []
  }
  
  const SnackbarReducer = (state: SnackbarReducerType = initialState, { type, payload }: ReducerType): SnackbarReducerType  => {
    
    switch (type) {
      // If Login Success
      case SNACKBAR_ADDED_MESSAGE:
        return {
            ...state,
            messages: payload.messages
        }
      case SNACKBAR_CLEAR: 
        return {
            ...state,
            messages: []
        }
      default:
        return state
    }
  }
  
  export default SnackbarReducer