import {useState} from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields
  console.log(formFields)
  const handerevent = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }
  return (
    <div>
      <h1>Sign up you email and password</h1>
      <form action="" onSubmit={() => {}}>
        <label htmlFor="">Display Name</label>
        <input type='text' required onChange={handerevent} name='displayName' value={displayName}/>

        <label htmlFor="">Email</label>
        <input type='email' required onChange={handerevent} name='email' value={email}/>

        <label htmlFor="">Password</label>
        <input type='password' required onChange={handerevent} name='password' value={password}/>

        <label htmlFor="">Confirm Password</label>
        <input type='password' required onChange={handerevent} name='confirmPassword' value={confirmPassword}/>
        <button type="submit">
          Sign up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm