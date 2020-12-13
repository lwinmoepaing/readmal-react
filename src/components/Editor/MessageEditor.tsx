import { Fab, makeStyles, Chip, Avatar, FormControl, TextField } from '@material-ui/core'
import {EditorHook} from '../../hooks/editorHook'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ColorizeIcon from '@material-ui/icons/Colorize'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ConfirmDialog from '../common/ConfirmDialog/ConfirmDialog'
import confirmDialogHook from '../../hooks/confirmDialogHook'
import { useCallback, useState, useEffect } from 'react'

interface CharacterProps {
    editorHook: EditorHook
}

const MessageEditor = ({editorHook}: CharacterProps): JSX.Element => {
    const classes = useStyles()
    const { 
    } = editorHook

    const [deletedMessageId, setDeletedMessageId] = useState<string | null>(null)
    const useConfirmDialogHook = confirmDialogHook('Character ကို delete မည်', 'Character ရေးထားသော အကြောင်းအရာ message များပျက်သွားနိုင်ပါသည်။')
    const { openConfirmDialog, setConfirmDialogText } = useConfirmDialogHook

    // const handleDeleteCharacter = useCallback((characterId: string) => {
    //     setDeletedMessageId(characterId)
    //     const character = characters.find(char => char.id === characterId)
    //     setConfirmDialogText(`${character?.name} ဆိုသော ဇာတ်ဆောင်ကို ထုတ်ပယ်မည်`, `${character?.name} Character ရေးထားသော အကြောင်းအရာ message များပျက်သွားနိုင်ပါသည်။`)
    //     openConfirmDialog()
    // }, [characters, deletedMessageId])

    // const deleteCharacter = useCallback((val: boolean) => {
    //     if (val) onDeleteCharacter(deletedMessageId)
    // }, [deletedMessageId])


    return (
        <>
            <div>
                Message
            </div>

            <div>
                Choose Character
            </div>

            <div>
                Keyboard
            </div>
        
            {/* <ConfirmDialog confirmDialogHook={useConfirmDialogHook} onConfirm={deleteCharacter}/> */}
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    padding: {
        padding: '.5rem'
    },
    selectedCharacterContainer: {
        textAlign: 'center', borderBottom: '1px solid #464646', marginBottom: 4, paddingBottom: 4
    }
}));

export default MessageEditor