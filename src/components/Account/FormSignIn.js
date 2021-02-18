import React, {useRef, useState} from 'react'
import ValidateForm from './ValidateForm'
import UseFormSignIn from './UseFormSignIn'
import './Account.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function FormSignIn({ submitForm }) {
    const { handleChange, handleSubmit, values, errors } = UseFormSignIn(
        submitForm,
        ValidateForm,
    );

    const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
    const EyeSlash = <FontAwesomeIcon className="iconEye" icon ={faEyeSlash}/>;

    const [showPassword, setShowPassword] = useState(false);

    const password = useRef();

    const changeTypePassword = () => {
        setShowPassword(!showPassword)
        password.current.type = showPassword ? "password" : "text";
    }

    return (
        <div className='form__content__input signIn__left'>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>ĐĂNG NHẬP</h1>

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

                <button className='form__input__btn' type='submit'>ĐĂNG NHẬP</button>
            </form>
        </div>
    )
}

export default FormSignIn
