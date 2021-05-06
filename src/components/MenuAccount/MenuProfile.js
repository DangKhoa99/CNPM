import React, { useState, useEffect } from 'react'
import "../../style/MenuProfile.css"
// import { vi } from 'date-fns/locale'
// import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
// import { Favorite } from '@material-ui/icons'
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
    language
}) {
    // const [date, setDate] = useState(new Date(2000, 8, 9))
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const [selectValue, setSelectValue] = useState(sex);
    const [changeFullName, setChangeFullName] = useState(fullName);
    const [changeEmail, setChangeEmail] = useState(email);

    useEffect(() => {
        setChangeFullName(fullName);
        setChangeEmail(email);
    },[fullName])

    const handleChangeFullName = (e) => {
        let value = e.target.value;
        setChangeFullName(value);
    }

    const handleChangeEmail = (e) => {
        let value = e.target.value;
        setChangeEmail(value);
    }

    const handleSelectValue = (e) =>{
        let value = e.target.value;
        setSelectValue(value);
    }

    const handleSubmitEditProfile = (e) => {
        e.preventDefault();
    }

    return (
        <div className="menuProfile">
            <div className="menuProfile_container">
                <h1 className="menuProfile_title">{content.editProfile}</h1>
                <form 
                // onSubmit={e => this.handleSubmitForm(e)}
                >
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
                        </div>

                        {/* <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="birthDay">Ngày sinh</label>
                            <input type="text" id="birthDay" className="menuProfile_form_input" name="birthDay" value="09/09/2000" />
                            <DatePicker 
                                date={date} 
                                onDateChange={setDate} 
                                locale={vi}
                                format="dd/MM/yyyy"
                            >
                            {({ inputProps, focused }) => (
                                <input
                                id="birthDay"
                                name="birthDay"
                                className={'menuProfile_form_input ' + (focused ? ' -focused' : '')}
                                {...inputProps}
                                />
                            )}
                            </DatePicker>
                        </div> */}

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="address">{content.address}</label>
                            <input 
                                type="text" 
                                id="address" 
                                className="menuProfile_form_input" 
                                name="address" 
                                value={address}
                                // onChange={changeAddress}
                            />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="phone">{content.phoneNumber}</label>
                            <input 
                                type="text" 
                                id="phone" 
                                className="menuProfile_form_input" 
                                name="phone" 
                                value={phone}
                                // onChange={changePhone}
                            />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" htmlFor="gender">{content.sex}</label>
                            {/* <input type="text" id="gender" name="gender" className="menuProfile_form_input" value={selectValue} /> */}
                            
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
                        </div>
                    </section>
                    <div className="menuProfile_form_btn">
                        <a className="menuProfile_form_btn_cancel" href="/account/overview">{content.cancel}</a>
                        <button className="menuProfile_form_submit" type="submit" onClick={handleSubmitEditProfile}>
                            <div className="menuProfile_form_submit_text">{content.saveProfile}</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MenuProfile
