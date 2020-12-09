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

const isAuthenticate = (
  ctx: NextPageContext, 
  isRedirect: boolean = true, // thisRedirect mean if not auth redirect to homepage
  isAuthRedirect: boolean = false, // mean role is admin Redirect '/admin' if author '/author'
  redirectUrl = '/' // thisRedirectUrl is homepage if not auth
): ValidAuthType => {

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
    if (!ctx.req) {
      Router.push(redirectUrl)
    } else {
      ctx.res.writeHead(302, { Location: redirectUrl });
      ctx.res.end();
    }
    return resData
  }

  ctx.store.dispatch(loginSuccess({ token, authInfo }))

  // Is Auth Redirect Mean Role Redirect
  // Specific HomePage, Initial About Page,
  if (isValid && isAuthRedirect) {
    const roleUrl = `/${authInfo?.role?.toLowerCase()}`
    if (!ctx.req) {
      Router.push(roleUrl);
    } else {
      ctx.res.writeHead(302, { Location: roleUrl });
      ctx.res.end();
    }
  }

  return resData
}

export default isAuthenticate