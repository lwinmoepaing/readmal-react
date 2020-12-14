import { useCallback, useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'

import AuthenticateMiddleware from '../../middleware/isAuthenticate'
import { AuthReducerType } from '../../store/reducers/AuthReducer'
import DefaultLayout from '../../src/layout/DefaultLayout'
import profileHook from '../../src/hooks/profileHook'
import storyHook from '../../src/hooks/storyHook'
import storyFormHook from '../../src/hooks/storyFormHook'
import StoryCardSwiper from '../../src/components/Story/StoryCardSwiper'
import StoryFormDialog from '../../src/components/Story/StoryFormDialog'
import { Typography } from '@material-ui/core'
import EmptyStory from '../../src/components/common/Empty/EmptyStory'
import FoxLoading from '../../src/components/common/loading/FoxLoading'

interface MeType {
    title: string,
    Auth: AuthReducerType
}

const AuthorIndexPage = ({ title, Auth }: MeType) => {
    const user = profileHook(Auth)

    // Hook Config
    const {
        stories, 
        storiesMeta, 
        storiesPage,
        storyLoading,
        getStoryListByAuthor,
        prependStory
    } = storyHook({token: user?.token})

    const storyformHook = storyFormHook({token: user?.token})

    // Fetching Stories
    useEffect(() => {
        // Fetch Stories Page 1
        const pageNo = 1
        getStoryListByAuthor(user?.authInfo?._id, pageNo)
    }, [])

    const fetchStories = useCallback( () => {
        getStoryListByAuthor(user?.authInfo?._id, storiesPage)
    }, [storiesPage]);

    const addedNewStory = useCallback((story) => {
        prependStory(story)
        // Can Control form close 
        storyformHook.handleClose()
    }, [])


    const LatestStoryList =   stories?.length > 0 ?
        ( <StoryCardSwiper
            stories={stories}
            storyLoading={storyLoading}
            loadStory={fetchStories}
            hasNextPage={storiesMeta?.hasNextPage}
        >
            <StoryFormDialog
                isShowCreateButton={true}
                storyFormHook={storyformHook}
                onCreateStorySuccess={addedNewStory}
            />
        </StoryCardSwiper> )
        :
        ( 
            <>
                <Typography variant="h6" component="h6" className="mmFont">
                    နောက်ဆုံး Story များ  
                    <StoryFormDialog
                        isShowCreateButton={true}
                        storyFormHook={storyformHook}
                        onCreateStorySuccess={addedNewStory}
                    />
                </Typography> 
                { storyLoading ? 
                    (
                        <div style={{
                            padding: '1.9rem',
                            margin: '.8rem 0',
                            background: '#2b2b2b',
                            borderRadius: '1rem',
                        }}>
                            <FoxLoading />
                        </div>
                    ): 
                    <EmptyStory type="welcome" title="Story မရှိသေးပါ။" />
                }
            </>
        )

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key={title} />
            </Head>

            <DefaultLayout Auth={user}>
                {LatestStoryList}
            </DefaultLayout>
        </>
    )
}

AuthorIndexPage.getInitialProps = async (context: NextPageContext) => {
    const isPass = AuthenticateMiddleware(context)
    const { Auth } = context.store.getState()
    return  {
        title: 'Readmal | User ' + isPass?.authInfo?.name,
        Auth: Auth
    }
}

export default AuthorIndexPage