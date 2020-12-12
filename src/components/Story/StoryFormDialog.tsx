import React, { useRef, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { AddCircleOutline, CloseOutlined } from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';
import { FormControl,  makeStyles, MenuItem, Slide, AppBar, Toolbar, IconButton, Typography, Card, CardContent, CardMedia, CircularProgress, LinearProgress } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';
import { CATEGORY_LIST } from '../../../config'
import { StoryFormHook } from '../../hooks/storyFormHook'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface StoryFormDialogProps {
  dialogTitle?: string
  isShowCreateButton?: boolean,
  storyFormHook: StoryFormHook
  onCreateStorySuccess ?: (data: any) => void
}

export default function StoryFormDialog(
  { 
    dialogTitle = 'Story အသစ်ထည့်မည်',
    isShowCreateButton = false,
    storyFormHook,
    onCreateStorySuccess
  } : StoryFormDialogProps
): JSX.Element {
  const classes = useStyle()

  const {
    // Dialog
    open,
    handleClickOpen,
    handleClose,

    // Form Handle
    handleChanges,
    onCreateStory,
    uploadImage,
    // resetFormData,

    // Data
    storyFormLoading,
    formData: data,
    imageUploadLoading
  } = storyFormHook

  const imageFormRef = useRef<HTMLInputElement>(null)

  const imageOnChnage = () => {
    const { files } = imageFormRef?.current
    const imageFile = files[0]
    try {
      if (imageFile) { uploadImage(imageFile) }
      imageFormRef.current.value = null
    } catch (e) {
      console.log(e)
      imageFormRef.current.value = null
    }
  }

  const saveNewStory = useCallback( async () => {
    const resData = await onCreateStory()
    if (resData && onCreateStorySuccess) {
      onCreateStorySuccess(resData)
    }
  },[data])

  return (
    <>
      {
        isShowCreateButton &&
        <Button variant="outlined" color="primary" onClick={handleClickOpen} className="mmFont">
          <AddCircleOutline  className={classes.addCircleIcon} /> Story အသစ်ထည့်မည်
        </Button>
      }
      <Dialog 
        fullScreen 
        open={open} 
        onClose={handleClose} 
        maxWidth={'sm'}
        aria-labelledby="story-form-dialog"
        className={classes.root}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              { dialogTitle }
            </Typography>
            <Button autoFocus variant="text" color="inherit" onClick={saveNewStory} disabled={storyFormLoading}>
              Save
              { storyFormLoading && <CircularProgress size={22} color="secondary" className={classes.circleLoaded}/>}
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Card className={classes.dialogContent}>
            { storyFormLoading && <LinearProgress />}
            <CardContent>
            <FormControl size="small" fullWidth={true}>
              <TextField
                label="ခေါင်းစဉ်"
                variant="outlined"
                className="mmFont"
                helperText="ခေါင်းစဉ်ထည့်ပေးရန်လိုအပ်ပါသည်။"
                size="small"
                name="title"
                value={data.title}
                onChange={handleChanges}
                disabled={storyFormLoading}
              />
            </FormControl>
            <FormControl fullWidth={true}>
              <TextField
                label="အကြောင်းအရာ"
                variant="outlined"
                className="mmFont"
                helperText="အတိုချုပ် အကြောင်းအရာကို စာဖတ်သူစိတ်ဝင်စားအောင် ထည့်မည်။"
                size="small"
                value={data.description}
                name="description"
                onChange={handleChanges}
                disabled={storyFormLoading}
              />
            </FormControl>
            <FormControl fullWidth={true}>
              <TextField
                className="mmFont"
                select
                size="small"
                label="Story အမျိုးအစား"
                helperText="Story အမျိုးအစားကို ရွေးပေးရပါမည်"
                variant="outlined"
                value={data.category}
                name="category"
                onChange={handleChanges}
                disabled={storyFormLoading}
              >
                { CATEGORY_LIST?.map(cat => ( <MenuItem key={cat.value} value={cat.value}>{cat.title}</MenuItem>)) }
              </TextField>
            </FormControl>
            <FormControl fullWidth={true}>
              <Button
                variant="outlined"
                component="label"
                color="primary"
                className="mmFont"
                fullWidth={true}
                disabled={imageUploadLoading}
              >
                ပုံရွေးပြီးတင်မည်

                { imageUploadLoading && <CircularProgress size={22} className={classes.circleLoaded}/>}

                <input
                  type="file"
                  ref={imageFormRef}
                  onChange={imageOnChnage}
                  hidden
                />
              </Button>
            </FormControl>
            
            <CardMedia
              className={classes.media}
              image={data.image}
              title="Paella dish"
            />
            
            <FormControl fullWidth={true}>
              <Button
                variant="contained"
                component="label"
                color="primary"
                className="mmFont"
                fullWidth={true}
                onClick={saveNewStory}
                disabled={storyFormLoading}
              >
                { 
                  storyFormLoading ? 
                  <> 
                    Loading 
                    <CircularProgress size={22} className={classes.circleLoadedWhite}/>
                  </>
                  : 'Story ပြုလုပ်မည်'
                }
              </Button>
            </FormControl>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}


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
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialogContent: {
    maxWidth: 400,
    margin: '0 auto',
    backgroundColor: '#474747'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 8,
    marginTop: 3,
    marginBottom: 3
  },
  circleLoaded: {
    marginLeft: 8
  },
  circleLoadedWhite: {
    marginLeft: 8,
    color: '#ffffff'
  }
}))

