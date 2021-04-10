import React, {useState} from 'react'
import "../../style/LoginRegister.css"
import FormSignIn from '../../components/SignIn/FormSignIn'
import Home from "../Home/Home"
import {Button} from "@material-ui/core"
import { Link } from 'react-router-dom'

function SignIn() {
    document.title = "Đăng nhập | RoyalStay"

    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
      setIsSubmitted(true);
    }

    return (
        <div className="signIn">
            {!isSubmitted ? (
                <FormSignIn submitForm={submitForm} />
            ) : (
                // <Link to="/home"/>
                <Home/>
            )}
        </div>
    )
}

export default SignIn
