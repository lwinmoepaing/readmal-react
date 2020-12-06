import { useCallback, useEffect, useState } from "react"
import { NextPageContext } from "next"
import Head from 'next/head'

// Material
import { Container, Button } from "@material-ui/core"

// Redux
import isPassAuth from "../middleware/isPassAuth"
import Home from "../src/components/Home/Home"
import { contextType, makeSampleContexts } from "../model/Context"

interface HomeInitialProps {
  title: string,
  isAuth: boolean
}

const IndexPage = ({ title, isAuth } : HomeInitialProps) => {
  const [messages] = useState<contextType[] | null >(makeSampleContexts() || null)
  const [touchMessages, setTouchMessages] = useState<contextType[] | null >([])

  useEffect(() => {
    if (messages.length) {
      setTouchMessages([
        messages[0]
      ])
    }
  }, [messages])

  const increaseTouchMessage = useCallback(() => {
    if (touchMessages.length === messages.length) return
    setTouchMessages(prev => {
      return [
        ...prev,
        messages[prev.length]
      ]
    })
  }, [messages, touchMessages])

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={title} key={title} />
      </Head>
      <Container> 
        <h1> Readmal </h1>
        
        <Home messages={touchMessages} onPress={increaseTouchMessage} isAuth={isAuth} />
        
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
