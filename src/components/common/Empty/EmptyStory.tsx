import { makeStyles, Typography } from "@material-ui/core"

interface EmptyStoryProps {
    title?: string
    type?: 'welcome' | 'empty'
}

const EmptyStory = ({title = 'Empty Data', type = 'empty'}: EmptyStoryProps): JSX.Element => {
    const classes = useStyles()

    return (
        <div className={classes.container}>

            <img className={classes.svgContainer} src={`images/${type === 'empty' ? 'no-data' : 'welcome-cat'}.svg`} />

            <Typography variant="h6" component="h6" className="mmFont">
                {title}
            </Typography>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        padding: '3rem',
        margin: '.8rem 0',
        background: '#2b2b2b',
        borderRadius: '1rem',

        "& h6": {
            margin: '.3rem 0',
            textAlign: 'center'
        }
    },

    svgContainer: {
        width: '10rem',
        margin: '0 auto',
        display: 'block'
    }
}))

export default EmptyStory