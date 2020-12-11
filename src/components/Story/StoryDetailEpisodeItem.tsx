import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto'
  },
  media: {
    height: 140,
  },
});

interface StoryDetailEpisodeItemProps {
    episodeId: string
    storyImage: string
    title: string
    description: string
    accessModify?: boolean
    episodeNo: number
    episodeIsPublised: boolean

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
        publishEpisode
    }: StoryDetailEpisodeItemProps
): JSX.Element => {
    const classes = useStyles()
  
    return (
      <Card className={[classes.root, 'mmFont'].join(' ')}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={storyImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { title }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Episode: { episodeNo }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {
            accessModify && 
            <Button 
              variant="outlined" size="small"
              color="primary" fullWidth={true} 
              disabled={episodeIsPublised}
              onClick={() => publishEpisode( episodeId )}
            >
                 { episodeIsPublised ? 'တင်ပြီးအပိုင်းဖြစ်သည်' : 'အပိုင်း တင်မည်'}  
            </Button> 
          }
          <Button variant="contained" size="small" color="primary" fullWidth={true}>
            ဖတ်မည်
          </Button>
        </CardActions>
      </Card>
    );
  }

export default StoryDetailEpisodeItem
