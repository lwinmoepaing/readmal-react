import { Fab, makeStyles, Chip, Avatar, FormControl, TextField, Typography } from '@material-ui/core'
import {EditorHook} from '../../hooks/editorHook'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ColorizeIcon from '@material-ui/icons/Colorize'
import DoneIcon from '@material-ui/icons/Done'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ConfirmDialog from '../common/ConfirmDialog/ConfirmDialog'
import confirmDialogHook from '../../hooks/confirmDialogHook'
import { useCallback, useState } from 'react'

interface CharacterProps {
    editorHook: EditorHook
}

const Character = ({editorHook}: CharacterProps): JSX.Element => {
    const classes = useStyles()
    const { 
        characterName,
        characters, 
        colors, 
        selectedColor, 
        // All Methods
        onSelectColor, 
        onDeleteCharacter,
        onChangeCharacterName,
        onCreateCharacter,
    } = editorHook

    const [deletedCharacterId, setDeletedCharacterId] = useState<string | null>(null)
    const useConfirmDialogHook = confirmDialogHook('ဇာတ်ဆောင် Character ကို delete မည်', 'Character ရေးထားသော အကြောင်းအရာ message များပျက်သွားနိုင်ပါသည်။')
    const { openConfirmDialog, setConfirmDialogText } = useConfirmDialogHook

    const handleDeleteCharacter = useCallback((characterId: string) => {
        setDeletedCharacterId(characterId)
        const character = characters.find(char => char.id === characterId)
        setConfirmDialogText(`${character?.name} ဆိုသော ဇာတ်ဆောင်ကို ထုတ်ပယ်မည်`, `${character?.name} Character ရေးထားသော အကြောင်းအရာ message များပျက်သွားနိုင်ပါသည်။`)
        openConfirmDialog()
    }, [characters, deletedCharacterId])

    const deleteCharacter = useCallback((val: boolean) => {
        if (val) onDeleteCharacter(deletedCharacterId)
    }, [deletedCharacterId])

    const onEnterKeyCharacterNameInput = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event?.code === 'Enter' || event?.key === 'Enter') onCreateCharacter()
    }, [characters, characterName])

    return (
        <>
            <div className={classes.selectedCharacterContainer}>
                { characters?.map(char => (
                     <Chip
                        key={char?.id}
                        label={char?.name}
                        avatar={<Avatar><AccountCircleIcon /></Avatar>}
                        clickable
                        className={classes.margin}
                        style={{borderColor: char?.color}}
                        onDelete={() => handleDeleteCharacter(char?.id)}
                        variant="outlined"
                    />
                ))}
            </div>

            <Grid container >
                <Grid item xs={12} md={4}>
                    <FormControl 
                        fullWidth={true} 
                        className={classes.padding}
                    >
                        <TextField
                            label="ဇာတ်ကောင်နာမည်ရိုက်ပါ"
                            variant="outlined"
                            className="mmFont"
                            size="small"
                            value={characterName}
                            onChange={onChangeCharacterName}
                            name="description"
                            onKeyUp={onEnterKeyCharacterNameInput}
                        />
                    </FormControl>
                    <FormControl 
                        fullWidth={true} 
                        className={classes.padding}
                    >
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            className="mmFont"
                            fullWidth={true}
                            onClick={onCreateCharacter}
                            disabled={!characterName?.trim()}
                        >
                            ဇာတ်ကောင် ထည့်မည်
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography className={['mmFont', classes.padding].join(' ')} variant="body2">
                        အရောင်များကို နှိပ်ပြိးရွေးချယ်ပါ
                    </Typography>
                    { colors?.map((color) => (
                        <Fab 
                            key={color} 
                            style={{backgroundColor: color}} 
                            variant={color === selectedColor ? 'extended': 'round'}
                            size="small" aria-label="add" 
                            className={classes.margin}
                            onClick={() => onSelectColor(color)}
                        >
                            { color === selectedColor ? (
                                <> 
                                    <DoneIcon />  'ရွေးချယ်ထားသည်'
                                </>
                            ) : <ColorizeIcon />}
                        </Fab>))
                    }
                </Grid>
            </Grid>
        
            <ConfirmDialog confirmDialogHook={useConfirmDialogHook} onConfirm={deleteCharacter}/>
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
        padding: '.5rem .5rem .8rem .5rem'
    },
    selectedCharacterContainer: {
        textAlign: 'center', borderBottom: '1px solid #464646', marginBottom: 8, paddingBottom: 4
    }
}));

export default Character