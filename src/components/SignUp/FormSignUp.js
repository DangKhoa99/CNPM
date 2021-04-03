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
        <div className="loginRegister">
            <div className="cardLoginRegister">
                <div className="formLoginRegister">
                    <div className="formLoginRegister_container">
                        <header>
                            <h1>Tạo tài khoản</h1>
                        </header>
                        <section>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="input_row">
                                    <input
                                        className="form_input"            
                                        type='text'
                                        name='fullName'
                                        placeholder='Nhập họ tên'
                                        autoComplete="off"
                                        value={values.fullName}
                                        onChange={handleChange}/>
                                    {errors.fullName && <p>{errors.fullName}</p>}
                                </div>

                                <div className="input_row">
                                    <input
                                        className='form_input'
                                        type='text'
                                        name='username'
                                        placeholder='Nhập tài khoản'
                                        autoComplete="off"
                                        value={values.username}
                                        onChange={handleChange}/>
                                    {errors.username && <p>{errors.username}</p>}
                                </div>

                                <div className="input_row">
                                    <input
                                        className='form_input'
                                        type='email'
                                        name='email'
                                        placeholder='Nhập Email'
                                        autoComplete="off"
                                        value={values.email}
                                        onChange={handleChange}/>
                                    {errors.email && <p>{errors.email}</p>}
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

                                <div className="input_row">
                                    <input
                                        ref={password2}
                                        className='form_input'
                                        type='password'
                                        name='password2'
                                        placeholder='Xác nhận mật khẩu'
                                        value={values.password2}
                                        onChange={handleChange}/>
                                    {errors.password2 && <p>{errors.password2}</p>}
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
    );
}

export default FormSignUp
