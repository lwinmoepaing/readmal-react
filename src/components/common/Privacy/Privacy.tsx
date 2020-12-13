import { Button, Typography } from "@material-ui/core"
import Link from 'next/link'

const Privacy = (): JSX.Element => {
    return (
        <div style={{maxWidth: 500, margin: '0 auto'}}>
            <br />
            <Typography variant="h5" component="h5">
                At Readmal Touch Story Platform 
            </Typography>
            <br />
            <Typography variant="body2" component="p">
                Accessible from https://readmal.com/, 
                This Privacy Policy document contains types of information that is collected and recorded by Readmal Platform 
            </Typography>
            <Typography variant="body2" component="p">
                And how we use it.One of our main priorities is the privacy of our visitors. 
            </Typography>
            <br />
            <Typography variant="h5" component="h5">
                Cookies 
            </Typography>
            <br />
            <Typography variant="body2" component="p">
                Like any other website, Readmal uses 'cookies'. These cookies are used to store information including visitors' preferences
            </Typography>

            <br />
            <Link href="/" passHref>
                <Button color="primary" variant="contained" size="small">
                    Go Back Home
                </Button>
            </Link>
           
        </div>
    )
}

export default Privacy