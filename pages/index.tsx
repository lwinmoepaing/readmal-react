import { useCallback, useEffect, useState } from "react"
import { NextPageContext } from "next"
import Link from 'next/link'
import Head from 'next/head'
import Router from "next/router"

// Material
import { Container, Button } from "@material-ui/core"

// Redux
import { API_URL } from "../config"
import isPassAuth from "../middleware/isPassAuth"
import Home from "../src/components/Home/Home"
import { contextType, makeSampleContexts } from "../model/Context"

interface HomeInitialPops {
  title: string,
  isAuth: boolean
}

const IndexPage = ({ title, isAuth } : HomeInitialPops) => {
  const [messages] = useState<contextType[]>(makeSampleContexts())

  const loginWithFacebook = useCallback( () => {
    Router.push(`${API_URL}/auth/social/facebook`)
  }, [])

  useEffect(() => {
    console.log('Messages', messages)
  }, [])

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={title} key={title} />
      </Head>
      <Container> 
        <h1> Readmal </h1>
       
        {
          isAuth ?
            <Link href="/me" passHref>
              <Button variant="outlined" color="primary" >Me</Button>
            </Link> :
            <Button variant="contained" color="primary" onClick={loginWithFacebook}>
              Login With Facebook
            </Button>
        }
        <Home />
      </Container>
    </>
  )
}

IndexPage.getInitialProps = async ( context: NextPageContext) => {
  const isPass = isPassAuth(context, false)

  return  {
    title: 'Readmal | Touch Story Platform',
    isAuth: isPass?.isValid
  }
}

export default IndexPage  
