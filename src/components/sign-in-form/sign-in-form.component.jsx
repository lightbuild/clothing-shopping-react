import {SignUpContainer,ButtonContainer}  from './sign-in-form.style'

import {useState} from "react";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'


import FormInput from "../form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASS} from "../button/button.component";


const defaultFormFields = {
  email: "",
  password: "",
}


const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields


  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email,password)
      resetFormFields()
    } catch (error) {
      switch (error.code){
        case 'auth/wrong-password':
          alert('not matches the password')
          break;
        case 'auth/user-not-found':
          alert('no user associated with the email')
          break;
        default:
          console.log(error)
      }
    }
  }
  return (
    <SignUpContainer>
      <h2>Alread have an account?</h2>
      <h2>Sign in with you email and password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email'
                   type='email'
                   required
                   onChange={handleChange}
                   name='email'
                   value={email}/>
        <FormInput label='Password'
                   type='password'
                   required
                   onChange={handleChange}
                   name='password'
                   value={password}/>
        <ButtonContainer>
          <Button type="submit"
                  buttonType={BUTTON_TYPE_CLASS.inverted}>
            Sign In
          </Button>
          <Button type="button"
                  onClick={signInWithGoogle}
                  buttonType={BUTTON_TYPE_CLASS.google}>
            Googel Sign in
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm