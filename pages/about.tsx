import { NextPageContext } from "next"
import Head from 'next/head'

// Material
import { Container } from "@material-ui/core"

// Redux
import AuthenticateMiddleware from "../middleware/isAuthenticate"
import About from '../src/components/common/About/About'
import { BASE_URL } from "../config"

interface AboutPageProps {
  title: string,
  isAuth: boolean
}

const AboutPage = ({ title, isAuth } : AboutPageProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key={title} />
        <meta property="og:description" content="Readmal Modern Touch Story Platform, Enjoy it now!" />
        <meta property="og:image" content={`${BASE_URL}/readmal.png`} />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:type" content="article" />
      </Head>
      <Container> 
        <About />
      </Container>
    </>
  )
}

AboutPage.getInitialProps = async ( context: NextPageContext) => {
  const isPass = AuthenticateMiddleware(context, false, true)

  return  {
    title: 'Readmal | About (Touch Story Platform)',
    isAuth: isPass?.isValid
  }
}

export default AboutPage  
