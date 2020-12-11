import { Dispatch, SetStateAction, useState } from "react"
import { API_URL, BASE_API_URL, MetaDataType } from "../../config"
import errorHandleHook from "./errorHandleHook"
import successHandleHook from "./successHandleHook"

interface StoryHookProps {
    token?: string,
}

interface StoryDetailHookReturnType {
    storyPublishLoading: boolean
    storyFinishLoading: boolean
    storyEpisodePublishLoading: boolean

    // Methods
    publishStory: (story_id: string) => Promise<boolean>
    finishStory: (story_id: string) => Promise<boolean>
    publishStoryEpisode: (episode_id: string) => Promise<boolean>
}

const storyDetailHook = ({ token }: StoryHookProps): StoryDetailHookReturnType => {
  const [handleErrorMessage, handleResponseError, clearMessage] = errorHandleHook()
  const [handleSuccessMessage] = successHandleHook()

  const [storyPublishLoading, setStoryPublishLoading] = useState<boolean>(false)
  const [storyFinishLoading, setStoryFinishLoading] = useState<boolean>(false)
  const [storyEpisodePublishLoading, setStoryEpisodePublishLoading] = useState<boolean>(false)
  
  // Methods
   
  const publishStory = async (story_id: string): Promise<boolean> => {
    setStoryPublishLoading(true)
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ is_published: true }),
      }

      const response = await fetch(`${API_URL}/story/${story_id}/publish`, options)

      if (!response.ok) {
        handleResponseError(response)
        setStoryPublishLoading(false)
        return false
      }
      const res = await response.json()
      handleSuccessMessage(res)
      return true
    } catch (e) {
      handleErrorMessage(e)
      return false
    } finally {
      setStoryPublishLoading(false)
    }
    
  }

  const finishStory = async (story_id: string): Promise<boolean> => {
    setStoryFinishLoading(true)
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ is_finished: true }),
      }

      const response = await fetch(`${API_URL}/story/${story_id}/finish`, options)

      if (!response.ok) {
        handleResponseError(response)
        setStoryFinishLoading(false)
        return false
      }
      const res = await response.json()
      handleSuccessMessage(res)
      return true
    } catch (e) {
      handleErrorMessage(e)
      return false
    } finally {
      setStoryFinishLoading(false)
    }
    
  }

  const publishStoryEpisode = async (episode_id: string): Promise<boolean> => {
    setStoryEpisodePublishLoading(true)
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ is_published: true }),
      }

      const response = await fetch(`${API_URL}/episode/${episode_id}/publish`, options)

      if (!response.ok) {
        handleResponseError(response)
        setStoryEpisodePublishLoading(false)
        return false
      }
      const res = await response.json()
      handleSuccessMessage(res)
      return true
    } catch (e) {
      handleErrorMessage(e)
      return false
    } finally {
      setStoryEpisodePublishLoading(false)
    }
    
  }

  return {
    storyPublishLoading,
    storyFinishLoading,
    storyEpisodePublishLoading,
    // Methods
    publishStory,
    finishStory,
    publishStoryEpisode
  }
}

export default storyDetailHook