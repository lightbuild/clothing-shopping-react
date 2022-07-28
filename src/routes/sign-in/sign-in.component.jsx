import {signInWithGooglePopup} from "../../utils/firebase/firebase.utils";


const SignIn = () => {
  const logGooleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooleUser}>
        Sign in with Goole Popup
      </button>
    </div>
  )
}

export default SignIn;