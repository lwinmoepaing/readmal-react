import Carousel from "react-multi-carousel";
import { CarouselResponsive } from "../../../config";


const StoryCardSwiper = (): JSX.Element => {
    return (
        <Carousel responsive={CarouselResponsive} no-ssr={true}>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
        </Carousel>
    )
}

export default StoryCardSwiper