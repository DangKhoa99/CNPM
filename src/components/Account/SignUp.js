import React, {useState} from 'react'
import Header from '../Header'
import "./Account.css"
import FormSignUp from './FormSignUp'
import FormSuccess from './FormSuccess'
import {Button} from "@material-ui/core"

function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className="signUp">
      <Header />
      <div className="signUp__background background__form">
        <div className='form__container'>
          <div className='form__content signUp__left'>
            <h1 className='form__content__header'>Chào mừng trở lại!</h1>
            <p>Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
            <Button className="form__btn" href='/sign-in'>ĐĂNG NHẬP</Button>
          </div>
          {!isSubmitted ? (
            <FormSignUp submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
 
     
      </div>
    </div>
  )
}

export default SignUp
