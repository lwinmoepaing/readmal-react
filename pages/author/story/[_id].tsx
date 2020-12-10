import { NextPageContext } from 'next'
import Head from 'next/head'

import { useDispatch } from 'react-redux'
// Material Ui
import { Typography } from '@material-ui/core'

import AuthenticateMiddleware from '../../../middleware/isAuthenticate'
import { AuthReducerType } from '../../../store/reducers/AuthReducer'
import DefaultLayout from '../../../src/layout/DefaultLayout'
import profileHook from '../../../src/hooks/profileHook'

interface AuthorStoryDetailPageType {
    title: string,
    Auth: AuthReducerType,
    id?: string
}

const AuthorStoryDetailPage = ({ title, Auth, id }: AuthorStoryDetailPageType) => {
    const dispatch = useDispatch()

    const user = profileHook(Auth)

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key={title} />
            </Head>

            <DefaultLayout Auth={user}>
               <Typography variant="body2">
                  Story Detail Page By id : { id }
               </Typography>
            </DefaultLayout>
                
        </>
    )
}

AuthorStoryDetailPage.getInitialProps = async (context: NextPageContext) => {
    const isPass = await AuthenticateMiddleware(context)
    const { Auth } = context.store.getState()
    return  {
        title: 'Readmal | User ' + isPass?.authInfo?.name,
        Auth: Auth,
        id: context?.query?._id
    }
}

export default AuthorStoryDetailPage