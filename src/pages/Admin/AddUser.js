import React, {useRef, useState} from 'react'
import "../../style/AddUser.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import useToken from '../../hooks/useToken'
import axios from 'axios'
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"
import SignIn from '../SignIn/SignIn'

function AddUser() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;
    language === "English"
      ? (content = content.English)
      : (content = content.Vietnam);
    const { token, setToken } = useToken();

    let history = useHistory();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data)  => {
        console.log(data);

        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                name: data.fullName,
                username: data.username,
                email: data.email,
                password: data.password   
            },
            url: "http://localhost:5000/customer/add"
        }
        axios(options)
        .then(response => {
            console.log("ADD USER: ", response.data)
            window.location = "/account/admin/user-management/"
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

    if(!token){
        return <SignIn />
    }
    
    document.title = content.addUser + " | RoyalStay"
    return (
        <div className="addUser">
            <button className="bookingHeader_icon" onClick={history.goBack} title={content.return}>
            <i className="fas fa-chevron-left"></i>
            </button>

            <div className="addUser_header">
                <h1 style={{marginBottom: "20px", fontSize: "50px", textTransform: "uppercase"}}>{content.addUser}</h1>
            </div>

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

                <button className="addUser_submit_btn" type="submit">{content.addUser}</button>
            </form>
            
        </div>
    )
}

export default AddUser
