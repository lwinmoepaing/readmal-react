import { 
    makeStyles, 
    Chip, 
    Avatar, 
    FormControl, 
    TextField, 
    IconButton, 
    Button,
    Dialog,
    DialogTitle, 
    DialogActions,
    DialogContent, 
    DialogContentText,
    Radio,
    FormLabel,
    RadioGroup,
    Input,
    FormControlLabel } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useCallback, useState, useEffect } from 'react'
import Grow from '@material-ui/core/Grow'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import ConfirmDialog from '../common/ConfirmDialog/ConfirmDialog'
import confirmDialogHook from '../../hooks/confirmDialogHook'
import { EditorHook } from '../../hooks/editorHook'
import { contextType } from '../../../model/Context'
interface CharacterProps {
    editorHook: EditorHook
}

const MessageEditor = ({editorHook}: CharacterProps): JSX.Element => {
    const classes = useStyles()
    const { messages, backgroundContextImage, onDeleteMessage, onEditMessage } = editorHook

    // Handle Delete Message
    const [deletedMessageId, setDeletedMessageId] = useState<string | null>(null)
    const useConfirmDialogHook = confirmDialogHook('Message ကို delete မည်', '')
    const { openConfirmDialog, setConfirmDialogText } = useConfirmDialogHook

    const handleDeleteMessage = useCallback((characterId: string) => {
        setDeletedMessageId(characterId)
        const findMessage = messages.find(char => char.id === characterId)
        setConfirmDialogText(`${findMessage?.message} ကို ထုတ်ပယ်မည်`, ``)
        openConfirmDialog()
    }, [messages, deletedMessageId])

    const deleteMessage = useCallback((val: boolean) => {
        if (val) onDeleteMessage(deletedMessageId)
    }, [deletedMessageId])

    // Edited Message
    const [editedMessage, setEditedMessage] = useState<contextType | null>(null)
    const [editedMessageSerial, setEditedMessageSerial] = useState<number>(0)
    const [openEditMessageDialog, setOpenEditMessageDialog] = useState<boolean>(false)

    // When click edit button of message
    const openEditDialog = useCallback((messageId: string, index: number) => {
        setEditedMessage(messages.find(mes => mes.id === messageId))
        setEditedMessageSerial(index + 1)
        setOpenEditMessageDialog(true)
    }, [messages, openEditMessageDialog])

    // When user input changes
    const handleInputEditedMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedMessage({
            ...editedMessage,
            [event.target.name]: event.target.value 
        })
    }, [editedMessage])

    // Edit Message Method
    const editMessage = useCallback(() => {
        onEditMessage(editedMessage, editedMessageSerial)
        setOpenEditMessageDialog(false)
    }, [editedMessage, editedMessageSerial])

    // Min and Max EditedMessage Index Handler
    const handleOnChangeEditedMessageIndex = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const serialNumber = +event.target.value
        if (serialNumber <= 0 || serialNumber  > messages.length) return
        setEditedMessageSerial(serialNumber)
    }, [messages])

    return (
        <div className={classes.Wrapper}>
            {/* Background Image */}
            <img className={classes.backgroundImage} src={backgroundContextImage} />
            <div className={classes.messageContainer}>
                {
                    messages.map((mes, index) => (
                        <Grow in={true} key={mes?.id}>
                            <div className={classes.messageGroupWrapper}>
                                <div className={classes.indexNumber}>{index + 1}</div>
                                <div className={
                                    [
                                        classes.messageWrapper,
                                        classes[`position_${mes?.context_position}`]
                                    ].join(' ')
                                }>
                                    <p className={
                                        [
                                            classes.message,
                                            classes[`position_${mes?.context_position}`]
                                        ].join(' ')
                                    }>
                                        { mes?.message }
                                    </p>
                                </div>
                                <div className={classes[`position_${mes?.context_position}`]}>
                                    <IconButton aria-label="delete" size="small" className={classes.messageActionButton}  style={{backgroundColor: '#ff7675'}} onClick={() => handleDeleteMessage(mes?.id)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton aria-label="edit" size="small" className={classes.messageActionButton}  style={{backgroundColor: '#00b894'}} onClick={() => openEditDialog(mes?.id, index)}>
                                        <EditIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                                <div className={
                                    [
                                        classes.messageCharacterWrapper,
                                        classes[`position_${mes?.context_position}`]
                                    ].join(' ')
                                } style={{color: mes?.character?.color}}>
                                    <Chip
                                        label={mes?.character?.name}
                                        avatar={<Avatar><AccountCircleIcon /></Avatar>}
                                        style={{borderColor:  mes?.character?.color}}
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                        </Grow >    
                    ))
                }
            </div>

            <div className={classes.bottonContainer}>
                <div>Choose Character Component</div>
                <div>Add Character Input Component</div>
            </div>
        
            <ConfirmDialog confirmDialogHook={useConfirmDialogHook} onConfirm={deleteMessage}/>
            
            <Dialog aria-labelledby="Edit-Message-Dialog" open={openEditMessageDialog} fullWidth >
                <DialogTitle id="Edit-Message-Dialog"> စာသားကို ပြုပြင်မည် </DialogTitle>
                <DialogContent>

                    <FormControl size="small" fullWidth={true}>
                        <TextField
                            label="ပြုပြင်ရန် စာသားရိုက်ပါ"
                            variant="outlined"
                            className="mmFont"
                            size="small"
                            name="message"
                            value={editedMessage?.message}
                            onChange={handleInputEditedMessage}
                        />
                    </FormControl>

                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup 
                            row
                            aria-label="context_position"
                            color="primary"
                            name="context_position"
                            value={editedMessage?.context_position}
                            onChange={handleInputEditedMessage}
                        >
                            <FormControlLabel value="LEFT" control={<Radio color="primary" />} label="ဘယ်ဘက်" />
                            <FormControlLabel value="CENTER" control={<Radio color="primary" />} label="အလယ်နေရာ(အတွေး)" />
                            <FormControlLabel value="RIGHT" control={<Radio color="primary" />} label="ညာဘက်" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl size="small" fullWidth={true}>
                        <TextField
                            label="အမှတ်စဉ် နံပါတ်"
                            type="number"
                            variant="outlined"
                            className="mmFont"
                            size="small"
                            name="message"
                            value={editedMessageSerial}
                            onChange={handleOnChangeEditedMessageIndex}
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button color="default" variant="outlined" fullWidth={true} onClick={() => setOpenEditMessageDialog(false)}>
                        မလုပ်ဆောင်ပါ
                    </Button>
                    <Button color="primary" disabled={!editedMessage?.message?.trim()} variant="contained" fullWidth={true} onClick={editMessage}>
                        လုပ်ဆောင်မည်
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    Wrapper: {
        position: 'relative',
        maxWidth: '500px',
        margin: '0 auto',
        height: 'calc(100vh - 157px)',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        borderRadius: 8
    },

    messageContainer: {
        height: '100%',
        overflowY: 'auto',
        paddingBottom: 53
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

    // Index Number
    indexNumber: {
        position: 'absolute',
        display: 'inline-block',
        top: '1rem',
        left: 3,
        border: '3px solid #808080',
        padding: '.1rem .2rem',
        borderRadius: 6,
        fontSize: 10
    },

    // Message List
    messageGroupWrapper: {
        border: '1px solid #424242',
        padding: '.8rem .75rem .8rem 2.25rem',
        position: 'relative'
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
        margin: 0,
        marginTop: 6
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
    },
    messageActionButton: {
        margin: '.3rem'
    },

    // Choose Character And Keyboard
    bottonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 51,
        background: '#3e3e3e'
    },
    
}));

export default MessageEditor