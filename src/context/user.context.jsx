import {createContext,useEffect,useReducer} from 'react'

import {createUserDocumentFromAuth, onAuthStateChangedListener} from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

export const USER_ACTION_TYPE = {
  SET_CURRENT_TYPE:'SET_CURRENT_TYPE'
}

const userReducer = (state,action) =>{
  console.log('dispatched')
  console.log('action',action)
  console.log('state',state)
  const {type,payload} = action

  switch (type){
    case USER_ACTION_TYPE.SET_CURRENT_TYPE:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error('数据与userReducer不匹配')
  }
}

const INITIAL_USER = {
  currentUser:null
}

export const UserProvider = ({children}) => {
  const [{currentUser},dispatch] = useReducer(userReducer,INITIAL_USER);
  const setCurrentUser= (user) =>{
      dispatch({type:USER_ACTION_TYPE.SET_CURRENT_TYPE,payload:user})
  }


  const value = {currentUser, setCurrentUser}

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if(user){
        await createUserDocumentFromAuth(user);
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
