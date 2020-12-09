import { useCallback, useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Router from 'next/router'

import { useDispatch } from 'react-redux'
// Material Ui
import { Button, CircularProgress } from '@material-ui/core'

import AuthenticateMiddleware from '../../middleware/isAuthenticate'
import { logout } from '../../store/actions/authAction'
import { AuthReducerType } from '../../store/reducers/AuthReducer'
import Profile from '../../src/components/Profile/Profile'
import DefaultLayout from '../../src/layout/DefaultLayout'
import profileHook from '../../src/hooks/profileHook'
import storyHook from '../../src/hooks/storyHook'
import StoryCardSwiper from '../../src/components/Story/StoryCardSwiper'

interface MeType {
    title: string,
    Auth: AuthReducerType
}

const AuthorIndexPage = ({ title, Auth }: MeType) => {
    const dispatch = useDispatch()

    const user = profileHook(Auth)

    const toLogout = useCallback( async () => {
        await dispatch(logout())
        Router.push('/')
    }, [])

    const {
        stories, 
        storiesMeta, 
        storiesPage,
        storyLoading,
        getStoryListByAuthor
    } = storyHook({token: user?.authInfo?.token})

    // Fetching Stories
    useEffect(() => {
        // Fetch Stories Page 1
        const pageNo = 1
        getStoryListByAuthor(user?.authInfo?._id, pageNo)
    }, [])

    const fetchStories = useCallback( () => {
        getStoryListByAuthor(user?.authInfo?._id, storiesPage)
    }, [storiesPage]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key={title} />
            </Head>

            <DefaultLayout Auth={user}>
                <Profile user={user} />

                <StoryCardSwiper />
                
                {
                    storiesMeta?.hasNextPage &&
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchStories} disabled={storyLoading}
                        >
                            Load Stories {storyLoading && <CircularProgress size={22} />}
                        </Button>
                    </div>
                }
            </DefaultLayout>
        </>
    )
}

AuthorIndexPage.getInitialProps = async (context: NextPageContext) => {
    const isPass = await AuthenticateMiddleware(context)
    const { Auth } = context.store.getState()
    return  {
        title: 'Readmal | User ' + isPass?.authInfo?.name,
        Auth: Auth
    }
}

export default AuthorIndexPage