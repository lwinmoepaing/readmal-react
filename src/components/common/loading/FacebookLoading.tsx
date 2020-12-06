import { LinearProgress, makeStyles, Typography } from "@material-ui/core"
// Redux Connect

// Material
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FacebookIcon from '@material-ui/icons/Facebook'

const FacebookLoading = () => {
    const classes = useStyles()

    return (
      <Card className={classes.cardRoot}>
        <LinearProgress />
        <CardContent className={classes.cardContent}>
          <FacebookIcon className={classes.loadingIcon}  fontSize="large"/>
          <Typography variant="body2" component="p">
              Loading ...
          </Typography>
        </CardContent>
      </Card>
    )
}

const useStyles = makeStyles({
    loadingIcon: {
      margin: '1.5rem auto',
      color: "#7e9bd8"
    },
  
    cardRoot: {
      maxWidth: 300,
      margin: '5rem auto',
      textAlign: 'center'
    },
  
    cardContent: {
      paddingBottom: '.8rem',
    },
  
    mb1: {
      marginBottom: '.8rem'
    }
  })

export default FacebookLoading