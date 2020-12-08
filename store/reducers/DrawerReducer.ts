import {
    DRAWER_TOGGLE,
  } from '../actions/actionTypes'
  
  export interface DrawerReducerType {
    drawerIsOpen: boolean
  }
  
  interface ReducerType {
    type: String,
    payload: any
  }
  
  const initialState = {
    drawerIsOpen: false,
  }
  
  const DrawerReducer = (state: DrawerReducerType = initialState, { type, payload }: ReducerType): DrawerReducerType  => {
    
    switch (type) {
      // If Login Success
      case DRAWER_TOGGLE:
        return {
          drawerIsOpen: !state.drawerIsOpen,
        }
  
      default:
        return state
    }
  }
  
  export default DrawerReducer