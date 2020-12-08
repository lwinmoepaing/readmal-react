import { useCallback, useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Router from 'next/router'

import { useDispatch } from 'react-redux'
// Material Ui
import { Button } from '@material-ui/core'

import AuthenticateMiddleware from '../../middleware/isAuthenticate'
import { logout } from '../../store/actions/authAction'
import { AuthReducerType } from '../../store/reducers/AuthReducer'
import Profile from '../../src/components/Profile/Profile'
import DefaultLayout from '../../src/layout/DefaultLayout'
import profileHook from '../../src/hooks/profileHook'

interface MeType {
    title: string,
    Auth: AuthReducerType
}

const MePage = ({ title, Auth }: MeType) => {
    const dispatch = useDispatch()

    const user = profileHook(Auth)

    const toLogout = useCallback( async () => {
        await dispatch(logout())
        Router.push('/')
    }, [])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key={title} />
            </Head>

            <DefaultLayout Auth={user}>
                <Profile user={user} />
                <div>
                    <Button variant="contained" color="primary" onClick={toLogout}>
                        Logout
                    </Button>
                </div>
            </DefaultLayout>
                
        </>
    )
}

MePage.getInitialProps = async (context: NextPageContext) => {
    const isPass = await AuthenticateMiddleware(context)
    const { Auth } = context.store.getState()
    return  {
        title: 'Readmal | User ' + isPass?.authInfo?.name,
        Auth: Auth
    }
}

export default MePage