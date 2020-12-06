import {
  LOGIN_FAIL, LOGIN_SENDING, LOGIN_SUCCESS, LOGOUT,
} from '../actions/actionTypes'
import Cookies from 'js-cookie'

const isClientSide = typeof window !== 'undefined'

let authInfo = null
let token = null

if (isClientSide) {
  authInfo = Cookies.get('authInfo')
  token = Cookies.get('token')
}


export interface AuthReducerType {
  isLoading: boolean,
  authInfo: any,
  token: string | null,
  errors: string | null,
}

interface ReducerType {
  type: String,
  payload: any
}

const initialState = {
  isLoading: false,
  authInfo: authInfo ? JSON.parse(authInfo) : null,
  token: token || null,
  errors: null,
}

const reducer = (state: AuthReducerType = initialState, { type, payload }: ReducerType): AuthReducerType  => {
  
  switch (type) {
    // If Login Success
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        authInfo: {
          ...payload.authInfo,
        },
        token: payload.token,
        errors: null,
      }

      // Login Sending
    case LOGIN_SENDING:
      return {
        ...state,
        isLoading: true,
      }

      // Login Fail
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: {
          ...payload,
        },
      }
      // Logout
    case LOGOUT:
      return {
        isLoading: false,
        authInfo: null,
        token: null,
        errors: null,
      }
    default:
      return state
  }
}

export default reducer