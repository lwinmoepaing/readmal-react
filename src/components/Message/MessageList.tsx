import { makeStyles, Grow, Chip, Avatar } from "@material-ui/core"
import { contextType } from "../../../model/Context"
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
        'mmFont', 
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
                    <div className={dynamicCharacterClass}>
                        {/* <Chip
                            label={props?.character?.name}
                            style={{borderColor:  props?.character?.color}}
                            className={dynamicCharacterClass}
                            variant="outlined"
                        /> */}
                        <p className={dynamicCharacterClass} style={{color: props?.character?.color}}>{props?.character?.name} </p>
                    </div>
                }
            </div>
        </Grow >    
    )
}

const useStyle = makeStyles((theme) => ({
    messageGroupWrapper: {
        margin: '.5rem .7rem'
    },
    messageWrapper: {
        marginTop: '.3rem',
        marginBottom: '.2rem',
        width: '75%',
        display: 'flex',
        overflow: 'hidden',
    },
    messageCharacterWrapper: {
        borderRadius: '1rem',
        display: 'flex',
        overflow: 'hidden',
        margin: 0,
        fontWeight: 'bold'
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