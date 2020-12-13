import { useState, useEffect, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import { Context, contextType } from '../../../model/Context'
import MessageList from '../Message/MessageList'
import { makeStyles } from '@material-ui/core'

export interface StoryBoxProps {
    contextMessages: contextType[]
    backgroundImage: string
}

const StoryBox = ({
    contextMessages,
    backgroundImage
}: StoryBoxProps): JSX.Element => {
    const classes = useStyles()

    // Message List Reference
    const scrollDownTolist = useCallback(() => {
        setTimeout(() => {
            const listScrollDown = document.getElementById('StoryBoxComponent')
            listScrollDown.scrollTop = listScrollDown.scrollHeight
        }, 50)
    }, [])

    const [messages] = useState<contextType[] | null >(contextMessages.map(ctx => new Context(ctx)))
    const [touchMessages, setTouchMessages] = useState<contextType[] | null >([])
  
    useEffect(() => {
      if (messages.length) { setTouchMessages([messages[0]]) }
    }, [messages])
  
    const increaseTouchMessage = useCallback(() => {
      if (touchMessages.length === messages.length) return
  
      setTouchMessages(prev => {
        const nextMessage = messages[prev.length]
        const nextCharId = nextMessage?.character?.id
        const previousMessage = messages[prev.length - 1]
        const currentCharId = previousMessage?.character?.id
        let updatePreviousMessage = prev
        updatePreviousMessage[prev.length - 1].is_show_character = currentCharId !== nextCharId || previousMessage.context_position !== nextMessage?.context_position
        
        scrollDownTolist()

        return [
          ...updatePreviousMessage,
          nextMessage
        ]
      })
    }, [messages, touchMessages])

    return (
        <div className={classes.container} onClick={increaseTouchMessage} id="StoryBoxComponent">
            <img className={classes.backgroundImage} src={backgroundImage} />
            <div>
                {
                    touchMessages &&
                    touchMessages.map(
                        (message: contextType, index) => <MessageList  key={`${message.id}_${index}`} {...message} />
                    )
                }
            </div>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        maxWidth: 500,
        margin: '0 auto',
        borderRadius: 8,
        height: `calc(100vh - 105px)`,
        overflowX: 'hidden',
        overflowY: 'auto',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        position: 'relative',
        border: '1px solid #434343'
    },

    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
        opacity: '0.37',
    },
}))

export default StoryBox