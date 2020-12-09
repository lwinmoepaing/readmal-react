import { useCallback, useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'

import AuthenticateMiddleware from '../../middleware/isAuthenticate'
import { AuthReducerType } from '../../store/reducers/AuthReducer'
import DefaultLayout from '../../src/layout/DefaultLayout'
import profileHook from '../../src/hooks/profileHook'
import storyHook from '../../src/hooks/storyHook'
import StoryCardSwiper from '../../src/components/Story/StoryCardSwiper'
import StoryFormDialog from '../../src/components/Story/StoryFormDialog'

interface MeType {
    title: string,
    Auth: AuthReducerType
}

const AuthorIndexPage = ({ title, Auth }: MeType) => {
    const user = profileHook(Auth)

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

                <StoryCardSwiper
                    stories={stories}
                    storyLoading={storyLoading}
                    loadStory={fetchStories}
                    hasNextPage={storiesMeta?.hasNextPage}
                >
                    <StoryFormDialog />
                </StoryCardSwiper>

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