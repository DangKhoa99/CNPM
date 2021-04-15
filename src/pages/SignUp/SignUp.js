import React, {useRef, useState} from 'react'
import "../../style/LoginRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { store } from 'react-notifications-component'

import useToken from '../../useToken'
import history from '../../history';

function SignUp() {
const { token, setToken } = useToken();

if(token){
    history.push('/');
}
  document.title = "Đăng ký | RoyalStay"

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [submittedData, setSubmittedData] = useState({});

  const notificationExistUsername = {
      title: ' RoyalStay - Thông báo',
      message: 'Tên tài khoản đã tồn tại',
      type: 'warning',
      container: 'bottom-left',
      dismiss: {
          duration: 2000
      }
  };

  const notificationRegisterSuccess = {
      title: ' RoyalStay - Thông báo',
      message: 'Đăng ký thành công',
      type: 'success',
      container: 'bottom-left',
      dismiss: {
          duration: 2000
      }
  };
    
  const onSubmit = (data) => {
      setSubmittedData(data);
      console.log(data);
      const registerAccount = {
          name: data.fullName,
          username: data.username,
          email: data.email,
          password: data.password   
      }

      axios.post('http://localhost:5000/auth/register', registerAccount)
      .then(response => {
          console.log(response.data);
          if(response.data == "Tên tài khoản đã tồn tại"){
              store.addNotification(notificationExistUsername);
              setSubmittedData({});
          }
          else{
              store.addNotification(notificationRegisterSuccess);
              reset(submittedData);
              setSubmittedData({});
          }
      })
  };

  const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
  const EyeSlash = <FontAwesomeIcon className="iconEye" icon={faEyeSlash}/>;

  const [showPassword, setShowPassword] = useState(false);

  const password = useRef();

  const { ref, ...rest } = register("password", {
      required: "Vui lòng nhập mật khẩu", 
      minLength: {
          value: 6,
          message: "Mật khẩu phải chứa hơn 6 kí tự"
      }
  })

  const changeTypePassword = () => {
      setShowPassword(!showPassword)
      password.current.type = showPassword ? "password" : "text";
  }


  return (
    <div className="signUp">
      <div className="loginRegister">
          <div className="cardLoginRegister">
              <div className="formLoginRegister">
                  <div className="formLoginRegister_container">
                      <header>
                          <h1>Tạo tài khoản</h1>
                      </header>
                      
                      <section>
                          <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="input_row">
                                  <input 
                                      className="form_input"
                                      autoComplete="off"
                                      type="text" 
                                      placeholder="Nhập họ tên" 
                                      {...register("fullName", {
                                          required: "Vui lòng nhập họ tên", 
                                          maxLength: {
                                              value: 100,
                                              message: "Không được vượt quá 100 kí tự"
                                          }
                                      })} 
                                  />
                                  {errors.fullName && <p>⚠ {errors.fullName.message}</p>}
                              </div>

                              <div className="input_row">
                                  <input 
                                      className="form_input"
                                      autoComplete="off"
                                      type="text" 
                                      placeholder="Nhập email" 
                                      {...register("email", {
                                          required: "Vui lòng nhập email", 
                                          pattern: {
                                              value: /^\S+@\S+$/i,
                                              message: "Địa chỉ Email không hợp lệ"
                                          }
                                      })} 
                                  />
                                  {errors.email && <p>⚠ {errors.email.message}</p>}
                              </div>

                              <div className="input_row">
                                  <input 
                                      className="form_input"
                                      autoComplete="off"
                                      type="text" 
                                      placeholder="Nhập tài khoản" 
                                      {...register("username", {
                                          required: "Vui lòng nhập tài khoản", 
                                          pattern: {
                                              value: /^([a-z\d]+-)*[a-z\d]+$/i,
                                              message: "Tên tài khoản không hợp lệ"
                                          }
                                      })} 
                                  />
                                  {errors.username && <p>⚠ {errors.username.message}</p>}
                              </div>
  
                              <div className="input_row">
                                  <div className="eye">
                                      <input 
                                          className="form_input"
                                          autoComplete="off"
                                          type="password" 
                                          placeholder="Nhập mật khẩu"
                                          {...rest}
                                          ref={(e) => {
                                              ref(e)
                                              password.current = e
                                          }}
                                      />
                                      {showPassword ? <i onClick={changeTypePassword}>{Eye}</i> : <i onClick={changeTypePassword}>{EyeSlash}</i>}
                                  </div>
                                  {errors.password && <p>⚠ {errors.password.message}</p>}
                              </div>

                              <button className="loginRegister_submit_btn" type="submit">Đăng ký</button>

                              <div className="loginRegister_subText">
                                  <a href="/sign-in">Đăng nhập ngay</a>
                              </div>
                          </form>
                      </section>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default SignUp
