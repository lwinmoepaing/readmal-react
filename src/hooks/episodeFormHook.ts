import { useState, useCallback } from "react";
import { API_URL, BASE_API_URL, MetaDataType } from "../../config";
import errorHandleHook from "./errorHandleHook";
import successHandleHook from "./successHandleHook";

interface EpisodeFormHookProps {
    token?: string,
    story_id: string
}

interface EpisodeForm {
  _id?: string
  title: string
  description: string
  author?: string
}

export interface EpisodeFormHook {
  // Dialog
  open: boolean
  handleClickOpen() : void
  handleClose(): void
  
  // Methods
  handleChanges(event: React.ChangeEvent<HTMLInputElement>) : void
  resetFormData(): void
  onCreateEpisode(): any

  // Data
  formData: EpisodeForm
  episodeFormLoading: boolean
  // imageUploadLoading: boolean
}


const initialForm: EpisodeForm = {
  title: '',
  description: ' ',
}

const episodeFormHook = ({token, story_id}: EpisodeFormHookProps): EpisodeFormHook => {
  const [handleErrorMessage, handleResponseError, clearMessage] = errorHandleHook()
  const [handleSuccessMessage] = successHandleHook()

  const [open, setOpen] = useState(false)
  const [episodeFormLoading, setEpisodeFormLoading] = useState<boolean>(false)
  const [data, setData] = useState<EpisodeForm | null >(initialForm)
  // const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false)

  const resetFormData = () => {
    setData(initialForm)
  }

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target 
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }
    
  // Handle Dialog Close Or Open
  const handleClickOpen = () => {
    setOpen(true)
    resetFormData()
  }

  const handleClose = () => { setOpen(false) }

  // When Click Create Story or Edit Story
  const onCreateEpisode = useCallback(
    async (): Promise<any> => {
      setEpisodeFormLoading(true)
      let payloadData = {
        title: data.title,
        description: data.description,  
      }

      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(payloadData),
      }

      try {
        const response = await fetch(`${API_URL}/episode/to-story/${story_id}`, options)
        if (!response.ok) {
          handleResponseError(response)
          setEpisodeFormLoading(false)
          return null
        }
        const res = await response.json()
        setEpisodeFormLoading(false)
        handleSuccessMessage(res)
        resetFormData()
        return {
          // Response new episode data from backend
          ...res?.data
        }
      } catch (e) {
        setEpisodeFormLoading(false)
        handleErrorMessage(e)
        return null
      } 

  }, [data])

  return {
      // Dialog
      open,
      handleClickOpen,
      handleClose,

      // Methods
      handleChanges,
      resetFormData,
      onCreateEpisode,

      // Data
      formData: data,
      episodeFormLoading,
  }
}

export default episodeFormHook

