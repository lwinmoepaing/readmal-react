import { Button, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const BackButton = (): JSX.Element => {
  const router = useRouter()
  const classes = useStyles()

  return (
    <Button className={['mmFont', classes.Button].join(' ')} variant="outlined" color="primary" onClick={() => router.back()}>
        <ArrowBackIcon className={classes.Icon} />
        နောက်သို့
    </Button>
  )
}

const useStyles = makeStyles(() => ({
    Button: {
        margin: '0 .4rem'
    },
    Icon: {
        marginRight: 4
    }
}))

export default BackButton