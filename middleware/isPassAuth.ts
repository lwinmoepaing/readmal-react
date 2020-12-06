/**
 * Is Auth Middleware
 * @doc : check is jwt and secrety key can decode
 */

import Cookies from 'js-cookie'
import { parse } from 'cookie'
import Router from 'next/router'

import { loginSuccess } from '../store/actions/authAction' 
import { NextPageContext } from 'next'

export interface ValidAuthType {
  authInfo: any | null,
  token: string | null,
  isValid: boolean,
}

const isPassAuth = (ctx: NextPageContext, isRedirect: boolean = true): ValidAuthType => {

  let token = null
  let authInfo = null

  if (ctx.req) {
    const { req } = ctx
    const cookie = req.headers.cookie || ''
    token = parse(cookie).token || null
    authInfo = parse(cookie).authInfo ? JSON.parse(parse(cookie).authInfo) : null
  } else {
    token = Cookies.get('token') || null
    authInfo = Cookies.get('authInfo') ? JSON.parse(Cookies.get('authInfo')) : null
  }

  const isValid: boolean = Boolean(authInfo && token)
  const resData: ValidAuthType = {
    authInfo,
    token,
    isValid,
  }

  if (!isValid && isRedirect) {
    const redirectUrl = '/'
    if (!ctx.req) {
      Router.push(redirectUrl)
    } else {
      ctx.res.writeHead(302, { Location: redirectUrl });
      ctx.res.end();
    }
    return resData
  }
  // console.log(ctx.store)
  // console.log(ctx.store.getState())
  ctx.store.dispatch(loginSuccess({ token, authInfo }))
  return resData
}

export default isPassAuth