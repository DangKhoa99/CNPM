import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"

function EditUserModal({
    fullName,
    username,
    isAdmin,
    customerId,
    token,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    
    let role = "User"
    if(isAdmin){
        role = "Admin"
    }

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            "fullName": fullName,
            "username": username,
            "role": role
        }
    });

    const onSubmit = async (data)  => {
        // console.log(data);

        let role = false;
        if(data.role == "Admin"){
            role = true;
        }
        // console.log(typeof(role))
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                customerId: customerId,
                isAdmin: role,
            },
            url: "http://localhost:5000/customer/editByAdmin"
        }
        // console.log("Request: ", options)
        axios(options)
        .then(response => {
            // console.log("EDIT USER: ", response.data);
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="customDialog">
            <div className="Content-module_content__1e-91">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input_row">
                        {content.fullName}
                        <input 
                            style={{cursor: "not-allowed"}}
                            className="form_input"
                            autoComplete="off"
                            disabled
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
                        {content.account}
                        <input
                            style={{cursor: "not-allowed"}}
                            className="form_input"
                            autoComplete="off"
                            type="text"
                            disabled
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
                    <button className="addUser_submit_btn" type="submit">{content.editInformation}</button>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal
