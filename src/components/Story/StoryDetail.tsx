import React, { useCallback, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Backdrop, Switch, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import storyDetailHook from '../../hooks/storyDetailHook'
import { AuthReducerType } from '../../../store/reducers/AuthReducer'
import StoryDetailEpisodeItem from './StoryDetailEpisodeItem'
import { BASE_API_URL } from '../../../config'

interface StoryDetailType {
    story: any
    Auth?: AuthReducerType
}

const StoryDetail = ({ story: fetchStory, Auth }: StoryDetailType): JSX.Element => {
    const classes = useStyles()

    const [story, setStory] = useState<any | null>(fetchStory)
    const [storyIsPublished, setStoryIsPublished] = useState<boolean>(story?.is_published ?? false)
    const [storyIsFinished, setStoryIsFinished] = useState<boolean>(story?.is_finished ?? false)


    // use Story Detail Hook
    const {
        storyPublishLoading,
        storyFinishLoading,
        storyEpisodePublishLoading,
        publishStory,
        finishStory,
        publishStoryEpisode
    } = storyDetailHook({ token: Auth?.token })

    // Access Permission
    const accessPermission :boolean = Auth?.authInfo?.role === 'ADMIN' ||
        Auth?.authInfo?.role === 'AUTHOR' && story?.author?._id === Auth?.authInfo?._id
    
    const handleChangeStatus = async (status: 'published' | 'finished') => {
        if (status === 'published') {
            const isPublishedStory = await publishStory(story?._id)
            setStoryIsPublished(isPublishedStory)
        }

        if (status === 'finished') {
            const isFinishedStory = await finishStory(story?._id)
            setStoryIsFinished(isFinishedStory)
        }
    }

    const publishEpisode = useCallback(async (episode_id: string) => {
        const isPublishedEpisode: boolean = await publishStoryEpisode(episode_id)
        if (isPublishedEpisode) {
            const episodes = story.episodes ?? []
            const getIndex = episodes.findIndex(ep => ep._id === episode_id)
            episodes[getIndex].is_published = true

            setStory(prev => ({
                ...prev,
                episodes
            }))
        }
    }, [story])

    return (
        <>
            <Grid container spacing={3} className={classes.root} style={{backgroundImage: `url(${story?.image})`}}>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <div className={classes.textContainer}>

                        <Typography variant="h4" component="h4" className={classes.textLineHeight}>
                            {story?.title}
                        </Typography>

                        <Typography variant="h6" component="h6" className={classes.textLineHeight}>
                            {story?.description}
                        </Typography>

                        <Typography variant="body2" className={classes.textLineHeight}>
                            <Switch
                                color="primary"
                                checked={storyIsPublished}
                                onChange={() => handleChangeStatus('published')}
                                name="is_published"
                                disabled={storyIsPublished || storyPublishLoading}
                            />
                            { storyPublishLoading && <CircularProgress size={20} className={classes.publishedStoryLoading} /> }
                            Publish { storyIsPublished ? 'တင်ပြီးပါပြီ' : 'တင်မည်' }
                        </Typography>

                        {
                            storyIsPublished && !storyIsFinished && 
                            <Typography variant="body2" className={classes.textLineHeight}>
                                <Switch
                                    color="primary"
                                    checked={storyIsFinished}
                                    onChange={() => handleChangeStatus('finished')}
                                    name="is_finished"
                                    disabled={storyIsFinished || storyFinishLoading}
                                />
                                { storyFinishLoading && <CircularProgress size={20} className={classes.publishedStoryLoading} /> }
                                { storyIsFinished ? 'ဇာတ်လမ်းပြီးဆုံးပါပြီ' : 'ဇာတ်သိမ်းမည်။' }
                            </Typography>
                        }

                        { story?.addable_episode_count > 0 &&
                            <Typography variant="body2" className={classes.textLineHeight}>
                                Episode {story?.addable_episode_count} ပိုင်း ထည့်သွင်းနိုင်ပါသည် 
                            </Typography>
                        }


                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                { 
                    story?.episodes
                     ?.sort((a, b) => b?.episode_number - a?.episode_number )
                     ?.map(episode =>
                        <Grid item xs={12} sm={4} key={episode?._id} >
                            <StoryDetailEpisodeItem
                                episodeId={episode?._id}
                                title={episode?.title}
                                storyImage={`${BASE_API_URL}/episodes/${story?.category}.jpg`}
                                description={episode?.description}
                                episodeNo={episode?.episode_number}
                                episodeIsPublised={episode?.is_published}
                                accessModify={accessPermission}

                                publishEpisode={publishEpisode}
                            />
                        </Grid>    
                    )
                }
            </Grid>
            {/* OverLay Loading */}
            <Backdrop open={storyEpisodePublishLoading} className={classes.backdrop}>
                <CircularProgress color="primary" />
            </Backdrop>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      marginBottom: '2rem',
      borderRadius: 8
    },
    paper: {
     position: 'relative',
     '&::after': {
        content: '""',
        display: 'block',
        width: '100%',
        position: 'absolute',
        top: 0,
        right: -120,
        left: 0,
        bottom: 0,
        background: 'linear-gradient(to right,#212121 0,rgba(33, 33, 33,.98) 20%,rgba(33, 33, 33,.97) 25%,rgba(33, 33, 33,.95) 35%,rgba(33, 33, 33,.94) 40%,rgba(33, 33, 33,.92) 45%,rgba(33, 33, 33,.9) 50%,rgba(33, 33, 33,.87) 55%,rgba(33, 33, 33,.82) 60%,rgba(33, 33, 33,.75) 65%,rgba(33, 33, 33,.63) 70%,rgba(33, 33, 33,.45) 75%,rgba(33, 33, 33,.27) 80%,rgba(33, 33, 33,.15) 85%,rgba(33, 33, 33,.08) 90%,rgba(33, 33, 33,.03) 95%,rgba(33, 33, 33,0) 100%)'
      },
    },

    textContainer: {
      zIndex: 1,
      position: 'relative',
      padding: '2rem 1rem'
    },

    textLineHeight: {
      marginTop: 7,
      marginBottom: 7
    },

    publishedStoryLoading: {
        top: 6,
        position: 'relative',
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }),
);

export default StoryDetail
// linear-gradient(to right,#171717 0,rgba(33, 33, 33,.98) 20%,rgba(33, 33, 33,.97) 25%,rgba(33, 33, 33,.95) 35%,rgba(33, 33, 33,.94) 40%,rgba(33, 33, 33,.92) 45%,rgba(33, 33, 33,.9) 50%,rgba(33, 33, 33,.87) 55%,rgba(33, 33, 33,.82) 60%,rgba(33, 33, 33,.75) 65%,rgba(33, 33, 33,.63) 70%,rgba(33, 33, 33,.45) 75%,rgba(33, 33, 33,.27) 80%,rgba(33, 33, 33,.15) 85%,rgba(33, 33, 33,.08) 90%,rgba(33, 33, 33,.03) 95%,rgba(33, 33, 33,0) 100%);