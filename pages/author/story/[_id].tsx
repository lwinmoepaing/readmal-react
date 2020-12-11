import { NextPageContext } from 'next'
import Head from 'next/head'

// Material Ui
import { Typography } from '@material-ui/core'

import AuthenticateMiddleware from '../../../middleware/isAuthenticate'
import { AuthReducerType } from '../../../store/reducers/AuthReducer'
import DefaultLayout from '../../../src/layout/DefaultLayout'
import profileHook from '../../../src/hooks/profileHook'
import { getStoryById } from '../../../src/api/story'
import StoryDetail from '../../../src/components/Story/StoryDetail'

interface AuthorStoryDetailPageType {
    title: string,
    Auth: AuthReducerType,
    id?: string
    story?: any
}

const AuthorStoryDetailPage = ({ title, Auth, id, story }: AuthorStoryDetailPageType) => {
    const user = profileHook(Auth)

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key={title} />
            </Head>

            <DefaultLayout Auth={user}>
               { !story &&  <Typography variant="h6" component="h6"> Story is not found </Typography> }
               { story && <StoryDetail story={story} Auth={user} /> }
            </DefaultLayout>
        </>
    )
}

AuthorStoryDetailPage.getInitialProps = async (context: NextPageContext) => {
    const isPass = await AuthenticateMiddleware(context)
    const { Auth } = context.store.getState()
    const storyId = context?.query?._id
    let story = null
    try {
        const responseStory = await getStoryById(storyId)
        if (responseStory?.ok) {
            const res = await responseStory.json()
            story = res.data
        }
    } catch {

    }
    return  {
        title:  `Readmal | ${story?.title}`,
        Auth: Auth,
        id: context?.query?._id,
        story
    }
}

export default AuthorStoryDetailPage