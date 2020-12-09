import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { AddCircleOutline } from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core'

const useStyle = makeStyles( theme => ({
  addCircleIcon : {
    marginRight: 10
  },
  titleWidth: {
    width: 330
  },
  root: {
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(.5),
      marginBottom: theme.spacing(.5),
    },
  },
}))


export default function StoryFormDialog(
  { dialogTitle = 'Story အသစ်ထည့်မည်'}
): JSX.Element {
  const classes = useStyle()

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Horror')
  const [image, setImage] = useState('')
  const [addableEpisodeCount, setAddableEpisodeCount] = useState(0)
  const [isIncludingPremium, setIsIncludingPremium] = useState(false)
  const [author, setAuthor] = useState('')


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className="mmFont">
        <AddCircleOutline  className={classes.addCircleIcon} /> Story အသစ်ထည့်မည်
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth={'md'}
        aria-labelledby="story-form-dialog"
        className={classes.root}
      >
        <DialogTitle id="story-form-dialog" className={`mmFont ${classes.titleWidth}`}> {dialogTitle} </DialogTitle>
        <DialogContent>

          <FormControl size="small" fullWidth={true}>
            <TextField
              label="Title"
              variant="outlined"
              className="mmFont"
              helperText="ခေါင်းစဉ်ထည့်ပေးရန်လိုအပ်ပါသည်။"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField
              label="Description"
              variant="outlined"
              className="mmFont"
              helperText="စာလုံးရေအနည်းငယ်နှင့် အတိုချုပ် story အကြောင်းအရာကို စာဖတ်သူစိတ်ဝင်စားအောင် ထည့်မည်။"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField
              label="Category"
              variant="outlined"
              className="mmFont"
              helperText="Story အမျိုးအစားကို ရွေးပေးရပါမည်"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField
              label="Image"
              variant="outlined"
              className="mmFont"
              helperText="ပုံထည့်ရန်"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField
              label="AddableEpisodeCount"
              variant="outlined"
              className="mmFont"
              helperText="စာရေးဆရာထည့်သွင်းနို်ငသော episode အရေအတွက်"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth={true}>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create 
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
