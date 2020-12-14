import { NextPageContext } from "next"
import Head from 'next/head'
import HomeIcon from '@material-ui/icons/Home'

// Material
import { Container, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

import { getStoryById } from "../../src/api/story"
import StoryDetail from "../../src/components/Story/StoryDetail"

interface StoryDetailPublicPageProps {
  title: string,
  id?: string
  story?: any
}

const StoryDetailPublicPage = ({ title, story, id } : StoryDetailPublicPageProps) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={title} key={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={ !!story?.image ? story.image : '/logo.png'} />
      </Head>
      <Container> 
        { !story &&  <Typography variant="h6" component="h6"> Story is not found </Typography> }
        { story && 
            <>
                <StoryDetail story={story}>   
                    <Link href="/" passHref>
                        <Button color="primary" variant="outlined" size="small">
                            <HomeIcon /> {' '} ပင်မ စာမျက်နှာသို့
                        </Button>
                    </Link>
                </StoryDetail> 
            </>
        }
      </Container>
    </>
  )
}

StoryDetailPublicPage.getInitialProps = async ( context: NextPageContext) => {
    const storyId = context?.query?._id
    let story = null
    try {
        const responseStory = await getStoryById(storyId)
        if (responseStory.ok) {
            const res = await responseStory.json()
            story = res.data
        }
    } catch {

    }
    return  {
        title: `Story | ${story?.title}`,
        id: storyId,
        story
    }
}

export default StoryDetailPublicPage  
