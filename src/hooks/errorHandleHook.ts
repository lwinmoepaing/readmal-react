import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/authAction'
import { addedSnackbarMessages, clearSnackbarMessage } from '../../store/actions/snackbarActions'
import { snackMessage } from '../../store/reducers/SnackbarReducer'

interface ErrorCatch {
  message: string
  data?: any[] | null
  errorCode?: number
}

interface ErrorReponsse {
  status: number
  json<T>(): Promise<T>
  url: string
}

function isArray (data) :boolean {
  return Array.isArray(data)
}

const NOT_AUTHENTICATE = 401
const BAD_REQUEST = 400

// interface HandleErrorType {
//   handleErrorMessage(): void
//   handleResponseError(): void
//   clearMessage(): void
// }

export default function errorHandleHook (): any[] {
    
    const dispatch = useDispatch()

    const handleResponseError = async (response: ErrorReponsse) => {
        const statusCode = response.status
        const res = await response.json<ErrorCatch>()
        
        switch(statusCode) {
          case NOT_AUTHENTICATE: 
            dispatch( addedSnackbarMessages([makeErroMessate('Not Authorize')]) )
            dispatch( logout() )
            return
          case BAD_REQUEST: 
            handleErrorMessage(res)
            return
          default: 
            dispatch(
              addedSnackbarMessages([makeErroMessate('Something went wrong')])
            )
        }
    }

    const handleErrorMessage = (error: ErrorCatch) => {
      let messages: snackMessage[] = []
      messages.push(makeErroMessate(error.message))

      if (error?.data && isArray(error?.data)) {
        error?.data?.map(errMessage => {
          messages.push(makeErroMessate(errMessage))
        })
      }

      dispatch(addedSnackbarMessages(messages))
    }

    const clearMessage = () => {
      dispatch(clearSnackbarMessage())
    }

    const makeErroMessate = (message = 'Something went wrong'): snackMessage => {
      return {
        message ,
        variant: 'error'
      }
    }

    return [
        handleErrorMessage,
        handleResponseError,
        clearMessage,
    ] 
}