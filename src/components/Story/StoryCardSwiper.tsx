import { Button, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import Carousel from "react-multi-carousel";
import { CarouselResponsive, childrenProps } from "../../../config";
import StoryCardSwiperItem from './StoryCardSwiperItem';

interface StoryCardSwiper extends childrenProps {
    stories: any[]
    storyLoading: boolean
    hasNextPage?: boolean
    loadStory(): void
}


const useStyle = makeStyles(theme => (
    {
        loaded: {
            marginTop: 63,
            marginLeft: 52,
        },
        circleLoaded: {
            marginLeft: 10
        }
    }
));

const StoryCardSwiper = (
    {stories = [], loadStory, hasNextPage, storyLoading, children}: StoryCardSwiper
): JSX.Element => {
    const classes = useStyle()
    
    const LoadComponent = (
        <div
            key={`${Math.random()}_load`}
        >
            <Button
                className={classes.loaded}
                variant="contained"
                color="primary"
                onClick={loadStory} disabled={storyLoading}
            >
                Load Stories {storyLoading && <CircularProgress size={22} className={classes.circleLoaded}/>}
            </Button>
        </div>
    )

    const StoryComponents =  stories?.map(story => (
        <StoryCardSwiperItem
            key={story?._id}
            title={story?.title}
            description={story?.description} 
            image={story?.image}
        />
    ))

    if (hasNextPage) {
        StoryComponents.push(LoadComponent)
    }

    return (
        <div className="CustomContainer">
            <Typography variant="h6" component="h6" className="mmFont">
                နောက်ဆုံး Story များ { children }
            </Typography>
            <br />
            <Carousel responsive={CarouselResponsive} >
                { 
                    stories?.length ? StoryComponents : LoadComponent
                }
            </Carousel>
        </div>
    )
}

export default StoryCardSwiper