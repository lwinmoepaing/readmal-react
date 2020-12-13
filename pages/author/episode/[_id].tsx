import { NextPageContext } from 'next'
import Head from 'next/head'

// Material Ui
import { Typography } from '@material-ui/core'

import AuthenticateMiddleware from '../../../middleware/isAuthenticate'
import { AuthReducerType } from '../../../store/reducers/AuthReducer'
import DefaultLayout from '../../../src/layout/DefaultLayout'
import profileHook from '../../../src/hooks/profileHook'
import { getEpisodeById } from '../../../src/api/episode'
import Editor from '../../../src/components/Editor/Editor'

interface AuthorStoryDetailPageType {
    title: string,
    Auth: AuthReducerType,
    id?: string
    episode?: any
}

const AuthorStoryDetailPage = ({ title, Auth, id, episode }: AuthorStoryDetailPageType) => {
    const user = profileHook(Auth)

    // Access Permission
    const accessPermission :boolean = Auth?.authInfo?.role === 'ADMIN' ||
        Auth?.authInfo?.role === 'AUTHOR' && episode?.author?._id === Auth?.authInfo?._id

    const showEditor = accessPermission && episode && episode?.is_editable

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key={title} />
            </Head>

            <DefaultLayout Auth={user}>
               { !episode &&  <Typography variant="h6" component="h6"> Episode is not found </Typography> }
               { showEditor ? (
                    <Editor
                        context={episode?.snap_context}
                        episodeId={episode?._id}
                        backgroundImage={episode?.background_context_image}
                        token={user?.token}
                    />
               ) : <h1> Context Box </h1> }
            </DefaultLayout>
        </>
    )
}

AuthorStoryDetailPage.getInitialProps = async (context: NextPageContext) => {
    const isPass = AuthenticateMiddleware(context)
    const { Auth } = context.store.getState()
    const episodeId = context?.query?._id
    let episode = null
    try {
        const responseStory = await getEpisodeById(episodeId, Auth?.token)
        if (responseStory?.ok) {
            const res = await responseStory.json()
            episode = res.data
        }
    } catch {

    }
    return  {
        title:  `Readmal | ${episode?.title}`,
        Auth: Auth,
        id: context?.query?._id,
        episode
    }
}

export default AuthorStoryDetailPage