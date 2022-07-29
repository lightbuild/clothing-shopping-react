import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
}
  from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

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
      <SignUpForm/>
    </div>
  )
}

export default SignIn;