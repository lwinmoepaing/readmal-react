import { makeStyles, Grow } from "@material-ui/core"
import { contextType } from "../../../model/Context"

interface MessageListType extends contextType{
}

const MessageList = (props: MessageListType) => {
    const classes = useStyle()

    const dynamicDirection = classes[`position_${props?.context_position}`]

    const dynamicClass = [
        classes.messageWrapper,
        dynamicDirection
    ].join(' ')

    const dynamicCharacterClass = [
        classes.messageCharacterWrapper,
        dynamicDirection
    ].join(' ')

    const dynamiceMessageClass = [
        classes.message,
        dynamicDirection
    ].join(' ')

    return (
        <Grow in={true}>
            <div className={classes.messageGroupWrapper}>
                <div className={dynamicClass}>
                    <p className={dynamiceMessageClass}>
                        { props?.message }
                    </p>
                </div>

                {
                    props?.is_show_character &&
                    <p className={dynamicCharacterClass} style={{color: props?.character?.color}}>{props?.character?.name} </p>
                }
            </div>
        </Grow >    
    )
}

const useStyle = makeStyles((theme) => ({
    messageGroupWrapper: {
        margin: '0 .7rem'
    },
    messageWrapper: {
        marginTop: '.3rem',
        marginBottom: '.2rem',
        width: '75%',
        display: 'flex',
        overflow: 'hidden',
    },
    messageCharacterWrapper: {
        width: '75%',
        borderRadius: '1rem',
        display: 'flex',
        overflow: 'hidden',
        margin: 0
    },
    message: {
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.46)',
        borderRadius: '1rem',
        border: '1px solid #dfdfdf',
        padding: '.5rem',
    },
    position_LEFT: {
        marginRight: 'auto',
        textAlign: 'left',
        borderBottomLeftRadius: 0,
        justifyContent: 'flex-start'
    },
    position_CENTER: {
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        justifyContent: 'center'
    },
    position_RIGHT: {
        marginLeft: 'auto',
        textAlign: 'right',
        borderBottomRightRadius: 0,
        justifyContent: 'flex-end'
    }
}))

export default MessageList