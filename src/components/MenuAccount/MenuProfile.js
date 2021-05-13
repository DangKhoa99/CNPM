import React, { useState, useEffect } from 'react'
import "../../style/MenuProfile.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"

function MenuProfile({
    id,
    fullName,
    email,
    username,
    password,
    phone,
    sex,
    address,
    language,
    token
}) {

    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

        let gender = "Female"
        if(sex){
            gender = "Male"
        }

        const { register, handleSubmit, formState: { errors }} = useForm({
            defaultValues: {
                "idCustomer": id,
                "fullName": fullName,
                "username": username,
                "email": email,
                "phoneNumber": phone,
                "address": address,
                "sex": gender
            }
        });

        const onSubmit = async (data)  => {
            console.log(data);

            let gender = false;
            if(data.sex == "Male"){
                gender = true;
            }

            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    customerId: id,
                    name: data.fullName,
                    email: data.email,
                    phone: data.phoneNumber,
                    sex: gender,
                    address: data.address
                },
                url: "http://localhost:5000/customer/edit"
            }
            axios(options)
            .then(response => {
                window.location = "/account/overview/";
            })
            .catch(error => console.log(error))
        }

    return (
        <div className="menuProfile">
            <div className="menuProfile_container">
                <h1 className="menuProfile_title">{content.editProfile}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input_row">
                        {content.idAccount}
                        <input
                            style={{cursor: "not-allowed", backgroundColor:"#FAFAFA"}}
                            className="form_input"
                            autoComplete="off"
                            type="text"
                            disabled
                            {...register("idCustomer", {
                                required: content.validationUsername
                            })} 
                        />
                        {errors.idCustomer && <p>⚠ {errors.idCustomer.message}</p>}
                    </div>

                    <div className="input_row">
                        {content.account}
                        <input
                            style={{cursor: "not-allowed", backgroundColor:"#FAFAFA"}}
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
                        {content.fullName}
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
                        Email
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
                        {content.address}
                        <input 
                            className="form_input"
                            autoComplete="off"
                            type="text" 
                            placeholder="Nhập đia chỉ của bạn"
                            {...register("address", {
                                required: "Vui lòng nhập địa chỉ", 
                            })} 
                        />
                        {errors.address && <p>⚠ {errors.address.message}</p>}
                    </div>

                    <div className="input_row">
                        {content.phoneNumber}
                        <input 
                            className="form_input"
                            autoComplete="off"
                            type="text" 
                            placeholder="Nhập số điện thoại"
                            {...register("phoneNumber", {
                                required: "Vui lòng nhập số điện thoại", 
                                minLength: {
                                    value: 8,
                                    message: "Số điện thoại ít nhất 8 số"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Số điện thoại không vượt quá 12 số"
                                }
                            })} 
                        />
                        {errors.phoneNumber && <p>⚠ {errors.phoneNumber.message}</p>}
                    </div>

                    <div className="input_row">
                        {content.sex}
                        <div className="menuProfile_form_select">
                            <select
                                className="menuProfile_form_select_options"
                                {...register("sex", { required: true })}
                            >
                                <option value="Male">{content.male}</option>
                                <option value="Female">{content.female}</option>
                            </select>
                            <svg viewBox="0 0 1024 1024">
                                <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"/>
                            </svg>
                        </div>
                    </div>

                    <div className="menuProfile_form_btn">
                        <a className="menuProfile_form_btn_cancel" href="/account/overview">{content.cancel}</a>
                        <button className="menuProfile_form_submit" type="submit">
                            <div className="menuProfile_form_submit_text">{content.saveProfile}</div>
                        </button>
                    </div>
                </form>

                {/* <form>
                    <section className="menuProfile_form">
                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="account_id">{content.idAccount}</label>
                            <input 
                                type="text" 
                                id="account_id" 
                                className="menuProfile_form_input" 
                                disabled
                                name="account_id" 
                                value={id}
                            />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="fullName">{content.fullName}</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                className="menuProfile_form_input" 
                                name="fullName" 
                                value={changeFullName}
                                onChange={handleChangeFullName}
                            />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="username">{content.username}</label>
                            <input 
                                type="text" 
                                id="username" 
                                className="menuProfile_form_input" 
                                disabled
                                name="username" 
                                value={username}
                            />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="password">{content.password}</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="menuProfile_form_input" 
                                disabled
                                name="password" 
                                value={password}
                            />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="text" 
                                className="menuProfile_form_input" 
                                name="email"
                                value={changeEmail}
                                onChange={handleChangeEmail}
                            />
                        </div> */}

                        {/* <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="address">{content.address}</label>
                            <input 
                                type="text" 
                                id="address" 
                                className="menuProfile_form_input" 
                                name="address" 
                                value={address}
                            />
                        </div> */}

                        {/* <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="phone">{content.phoneNumber}</label>
                            <input 
                                type="text" 
                                id="phone" 
                                className="menuProfile_form_input" 
                                name="phone" 
                                value={phone}
                            />
                        </div> */}

                        {/* <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="gender">{content.sex}</label>
                            
                            <div className="menuProfile_form_select">
                                <select 
                                    className="menuProfile_form_select_options" 
                                    // defaultValue="MALE"
                                    value={selectValue}
                                    onChange={e => handleSelectValue(e)}
                                >
                                    <option value="NEUTRAL">{content.neutral}</option>
                                    <option value="MALE">{content.male}</option>
                                    <option value="FEMALE">{content.female}</option>
                                </select>
                                <svg viewBox="0 0 1024 1024">
                                    <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"/>
                                </svg>
                            </div>
                        </div> */}
                    {/* </section> */}
                    {/* <div className="menuProfile_form_btn">
                        <a className="menuProfile_form_btn_cancel" href="/account/overview">{content.cancel}</a>
                        <button className="menuProfile_form_submit" type="submit" onClick={handleSubmitEditProfile}>
                            <div className="menuProfile_form_submit_text">{content.saveProfile}</div>
                        </button>
                    </div> */}
                {/* </form> */}
            </div>
        </div>
    )
}

export default MenuProfile
