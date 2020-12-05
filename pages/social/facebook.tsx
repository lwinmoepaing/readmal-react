import { useEffect, useCallback, useState } from 'react'
import { Container } from "@material-ui/core"
import { NextPageContext } from "next"
import Router from 'next/router'
import Head from 'next/head'
// Redux Connect
import { useSelector, useDispatch } from 'react-redux'
// Material Icons
import FacebookLoading from '../../src/components/common/loading/FacebookLoading'

import { AuthReducerType } from '../../store/reducers/AuthReducer'
import { State } from "../../store/configStore"
import { API_URL } from '../../config'

import { loginSuccess, logout } from '../../store/actions/authAction'
import isPassAuth from '../../middleware/isPassAuth'

interface FacebookSocialProps {
  title: string,
  token: string,
  Auth: AuthReducerType
}

interface AuthTypes {
  token: string,
  authInfo: any
}

const FacebookPage = ({ title, token } : FacebookSocialProps) => {
 
  const authData: AuthReducerType = useSelector((state: State) => state.Auth)
  const dispatch = useDispatch(); 

  const [ userData, setUserData] = useState<AuthTypes | undefined>()

  const login = useCallback(
    async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
        const response = await fetch(`${API_URL}/auth/me`, { method: 'GET', headers })
        if (!response.ok) {
          const message = (await response.json())?.message ?? 'Not Authorize'
          throw new Error(message)
        }
        const resJson = await response.json()
        setUserData({
          token: token,
          authInfo: resJson.data
        })
      } catch (e) {
        await dispatch(logout())
        Router.push('/')
        return
      }
    },
    [token],
  )

  // When return from backend server, we have token,
  // at once , we call login method to fetching user data
  useEffect( () => {
    login()
  }, [])

  // when userData change dependency, we need to dispatch LoginSuccess
  useEffect( () => {
    console.log('Calling coz of userData changes')
    if (userData?.authInfo) {
      dispatch(loginSuccess({
        token,
        authInfo: userData.authInfo
      }))

      // If success Login, we redirect me
      Router.push('/me')
    }
  }, [userData])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key={title} />
      </Head>
      <Container> 
        <FacebookLoading />
      </Container>
    </>
  )
}

FacebookPage.getInitialProps = async ( context: NextPageContext) => {
  const result = isPassAuth(context, false)
  console.log('Result', result);
  // make sure to get token when call back  
  // appurl.com/social/facebook?token={token}
  return  {
    token: context.query?.token ?? null,
    title: 'Readmal | Facebook Redirect'
  }
}

export default FacebookPage