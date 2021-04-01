import React, {useRef, useState} from 'react'
import ValidateForm from '../ValidateFormLoginRegister'
import UseFormSignIn from './UseFormSignIn'
import '../../style/LoginRegister.css'
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
        <div className="loginRegister">
            <div className="cardLoginRegister">
                <div className="formLoginRegister">
                    <div className="formLoginRegister_container">
                        <header>
                            <h1>Đăng nhập vào RoyalStay</h1>
                        </header>
                        <section>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="input_row">
                                    <input
                                        className='form_input'
                                        type='text'
                                        name='username'
                                        placeholder='Nhập tài khoản'
                                        value={values.username}
                                        onChange={handleChange}/>
                                        {errors.username && <p>{errors.username}</p>}
                                </div>

                                <div className="input_row">
                                    <div className="eye">
                                        <input
                                            ref={password}
                                            className='form_input'
                                            type='password'
                                            name='password'
                                            placeholder='Nhập mật khẩu'
                                            value={values.password}
                                            onChange={handleChange}/>
                                            {showPassword ? <i onClick={changeTypePassword}>{Eye}</i> : <i onClick={changeTypePassword}>{EyeSlash}</i>}
                                        </div>
                                        {errors.password && <p>{errors.password}</p>}
                                </div>
                                

                                <button className="loginRegister_submit_btn" type="submit">Đăng nhập</button>

                                <div className="loginRegister_subText">
                                    Bạn chưa có tài khoản?
                                    <a href="/sign-up"> Đăng ký</a>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSignIn
