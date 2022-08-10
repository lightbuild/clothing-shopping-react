import {USER_ACTION_TYPE} from './user.types'

const INITIAL_USER = {
  currentUser: null
}


export const userReducer = (state=INITIAL_USER, action) => {
  const {type, payload} = action

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_TYPE:
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state
  }
}