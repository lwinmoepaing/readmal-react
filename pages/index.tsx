import { useCallback } from "react"
import { NextPageContext } from "next"
import Link from 'next/link'
import Head from 'next/head'
import Router from "next/router"

// Material
import { Container, Button } from "@material-ui/core"

// Redux
import { connect } from 'react-redux'
import { API_URL } from "../config"
import isPassAuth from "../middleware/isPassAuth"

interface HomeInitialPops {
  title: string,
  isAuth: boolean
}

const Home = ({ title, isAuth } : HomeInitialPops) => {

  const loginWithFacebook = useCallback( () => {
    Router.push(`${API_URL}/auth/social/facebook`)
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
            <Link href="/me">
              Me
            </Link> : 
            <Button variant="contained" color="primary" onClick={loginWithFacebook}>
              Login With Facebook
            </Button>
        }

    
      </Container>
    </>
  )
}

Home.getInitialProps = async ( context: NextPageContext) => {
  const isPass = isPassAuth(context, false)

  return  {
    title: 'Readmal | Touch Story Platform',
    isAuth: isPass?.isValid
  }
}

export default Home  
