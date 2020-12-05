import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import {
  LOGIN_FAIL, LOGIN_SENDING, LOGIN_SUCCESS, LOGOUT,
} from './actionTypes'
import { BASE_API_URL } from '../../config'

export const loginSending = () => ({
  type: LOGIN_SENDING,
})


interface loginSuccessType {
  token: string,
  authInfo: object
}
export const loginSuccess = (payload: loginSuccessType) => {
  Cookies.set('authInfo', payload.authInfo)
  Cookies.set('token', payload.token)

  return {
    type: LOGIN_SUCCESS,
    payload,
  }
}

export const loginFail = (e) => ({
  type: LOGIN_FAIL,
  payload: {
    message: e.message,
  },
})

export const logout = () => {
  Cookies.remove('authInfo')
  Cookies.remove('token')
  return {
    type: LOGOUT,
  }
}

// ===========================
// Async Thunk Example
// ===========================

export const onSubmitAuth = (email = '', password = '') => async (dispatch) => {
  // eslint-disable-next-line no-alert
  // dispath Sending First
  dispatch(loginSending())
  try {
    const response = await fetch(`${BASE_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (!response.ok) throw response
    const { data, token } = await response.json()
    const authInfo = data
    const payload = {
      authInfo,
      token,
    }
    dispatch(loginSuccess(payload))
    return payload
  } catch (e) {
    dispatch(loginFail(e))
    throw e
  }
}


// SET Login