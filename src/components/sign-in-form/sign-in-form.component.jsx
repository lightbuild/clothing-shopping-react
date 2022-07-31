import './sign-in-form.style.scss'

import {useState} from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'


import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


const defaultFormFields = {
  email: "",
  password: "",
}


const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
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
      resetFormFields()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='sign-up-container'>
      <h2>Alread have an account?</h2>
      <h2>Sign in with you email and password</h2>
      <form action="" onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type="submit" buttonType='inverted'>
            Sign In
          </Button>
          <Button onClick={signInWithGoogle} buttonType='google'>
            Googel Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm