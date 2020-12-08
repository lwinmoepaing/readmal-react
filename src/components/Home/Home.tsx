import { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import Router from 'next/router'
import { contextType } from '../../../model/Context'
import { Button } from "@material-ui/core"
import { API_URL } from '../../../config'
import MessageList from '../Message/MessageList'
import TouchAppIcon from '@material-ui/icons/TouchApp';

interface HomeProps {
  messages: contextType[] | null,
  onPress(),
  isAuth: boolean,
  finishedStory: boolean
}

const Home = ({ messages, onPress, isAuth, finishedStory }: HomeProps) => {
  const classes = useStyles()

  const loginWithFacebook = useCallback( () => {
    Router.push(`${API_URL}/auth/social/facebook`)
  }, [])

  return (
    <div className={classes.root} >
      <Grid container spacing={3}>

        {/* First Section Left Grid */}
        <Grid item xs={12} sm={9} md={7}>
          <div className="iphone-x" onClick={onPress}>
            <i>Speaker</i>
            <div className={classes.messageWraper}>
              {
                messages &&
                messages.map(
                  (message: contextType, index) => <MessageList  key={`${message.id}_${index}`} {...message} />
                )
              }
            </div>

            {
              !finishedStory &&
              <TouchAppIcon className={`${classes.touchIcon} pulse`}/>
            }
          </div>
        </Grid>
        {/* First Section Left Grid Finished */}

        {/* Second Section Left Grid */}
        <Grid item xs={12} sm={4} md={5}>
          {
            isAuth ?
              <Link href="/me" passHref>
                <Button variant="outlined" color="primary" >Me</Button>
              </Link> :
              <Button variant="contained" color="primary" onClick={loginWithFacebook}>
                Login With Facebook
              </Button>
          }
        </Grid>
        {/* Second Section Left Grid Finished */}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '1rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 320,
    minHeight: 528
  },
  messageWraper: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  touchIcon: {
    position: 'absolute',
    padding: 6,
    bottom: 25,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 45
  }
}))

export default Home