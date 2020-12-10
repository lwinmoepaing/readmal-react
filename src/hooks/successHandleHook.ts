import { useDispatch } from 'react-redux'
import { addedSnackbarMessages, clearSnackbarMessage } from '../../store/actions/snackbarActions'
import { snackMessage } from '../../store/reducers/SnackbarReducer'

interface SuccessResponseType {
  message: string
  data?: any[] | null
  meta?: any
}

export default function successHandleHook (): any[] {
    
    const dispatch = useDispatch()

    const handleSuccessMessage = (response: SuccessResponseType) => {
      let messages: snackMessage[] = []
      messages.push(makeSuccessMessage(response.message))
      dispatch(addedSnackbarMessages(messages))
    }

    const clearMessage = () => {
      dispatch(clearSnackbarMessage())
    }

    const makeSuccessMessage = (message = 'Successfully Task.'): snackMessage => {
      return {
        message ,
        variant: 'success'
      }
    }

    return [
        handleSuccessMessage,
        clearMessage,
    ] 
}