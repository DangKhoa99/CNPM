import React, {useState} from 'react'
import Header from '../../components/Header'
import "../../style/LoginRegister.css"
import FormSignUp from '../../components/SignUp/FormSignUp'
import FormSuccess from '../../components/SignUp/FormSuccess'
import {Button} from "@material-ui/core"
import { Link } from 'react-router-dom'

function SignUp() {
  document.title = "Đăng ký"

  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  const myStyle={
    background: `url('${process.env.PUBLIC_URL}/images/backgroundSignUp.jpg') center center/cover no-repeat`
  }

  return (
    <div className="signUp">
      {/* <Header /> */}
      <div className="signUp_background background_form" style={myStyle}>
        <div className='form_container'>
          <div className='form_content signUp_left'>
            <h1 className='form_content_header'>Chào mừng trở lại!</h1>
            <p>Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
            <Button className="form_btn" href='/sign-in'>ĐĂNG NHẬP</Button>
            <a className='pageHome' href='/' aria-label="Trang chủ">
              <i class="fas fa-home"/>
            </a>
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
