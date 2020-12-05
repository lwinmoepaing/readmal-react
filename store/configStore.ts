import { Context, createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'

// All Reducers
import Auth, {AuthReducerType} from './reducers/AuthReducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  Auth
})

// const rootReducers = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     if (state.Auth.token) nextState.Auth.token = state.Auth.token // preserve count value on client side navigation
//     if (state.Auth.authInfo) nextState.Auth.authInfo = state.Auth.authInfo // preserve count value on client side navigation
//     return nextState
//   } else {
//     return combinedReducer(state, action)
//   }
// }

const configStore = () => createStore(combinedReducer, bindMiddleware([reduxThunk]))

export interface State {
  Auth: AuthReducerType
}

export const makeStore: MakeStore<State> = (context: Context) => configStore()

export const wrapper = createWrapper<State>(makeStore, { debug: false })