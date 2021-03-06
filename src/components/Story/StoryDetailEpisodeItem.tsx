import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import {FacebookShareButton, FacebookIcon} from "react-share"
       
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto'
  },
  media: {
    height: 140,
  },
  fbIcon: {
    display: 'block',
    width: '95%', 
    backgroundColor: 'rgb(59, 89, 152)!important',
    margin: '0 auto',
    borderRadius: 6,
    height: 29,
  }
})

interface StoryDetailEpisodeItemProps {
    episodeId: string
    storyImage: string
    title: string
    description: string
    accessModify?: boolean
    episodeNo: number
    episodeIsPublised: boolean
    goEpisodeRoute?: string

    publishEpisode?: (episode_id: string) => void
}

const StoryDetailEpisodeItem = (
    { 
        episodeId, 
        storyImage, 
        title, 
        accessModify, 
        episodeNo, 
        episodeIsPublised, 
        publishEpisode,
        goEpisodeRoute = '/user/episode'
    }: StoryDetailEpisodeItemProps
): JSX.Element => {
    const classes = useStyles()

    const Router = useRouter()
    const goEpisodeDetail = useCallback(() => {
        Router.push(`${goEpisodeRoute}/${episodeId}`)
    }, [])
  
    return (
      <Card className={[classes.root, 'mmFont'].join(' ')}>
        <CardActionArea disabled={!episodeIsPublised && !accessModify} onClick={goEpisodeDetail}>
          <CardMedia
            className={classes.media}
            image={storyImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography className="mmFont" gutterBottom variant="h5" component="h2">
              { title }
            </Typography>
            
            <Typography className="mmFont" variant="body2" color="textSecondary" component="div">
              အပိုင်း: { episodeNo } 
            </Typography>
          </CardContent>
        </CardActionArea>
        <div>
          <FacebookShareButton 
            url={`https://readmal.com/episode/${episodeId}`}
            quote={`Readmal မှာ ဖတ်မယ်(${title})`}
            hashtag="#ReadMal"
            className={classes.fbIcon}
          >
            <FacebookIcon size={28} />
          </FacebookShareButton>
        </div>
        <CardActions>
          {
            accessModify && !episodeIsPublised &&
            <Button 
              variant="outlined" size="small"
              color="primary" fullWidth={true} 
              disabled={episodeIsPublised}
              onClick={() => publishEpisode( episodeId )}
            >
                အပိုင်း တင်မည် 
            </Button> 
          }
         
          <Button 
            variant="contained" 
            size="small" 
            color="primary" 
            fullWidth={true}
            disabled={!episodeIsPublised && !accessModify}
            onClick={goEpisodeDetail}
          >
            { !episodeIsPublised && !accessModify ?  'ရေးသားနေဆဲဖြစ်သည်' : 'ဖတ်မည်' }
          </Button>
        </CardActions>
      </Card>
    );
  }

export default StoryDetailEpisodeItem
