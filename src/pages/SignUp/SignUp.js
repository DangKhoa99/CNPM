import React, {useState} from 'react'
import "../../style/LoginRegister.css"
import FormSignUp from '../../components/SignUp/FormSignUp'
import {Button} from "@material-ui/core"
import { Link } from 'react-router-dom'
import Home from "../Home/Home"

function SignUp() {
  document.title = "Đăng ký"

  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className="signUp">
      {!isSubmitted ? (
        <FormSignUp submitForm={submitForm} />
      ) : (
        <Home/>
      )}
    </div>
  )
}

export default SignUp
