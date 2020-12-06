import { useCallback, useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Router from 'next/router'

import { useDispatch, useSelector, connect } from 'react-redux'
// Material Ui
import { Button, Container, Typography } from '@material-ui/core'

import isPassAuth from '../middleware/isPassAuth'
import { logout } from '../store/actions/authAction'
import { AuthReducerType } from '../store/reducers/AuthReducer'
import { State } from '../store/configStore'
import Link from 'next/link'

interface MeType {
    title: string,
    Auth: AuthReducerType
}

const MePage = ({ title, Auth }: MeType) => {
    const dispatch = useDispatch()

    const userData = useSelector((state: State) => state?.Auth)

    const [user, setUser] = useState<AuthReducerType | null>(Auth ?? null)

    useEffect(() => {
        setUser(userData)
    }, [userData])

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
            <Container>
                <h1> User </h1>
                <Typography component="p">
                    Name: { user?.authInfo?.name }
                </Typography>
                <Typography component="p">
                    Role: { user?.authInfo?.role?.toLowerCase() }
                </Typography>
                <Typography component="p">
                    Email: { user?.authInfo?.email }
                </Typography>

                <div style={{marginTop: '1rem'}}>
                    <Button variant="contained" color="primary" onClick={toLogout}>
                        Logout
                    </Button>

                    <Link href="/" passHref >
                        <Button variant="outlined" color="primary" >Home</Button>
                    </Link> 
                </div>
            </Container>
        </>
    )
}

MePage.getInitialProps = async (context: NextPageContext) => {
    const isPass = await isPassAuth(context)
    const { Auth } = context.store.getState()
    return  {
        title: 'Readmal | User ' + isPass?.authInfo?.name,
        Auth: Auth
    }
}

export default MePage