import { NextPageContext } from "next"
import Head from 'next/head'
import Link from 'next/link'

// Material
import { Container, Typography, Button } from '@material-ui/core'

import { getEpisodeById } from "../../src/api/episode"
import StoryBox from "../../src/components/StoryBox/StoryBox"

interface StoryDetailPublicPageProps {
  title: string,
  id?: string
  episode?: any
}

const StoryDetailPublicPage = ({ title, episode, id } : StoryDetailPublicPageProps) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={title} key={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={episode?.image ? episode.image : '/logo.png'} />
      </Head>
      <Container> 
        { !!episode && <Typography variant="h6" component="h6"> Episode is not found </Typography> }
        { !!episode && !episode?.is_published && <Typography variant="h6" component="h6"> ရေးသားနေဆဲဖြစ်သည်။ </Typography> }
        { !!episode && episode?.is_published &&
            <>
                <StoryBox contextMessages={episode?.context} backgroundImage={episode?.background_context_image} />
            </>
        }
      </Container>
    </>
  )
}

StoryDetailPublicPage.getInitialProps = async ( context: NextPageContext) => {
    const episodeId = context?.query?._id
    let episode = null
    try {
        const responseEpisode = await getEpisodeById(episodeId)
        if (responseEpisode.ok) {
            const res = await responseEpisode.json()
            episode = res.data
        }
    } catch {

    }
    return  {
        title: `${episode?.title}`,
        id: episodeId,
        episode
    }
}

export default StoryDetailPublicPage  
