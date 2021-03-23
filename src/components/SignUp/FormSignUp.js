import React, {useRef, useState} from 'react'
import ValidateForm from '../ValidateFormLoginRegister'
import UseFormSignUp from './UseFormSignUp'
import '../../style/LoginRegister.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function FormSignUp({ submitForm }){
    const { handleChange, handleSubmit, values, errors } = UseFormSignUp(
      submitForm,
      ValidateForm,
    );

    const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
    const EyeSlash = <FontAwesomeIcon className="iconEye" icon={faEyeSlash}/>;

    const [showPassword, setShowPassword] = useState(false);

    const password = useRef();
    const password2 = useRef();

    const changeTypePassword = () => {
        setShowPassword(!showPassword)
        password.current.type = showPassword ? "password" : "text";
        password2.current.type = showPassword ? "password" : "text";
    }
  
    return (
        <div className='form_content_input signUp_right'>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>TẠO TÀI KHOẢN</h1>

                <div className='form-inputs'>
                    <label className='form-label'>Họ tên</label>
                    <input
                        className='form-input'
                        type='text'
                        name='fullName'
                        placeholder='Nhập họ tên'
                        value={values.fullName}
                        onChange={handleChange}/>
                    {errors.fullName && <p>{errors.fullName}</p>}
                </div>

                <div className='form-inputs'>
                    <label className='form-label'>Tài khoản</label>
                    <input
                        className='form-input'
                        type='text'
                        name='username'
                        placeholder='Nhập tài khoản'
                        value={values.username}
                        onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
                </div>

                <div className='form-inputs'>
                    <label className='form-label'>Email</label>
                    <input
                        className='form-input'
                        type='email'
                        name='email'
                        placeholder='Nhập Email'
                        value={values.email}
                        onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className='form-inputs'>
                    <label className='form-label'>Mật khẩu</label>
                    <div className="eye">
                        <input
                            ref={password}
                            className='form-input'
                            type='password'
                            name='password'
                            placeholder='Nhập mật khẩu'
                            value={values.password}
                            onChange={handleChange}/>
                        {showPassword ? <i onClick={changeTypePassword}>{Eye}</i> : <i onClick={changeTypePassword}>{EyeSlash}</i>}
                    </div>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div className='form-inputs'>
                    <label className='form-label'>Xác nhận mật khẩu</label>         
                        <input
                            ref={password2}
                            className='form-input'
                            type='password'
                            name='password2'
                            placeholder='Xác nhận mật khẩu'
                            value={values.password2}
                            onChange={handleChange}/>
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>

                <button className='form_input_btn' type='submit'>ĐĂNG KÝ</button>
            </form>
        </div>
    );
}

export default FormSignUp
