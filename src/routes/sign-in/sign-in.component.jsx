import {
  auth,
  signInWithGooleRedirect,
  signInWithGooglePopup,
  createUserDocumentFromAuth
}
  from "../../utils/firebase/firebase.utils";
import {useEffect} from "react";
import {getRedirectResult} from 'firebase/auth'

const SignIn = () => {
  useEffect(() => {
    async function fetchUser(){
      const response = await getRedirectResult(auth)
      if (response){
        const userDocRef = await createUserDocumentFromAuth(response.user)
      }
    }
    fetchUser()
  },[])


  const logGooleUser = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }


  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooleUser}>
        Sign in with Goole Popup
      </button>
      <button onClick={signInWithGooleRedirect}>
        Sign in with GooleRedict
      </button>
    </div>
  )
}

export default SignIn;