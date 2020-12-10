import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { childrenProps } from '../../../config';
import { Button } from '@material-ui/core';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 280
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    minHeight: 160,
    maxHeight: 160
  },
  cover: {
    width: 101,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    minWidth: 150
  }
}))

interface StoryCardSwiperProps extends childrenProps{
    id: string
    title: string
    description: string
    image: string

    isLoadComponent?: boolean
}

export default function StoryCardSwiperItem({ id, title, description, image, isLoadComponent, children}: StoryCardSwiperProps): JSX.Element {
    const classes = useStyles()

    const CardComponent = isLoadComponent === true ? 
        (
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        { children }
                    </CardContent>
                </div>
            </Card>
        ) : (
            <Card className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6" className={classes?.title}>
                        { title }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        { description }
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/author/story/${id}`} passHref>
                      <Button variant="contained" size="small" color="primary">
                        View Detail
                      </Button>
                    </Link>
                  </CardActions>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={image}
                    title={title}
                />
            </Card>
        )
    
    return CardComponent
}
