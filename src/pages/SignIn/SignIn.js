import React, {useState} from 'react'
import Header from '../../components/Header'
import "../../style/LoginRegister.css"
import FormSignIn from '../../components/SignIn/FormSignIn'
import Home from "../Home/Home"
import {Button} from "@material-ui/core"
import { Link } from 'react-router-dom'

function SignIn() {
    document.title = "Đăng nhập"

    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
      setIsSubmitted(true);
    }

    return (
        <div className="signIn">
            {/* <Header /> */}
            <div className="signIn_background background_form">
                <div className='form_container'>
                    {!isSubmitted ? (
                        <FormSignIn submitForm={submitForm} />
                    ) : (
                        // <Link to="/home"/>
                        <Home/>
                    )}
                    <div className='form_content signIn_right'>
                        <h1 className='form_content_header'>Chào bạn!</h1>
                        <p>Đăng ký thông tin cá nhân và bắt đầu cuộc hành trình với chúng tôi</p>
                        <Button className="form_btn" href='/sign-up'>ĐĂNG KÝ</Button>
                        <a className='pageHome' href='/' aria-label="Trang chủ">
                            <i class="fas fa-home"/>
                        </a>
                    </div>     
                </div>
            </div>
        </div>
    )
}

export default SignIn
