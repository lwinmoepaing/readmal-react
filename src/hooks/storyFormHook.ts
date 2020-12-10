import { useState, useCallback } from "react";
import { API_URL, BASE_API_URL, MetaDataType } from "../../config";
import { AuthReducerType } from "../../store/reducers/AuthReducer";
import errorHandleHook from "./errorHandleHook";
import successHandleHook from "./successHandleHook";

interface StoryFormHookProps {
    token?: string,
}

interface StoryForm {
  _id?: string
  title: string
  description: string
  category: string
  image: string
  addable_episode_count: number
  is_including_premium: boolean
  author?: string
}

export interface StoryFormHook {
    // Dialog
    open: boolean
    handleClickOpen() : void
    handleClose(): void
    
    // Methods
    handleChanges(event: React.ChangeEvent<HTMLInputElement>) : void
    resetFormData(): void
    setImage(imageUrl: string): void
    onCreateStory(): any
    uploadImage(file: any): void

    // Data
    formData: StoryForm,
    imageUploadLoading: boolean
    storyFormLoading: boolean
}

  const defaultImageUrl = `${BASE_API_URL}/stories/story.jpg`
  
  const initialForm: StoryForm = {
    title: '',
    description: '',
    category: 'Horror',
    image: defaultImageUrl,
    addable_episode_count: 0,
    is_including_premium: false,
  }

const storyFormHook = ({token}: StoryFormHookProps): StoryFormHook => {
    const [handleErrorMessage, handleResponseError, clearMessage] = errorHandleHook()
    const [handleSuccessMessage] = successHandleHook()

    const [open, setOpen] = useState(false)
    const [storyFormLoading, setStoryFormLoading] = useState<boolean>(false)
    const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false)
    const [data, setData] = useState<StoryForm | null >(initialForm)
  
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

    // Set Image When Uploading Data
    const setImage = (imageUrl: string) => {
      setData(prev => ({
        ...prev,
        image: imageUrl
      }))
    }

    // When Upload Image
    const uploadImage = async (file: any) => {
      setImageUploadLoading(true)
      
      var formdata = new FormData();
      formdata.append("image", file);

      const requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formdata,
      }

      try {
        const response = await fetch(`${API_URL}/image?path=stories&text='Story Upload '`, requestOptions)
        if (!response.ok) {
          handleResponseError(response)
          setImageUploadLoading(false)
          return
        }
        const res = await response.json()
        setImageUploadLoading(false)
        setImage(res?.data?.image ?? defaultImageUrl)
        handleSuccessMessage(res)
      } catch (e) {
        setImageUploadLoading(false)
        handleErrorMessage(e)
        throw (e)
      }
    }
    
    // When Click Create Story or Edit Story
    const onCreateStory = useCallback(
      async (): Promise<any> => {
        setStoryFormLoading(true)
        const imageSplit = data.image.split('/')
        const image = imageSplit[imageSplit.length - 1]
        let payloadData = {
          title: data.title,
          description: data.description,
          category: data.category,
          image: image,
          addable_episode_count: data.addable_episode_count,
          is_including_premium: data.is_including_premium,
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
          const response = await fetch(`${API_URL}/story`, options)
          if (!response.ok) {
            handleResponseError(response)
            setStoryFormLoading(false)
            return null
          }
          const res = await response.json()
          setStoryFormLoading(false)
          handleSuccessMessage(res)
          resetFormData()
          return {
            ...data,
            _id: res?.data?._id
          }
        } catch (e) {
          setStoryFormLoading(false)
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
        onCreateStory,
        resetFormData,
        setImage,
        uploadImage,

        // Data
        formData: data,
        imageUploadLoading,
        storyFormLoading,

    }
}

export default storyFormHook

