import {SignUpContainer} from './sign-up-form.style'
import {useDispatch} from "react-redux";

import {useState,FormEvent, ChangeEvent} from "react";

import {signUpStart} from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";



const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields
  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("password do not match")
      return
    }

    try {
      dispatch(signUpStart(email,password,displayName))
      resetFormFields()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SignUpContainer>
      <h2>Sign up you email and password</h2>
      <form action="" onSubmit={handleSubmit}>
        <FormInput label='Display Name'
                   type='text'
                   required
                   onChange={handleChange}
                   name='displayName'
                   value={displayName}/>
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
        <FormInput label='Confirm Password'
                   type='password'
                   required
                   onChange={handleChange}
                   name='confirmPassword'
                   value={confirmPassword}/>
        <Button type="submit">
          Sign up
        </Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm