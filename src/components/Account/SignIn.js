import React, {useState} from 'react'
import Header from '../Header'
import "./Account.css"
import FormSignUp from './FormSignIn'
// import FormSuccess from './FormSuccess'
import Home from "../Home/Home"
import {Button} from "@material-ui/core"
import { Link } from 'react-router-dom'

function SignIn() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
      setIsSubmitted(true);
    }

    return (
        <div className="signIn">
            <Header />
            <div className="signIn__background background__form">
                <div className='form__container'>        
                    {!isSubmitted ? (
                        <FormSignUp submitForm={submitForm} />
                    ) : (
                        // <Link to="/home"/>
                        <Home/>
                    )}
                    <div className='form__content signIn__right'>
                        <h1 className='form__content__header'>Chào bạn!</h1>
                        <p>Đăng ký thông tin cá nhân và bắt đầu cuộc hành trình với chúng tôi</p>
                        <Button className="form__btn" href='/sign-up'>ĐĂNG KÝ</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
