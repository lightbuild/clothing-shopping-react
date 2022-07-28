import {signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import {createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";


const SignIn = () => {
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
    </div>
  )
}

export default SignIn;