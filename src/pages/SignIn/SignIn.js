import React, {useRef, useState, useEffect} from 'react'
import "../../style/LoginRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { store } from 'react-notifications-component'
import history from '../../history';
import useToken from '../../hooks/useToken'
import { useLocation, Link } from 'react-router-dom'
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function SignIn() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;

    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const { token, setToken } = useToken();
    const location = useLocation();

    if(token && location.pathname == '/sign-in'){
        history.push("/")
    }

    document.title = content.login + " | RoyalStay"

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const notificationLoginFail = {
        title: ' RoyalStay - ' + content.notification,
        message: content.loginWarning,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notificationLoginSuccess = {
        title: ' RoyalStay - ' + content.notification,
        message: content.loginSuccess,
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const onSubmit = async (data)  => {
        // console.log(data);
        const loginAccount = {
            username: data.username,
            password: data.password   
        }

        axios.post('http://localhost:5000/auth/login', loginAccount)
        .then(response => {
            // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", response.data);
            if(response.data == "Tài khoản hoặc mật khẩu không đúng"){
                store.addNotification(notificationLoginFail);
            }
            else{
                const accessToken = response.data;
                setToken(accessToken);
                // console.log("token 1: ",token);
            // console.log(setToken(response.data));
                // store.addNotification(notificationLoginSuccess);

                // setRedirectToReferrer(true)

                // if (redirectToReferrer == true) {
                //     <Redirect to={from} />
                // }
                // dispatch(addToken(response.data))
                // console.log("token1", token)
                if(location.pathname == "/sign-in"){
                    // history.push("/");
                    window.location = "/";
                    // console.log("token path sign in: ",token)//null
                    store.addNotification(notificationLoginSuccess);
                    // window.location.reload();

                }
                else{
                    // history.push(from);
                    window.location.reload();
                    store.addNotification(notificationLoginSuccess);
                }
            }
            // console.log("token2", token)
        })
        .catch(err => {
            console.log("Error: ", err);
        })    
    }

    // console.log("token out Submit: ", token);

    const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
    const EyeSlash = <FontAwesomeIcon className="iconEye" icon ={faEyeSlash}/>;

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
        <div className="signIn">
            <div className="loginRegister">
                <div className="cardLoginRegister">
                    <div className="formLoginRegister">
                        <div className="formLoginRegister_container">
                            <header>
                                <h1>{content.titleSignIn}<a href="/" style={{textDecoration: "none", color: "black"}}>RoyalStay</a></h1>
                            </header>
                            <section>

                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    

                                    <button className="loginRegister_submit_btn" type="submit">{content.login}</button>

                                    <div className="loginRegister_subText">
                                        {content.notHaveAcc}
                                        <Link to="/sign-up"> {content.register}</Link>
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

export default SignIn
