import React, {useRef, useState} from 'react'
import "../../style/AddUser.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"
import { store } from 'react-notifications-component'

function AddUser({
    token,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const notificationExistUsername = {
        title: ' RoyalStay - ' + content.notification,
        message: content.existUsername,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data)  => {
        console.log(data);

        let role = false;
        if(data.role == "Admin"){
            role = true;
        }

        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                name: data.fullName,
                username: data.username,
                email: data.email,
                password: data.password,
                isAdmin: role
            },
            url: "http://localhost:5000/customer/add"
        }
        axios(options)
        .then(response => {
            // console.log("ADD USER: ", response.data)
            if(response.data == "Tên tài khoản đã tồn tại"){
                store.addNotification(notificationExistUsername);
            }
            else{
                window.location.reload()
            }
        })
        .catch(error => console.log(error))
    }
    // console.log(errors);

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
        <div className="addUser">
            <div className="customDialog">
                <div className="Content-module_content__1e-91">
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

                        <div className="input_row">
                            {content.role}
                            <div className="menuProfile_form_select">
                                <select
                                    className="menuProfile_form_select_options"
                                    {...register("role", { required: true })}
                                >
                                    <option value="Admin">{content.admin}</option>
                                    <option value="User">{content.user}</option>
                                </select>
                                <svg viewBox="0 0 1024 1024">
                                    <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"/>
                                </svg>
                            </div>
                        </div>

                        <button className="addUser_submit_btn" type="submit">{content.addUser}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser
