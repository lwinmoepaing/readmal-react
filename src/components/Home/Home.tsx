import { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import Router from 'next/router'
import { contextType } from '../../../model/Context'
import { Button } from "@material-ui/core"
import { API_URL, BASE_API_URL } from '../../../config'
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
       
        {/* Second Section Left Grid */}
        <Grid item xs={12} sm={3} md={6} className={classes.LogoContainer}>

          <img src="/logo.png"  className={classes.Logo} />
          
          {
            isAuth ?
              <Link href="/me" passHref>
                <Button variant="outlined" color="primary" fullWidth={true} >Me</Button>
              </Link> :
              <Button variant="contained" color="primary" onClick={loginWithFacebook} fullWidth={true} className={classes.Button}>
                Login With Facebook
              </Button>
          }

          <Link href="/about" passHref>
            <Button variant="text" color="primary" fullWidth={true} className={classes.Button}> About </Button>
          </Link>
          
          <Link href="/privacy" passHref>
            <Button variant="text" color="primary" fullWidth={true} className={classes.Button}> Privacy </Button>
          </Link>

        
        </Grid>
        {/* Second Section Left Grid Finished */}

        {/* First Section Left Grid */}
        <Grid item xs={12} sm={9} md={6}>
          <div className="iphone-x" onClick={onPress} >
            <img className={classes.backgroundImage} src={`${BASE_API_URL}/episodes/background_context.jpg`} />
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
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  Logo: {
    backgroundColor: '#fff',
    display: 'block',
    width: 250,
    borderRadius: 250,
    margin: '0 auto',
    marginBottom: '2.3rem',
  },
  
  LogoContainer: {
    marginBottom: '2.2rem'
  },

  Button: {
    margin: '.25rem 0'
  },
  
  root: {
    flexGrow: 1,
    marginTop: '3rem'
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

export default Home