import React, {useRef, useState} from 'react'
import "../../style/LoginRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { store } from 'react-notifications-component'
import { Link } from 'react-router-dom'
import useToken from '../../hooks/useToken'
import history from '../../history';
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function SignUp() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;

    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const { token, setToken } = useToken();

    if(token){
        history.push('/');
    }

    document.title = content.register + " | RoyalStay"

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [submittedData, setSubmittedData] = useState({});

    const notificationExistUsername = {
        title: ' RoyalStay - ' + content.notification,
        message: content.existUsername,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notificationRegisterSuccess = {
        title: ' RoyalStay - ' + content.notification,
        message: content.registerSuccess,
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };
    
    const onSubmit = (data) => {
        setSubmittedData(data);
        // console.log(data);
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
        required: content.pleaseEnterPassword, 
        minLength: {
            value: 6,
            message: content.validationPassword
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
                        <h1>{content.createAccount}<a href="/" style={{textDecoration: "none", color: "black"}}>RoyalStay</a></h1>
                        </header>
                        
                        <section>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input_row">
                                    <input 
                                        className="form_input"
                                        autoComplete="off"
                                        type="text" 
                                        placeholder={content.placeholderFullname}
                                        {...register("fullName", {
                                            required: content.validationFullname, 
                                            maxLength: {
                                                value: 100,
                                                message: content.validationFullname1
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
                                        placeholder={content.placeholderEmail}
                                        {...register("email", {
                                            required: content.validationEmail, 
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: content.validationEmail1
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
                                        placeholder={content.placeholderUsername}
                                        {...register("username", {
                                            required: content.validationUsername, 
                                            pattern: {
                                                value: /^([a-z\d]+-)*[a-z\d]+$/i,
                                                message: content.validationUsername1
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
                                            placeholder={content.placeholderPassword}
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

                                <button className="loginRegister_submit_btn" type="submit">{content.register}</button>

                                <div className="loginRegister_subText">
                                    <Link to="/sign-in">{content.loginNow}</Link>
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
