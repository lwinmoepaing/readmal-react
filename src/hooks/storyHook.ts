import { Dispatch, SetStateAction, useState } from "react";
import { API_URL, BASE_API_URL, MetaDataType } from "../../config";
import { AuthReducerType } from "../../store/reducers/AuthReducer";

interface StoryHookProps {
    token?: string,
}

interface StoryHookReturnType {
    storyLoading: boolean
    // setStoryLoading: Dispatch<SetStateAction<boolean>>

    stories: any[]
    storiesPage: number
    storiesMeta: MetaDataType | null

    // Story Detail return Single Object
    storyDetailLoading: boolean
    storyDetail: any

    // All Methods
    getStoryListByAuthor(author_id: string, page: number) : void
    getStoryById(story_id: string): void
    prependStory(any): void
}

const storyHook = ({token}: StoryHookProps): StoryHookReturnType => {

    // Stories 
    const [storyLoading, setStoryLoading] = useState<boolean>(false) 
    const [stories, setStories] = useState<any[]>([])
    const [storiesPage, setStoriesPage] = useState<number>(1)
    const [storiesMeta, setStoriesMeta] = useState<MetaDataType | null>(null)

    // Story Detail
    const [storyDetailLoading, setStoryDetailLoading] = useState<boolean>(false)
    const [storyDetail, setStoryDetail] = useState<any | null>(null)

    // Get Story List , Return Data with Paginate
    const getStoryListByAuthor = async (author_id: string, page: number = 1) => {
        setStoryLoading(true)
        try {
            const url = `${API_URL}/story/author-id/${author_id}?page=${page}`
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            }
            const response = await fetch(url, options)

            if (!response.ok) {
                const message = (await response.json())?.message ?? 'SERVER_ERROR'
                throw new Error(message)
            }

            const res = await response.json()

            setStories(page === 1 ? res?.data : [...stories, ...res?.data])
            setStoriesMeta(res?.meta)
            setStoriesPage(res?.meta?.currentPage + 1)

            // StoryLoading Finished
            setStoryLoading(false)

        } catch (e) {
            setStoryLoading(false)
            throw e
        }
    }

    // Get Story By Id , Return Data with Paginate
    const getStoryById = async (story_id: string) => {
        setStoryDetailLoading(true)
        try {
            const url = `${API_URL}/story/${story_id}`
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
            }
            const response = await fetch(url, options)

            if (!response.ok) {
                const message = (await response.json())?.message ?? 'SERVER_ERROR'
                throw new Error(message)
            }

            const res = await response.json()

            setStoryDetail(res?.data)

            // StoryLoading Finished
            setStoryDetailLoading(false)

        } catch (e) {
            setStoryDetailLoading(false)
            throw e
        }
    }

    // When you create new story, sort initial story
    const prependStory = (story: any) => {
        setStories((prev) => ([
            story,
            ...prev
        ]))
    }

    return {
        stories,
        storyLoading,
        storiesPage,
        storiesMeta,

        storyDetail,
        storyDetailLoading,

        // All Methoeds
        getStoryListByAuthor,
        getStoryById,
        prependStory
    }
}

export default storyHook