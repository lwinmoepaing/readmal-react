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
    onCreateStory(): void
    uploadImage(file: any): void

    // Data
    formData: StoryForm,
    imageUploadLoading: boolean
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
        const { data } = await response.json()
        setImageUploadLoading(false)
        setImage(data?.image ?? defaultImageUrl)
        handleSuccessMessage(data)
      } catch (e) {
        setImageUploadLoading(false)
        handleErrorMessage(e)
        throw (e)
      }
    }
  
    const onCreateStory = useCallback(
      () => {
        console.log(data)
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
        imageUploadLoading
    }
}

export default storyFormHook

