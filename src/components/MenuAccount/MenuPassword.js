import React, {useState} from 'react'
import "../../style/MenuPassword.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { store } from 'react-notifications-component'

function MenuPassword({
    id,
    language,
    token
}) {

    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const notificationConfirmPassword = {
        title: ' RoyalStay - ' + content.notification,
        message: content.notMatchPassword,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notificationOldPasswordIncorrect= {
        title: ' RoyalStay - ' + content.notification,
        message: content.oldPasswordIncorrect,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notificationChangePasswordSuccess= {
        title: ' RoyalStay - ' + content.notification,
        message: content.changePasswordSuccess,
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [submittedData, setSubmittedData] = useState({});

    const onSubmit = async (data)  => {
        // console.log(data);
        setSubmittedData(data);

        if(data.newPassword2 != data.newPassword){
            store.addNotification(notificationConfirmPassword);
        }
        else{
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": id,
                    "oldPassword": data.oldPassword,
                    "newPassword": data.newPassword
                },
                url: "http://localhost:5000/customer/changePassword"
            }
            axios(options)
            .then(response => {
                // console.log("PASSWORD: ", response.data)
                if(response.data == "Mật khẩu cũ không chính xác"){
                    store.addNotification(notificationOldPasswordIncorrect);
                    setSubmittedData({});
                }
                else{
                    store.addNotification(notificationChangePasswordSuccess);
                    reset(submittedData);
                    setSubmittedData({});
                    if(showOldPassword == true){
                        setShowOldPassword(false);
                    }
                    if(showNewPassword == true){
                        setShowNewPassword(false);
                    }
                }
            })
            .catch(error => console.log(error))
        }
    }

    const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
    const EyeSlash = <FontAwesomeIcon className="iconEye" icon={faEyeSlash}/>;

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);

    const changeTypeOldPassword = () => {
        setShowOldPassword(!showOldPassword)
    }

    const changeTypeNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    return (
        <div className="menuPassword">
            <div className="menuPassword_container">
                <h1 className="menuPassword_title">{content.changePassword}</h1>
                <p style={{color: "#999", marginBottom: "30px", fontSize: "14px"}}>{content.subTitleMenuPassword}<i className="fas fa-lock" style={{marginLeft: "10px"}}/></p>

                <div className="menuPassword_frame">
                    <form className="menuPassword_form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input_row">
                            <h4>{content.currentPassword}</h4><br></br>
                            <div className="eye">
                                <input 
                                    className="form_input"
                                    autoComplete="off"
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder={content.enterCurrentPassword}
                                    {...register("oldPassword", {
                                        required: content.pleaseEnterPassword,
                                        minLength: {
                                            value: 6,
                                            message: content.validationPassword
                                        }
                                    })}

                                />
                                {showOldPassword ? <i onClick={changeTypeOldPassword}>{Eye}</i> : <i onClick={changeTypeOldPassword}>{EyeSlash}</i>}
                            </div>
                            {errors.oldPassword && <p>⚠ {errors.oldPassword.message}</p>}
                        </div>

                        <div className="input_row">
                            <h4>{content.newPassword}</h4><br></br>
                            <div className="eye">
                                <input 
                                    className="form_input"
                                    autoComplete="off"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder={content.enterNewPassword}
                                    {...register("newPassword", {
                                        required: content.pleaseEnterPassword,
                                        minLength: {
                                            value: 6,
                                            message: content.validationPassword
                                        },
                                        pattern: {
                                            value: /^((?!.*[\s])(?=.*[a-zA-Z])(?=.*\d).{6,15})/i,
                                            message: content.validationNewPassword
                                        }
                                    })}
                                />
                                {showNewPassword ? <i onClick={changeTypeNewPassword}>{Eye}</i> : <i onClick={changeTypeNewPassword}>{EyeSlash}</i>}
                            </div>
                            {errors.newPassword && <p>⚠ {errors.newPassword.message}</p>}
                        </div>

                        <div className="input_row">
                            <h4>{content.confirmNewPassword}</h4><br></br>
                            <div className="eye">
                                <input 
                                    className="form_input"
                                    autoComplete="off"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder={content.confirmNewPassword}
                                    {...register("newPassword2", {
                                        required: content.pleaseEnterPassword,
                                        minLength: {
                                            value: 6,
                                            message: content.validationPassword
                                        },
                                        pattern: {
                                            value: /^((?!.*[\s])(?=.*[a-zA-Z])(?=.*\d).{6,15})/i,
                                            message: content.validationNewPassword
                                        }
                                    })}
                                />
                                {showNewPassword ? <i onClick={changeTypeNewPassword}>{Eye}</i> : <i onClick={changeTypeNewPassword}>{EyeSlash}</i>}
                            </div>
                            {errors.newPassword2 && <p>⚠ {errors.newPassword2.message}</p>}
                        </div>

                        <div className="menuPassword_form_btn">
                            <button className="menuPassword_form_submit" type="submit">
                                <div className="menuPassword_form_submit_text">{content.saveChangePassword}</div>
                            </button>
                        </div>
                    </form>

                    <div className="menuPassword_suggestion">
                        <h4>{content.yourPassword}</h4>
                        <br></br>
                        <p style={{color: "#999", marginBottom: "30px", fontSize: "14px"}}>{content.noticeYourPassword}</p>
                        <p style={{color: "#999", marginBottom: "30px", fontSize: "14px"}}>{content.noticeYourPassword1}</p>
                        <p style={{color: "#999", marginBottom: "30px", fontSize: "14px"}}>{content.noticeYourPassword2}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuPassword
