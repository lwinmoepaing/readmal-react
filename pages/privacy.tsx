import { NextPageContext } from "next"
import Head from 'next/head'

// Material
import { Container } from "@material-ui/core"

// Redux
import AuthenticateMiddleware from "../middleware/isAuthenticate"
import Privacy from '../src/components/common/Privacy/Privacy'

interface PrivacyPageProps {
  title: string,
  isAuth: boolean
}

const PrivacyPage = ({ title, isAuth } : PrivacyPageProps) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={title} key={title} />
      </Head>
      <Container> 
        <Privacy />
      </Container>
    </>
  )
}

PrivacyPage.getInitialProps = async ( context: NextPageContext) => {
  const isPass = AuthenticateMiddleware(context, false, true)

  return  {
    title: 'Readmal | Privacy',
    isAuth: isPass?.isValid
  }
}

export default PrivacyPage  
