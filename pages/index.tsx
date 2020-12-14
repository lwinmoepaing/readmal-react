import { useCallback, useEffect, useState } from "react"
import { NextPageContext } from "next"
import Head from 'next/head'

// Material
import { Container, Button } from "@material-ui/core"

// Redux
import AuthenticateMiddleware from "../middleware/isAuthenticate"
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
      const currentCharId = messages[prev.length - 1]?.character?.id
      const nextCharId = messages[prev.length]?.character?.id
      let setMessage = prev
      setMessage[prev.length - 1].is_show_character = currentCharId !== nextCharId
      
      return [
        ...setMessage,
        messages[prev.length]
      ]
    })
  }, [messages, touchMessages])

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={title} key={title} />
        <meta property="og:description" content="Readmal Modern Touch Story Platform, Enjoy it now!" />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <Container> 
        
        <Home
          messages={touchMessages}
          onPress={increaseTouchMessage}
          isAuth={isAuth}
          finishedStory={messages.length === touchMessages.length}  
        />
        
      </Container>
    </>
  )
}

IndexPage.getInitialProps = async ( context: NextPageContext) => {
  const isPass = AuthenticateMiddleware(context, false, true)

  return  {
    title: 'Readmal | Touch Story Platform',
    isAuth: isPass?.isValid
  }
}

export default IndexPage  
