import { useCallback } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Router from 'next/router'

import { useDispatch } from 'react-redux'
// Material Ui
import { Button } from '@material-ui/core'

import isPassAuth from '../middleware/isPassAuth'
import { logout } from '../store/actions/authAction'

interface MeType {
    title: string
}

const Me = ({ title, isAuth }: MeType) => {
    const dispatch = useDispatch()

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
        <div>
            <p> Is Me </p>
            <Button variant="contained" color="primary" onClick={toLogout}>
               Logout
            </Button>
        </div>
        </>
    )
}

Me.getInitialProps = (context: NextPageContext) => {
    const isPass = isPassAuth(context)
    console.log(isPass)

    return  {
        title: 'Readmal | User ' + isPass?.authInfo?.name,
    }
}

export default Me