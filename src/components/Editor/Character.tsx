import { Fab, makeStyles, Chip, Avatar, FormControl, TextField } from '@material-ui/core'
import {EditorHook} from '../../hooks/editorHook'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ColorizeIcon from '@material-ui/icons/Colorize'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

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

    return (
        <>
            <div className={classes.selectedCharacterContainer}>
                { characters?.map(char => (
                     <Chip
                        label={char?.name}
                        avatar={<Avatar><AccountCircleIcon /></Avatar>}
                        clickable
                        className={classes.margin}
                        style={{borderColor: char?.color}}
                        onDelete={() => onDeleteCharacter(char?.id)}
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
                            disabled={!characterName?.trim() || !selectedColor}
                        >
                            ဇာတ်ကောင် ထည့်မည်
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                    { colors?.map((color) => (
                        <Fab 
                            key={color} 
                            style={{backgroundColor: color}} 
                            variant={color === selectedColor ? 'extended': 'round'}
                            size="small" aria-label="add" 
                            className={classes.margin}
                            onClick={() => onSelectColor(color)}
                        >
                            <ColorizeIcon /> { color === selectedColor ? 'ရွေးချယ်ထားသည်' : null}
                        </Fab>))
                    }
                </Grid>
            </Grid>
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

export default Character