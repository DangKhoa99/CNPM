import React, {useState} from 'react'
import "../../style/LoginRegister.css"
import FormSignUp from '../../components/SignUp/FormSignUp'
import { Redirect } from 'react-router-dom'
import Home from "../Home/Home"

import { store } from 'react-notifications-component'

function SignUp() {
  document.title = "Đăng ký | RoyalStay"

  // const [isSubmitted, setIsSubmitted] = useState(false);

  // function submitForm() {
  //   setIsSubmitted(true);
  // }

  // const notification_saveFavorite = {
  //   title: ' RoyalStay - Thông báo',
  //   message: 'Đăng ký thành công',
  //   type: 'success',
  //   container: 'bottom-left',
  //   dismiss: {
  //       duration: 2000
  //   }
  // };

  return (
    <div className="signUp">
      {/* {!isSubmitted ? 
      ( */}
        <FormSignUp 
        // submitForm={submitForm}
         />
      {/* ) 
      :
      (
        "" */}
        {/* // <FormSignUp/>
        // <a href="/sign-in" />
        // <Redirect to="/sign-up">
        // store.addNotification(notification_saveFavorite)
        // </Redirect> */}
      {/* )} */}
    </div>
  )
}

export default SignUp
