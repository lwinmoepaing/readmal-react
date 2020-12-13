import { Typography, Button } from "@material-ui/core"
import Link from 'next/link'

const About = (): JSX.Element => {
    return (
        <div style={{maxWidth: 500, margin: '0 auto'}}>
            <br />
            <Typography variant="h5" component="h5">
                At Readmal Touch Story Platform 
            </Typography>
            <br />
            <Typography variant="body2" component="p">
                To become a modern literature for readers, authors , 
            </Typography>
            <br />
            <Typography variant="body2" component="p">
                We created this Platform .
            </Typography>
            <br />
            <Typography variant="body2" component="p">
                We would like to create a new storyline together.
            </Typography >
            <br />
            <Link href="/" passHref>
                <Button color="primary" variant="contained" size="small">
                    Go Back Home
                </Button>
            </Link>
        </div>
    )
}

export default About