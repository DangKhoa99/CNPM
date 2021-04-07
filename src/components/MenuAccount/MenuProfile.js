import React, { useState } from 'react'
import "../../style/MenuProfile.css"
import { vi } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { Favorite } from '@material-ui/icons'

function MenuProfile() {
    const [date, setDate] = useState(new Date(2000, 8, 9))

    const [selectValue, setSelectValue] = useState("MALE");

    const handleSelectValue = (e) =>{
        let value = e.target.value;
        setSelectValue(value);
    }

    // const handleSubmitForm = (e) => {
    //     alert(Favorite);
    //     e.preventDefault();
    // }

    return (
        <div className="menuProfile">
            <div className="menuProfile_container">
                <h1 className="menuProfile_title">Chỉnh sửa hồ sơ</h1>
                <form 
                // onSubmit={e => this.handleSubmitForm(e)}
                >
                    <section className="menuProfile_form">
                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="fullName">Họ và tên</label>
                            <input type="text" id="fullName" className="menuProfile_form_input" name="fullName" value="Nguyễn Minh Đăng Khoa" />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="username">Tên tài khoản</label>
                            <input type="text" id="username" className="menuProfile_form_input" disabled="true" name="username" value="dangkhoa99" />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="password">Mật khẩu</label>
                            <input type="password" id="password" className="menuProfile_form_input" disabled="true" name="password" value="123456" />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="email">Địa chỉ Email</label>
                            <input type="text" id="email" className="menuProfile_form_input" name="email" value="51800882@student.tdtu.edu.vn" />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="birthDay">Ngày sinh</label>
                            {/* <input type="text" id="birthDay" className="menuProfile_form_input" name="birthDay" value="09/09/2000" /> */}
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
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="address">Địa chỉ</label>
                            <input type="text" id="address" className="menuProfile_form_input" name="address" value="19 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh" />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="phone">Số điện thoại</label>
                            <input type="text" id="phone" className="menuProfile_form_input" name="phone" value="0982876890" />
                        </div>

                        <div className="menuProfile_form_row">
                            <label className="menuProfile_form_label" for="gender">Giới tính</label>
                            {/* <input type="text" id="gender" name="gender" className="menuProfile_form_input" value={selectValue} /> */}
                            
                            <div className="menuProfile_form_select">
                                <select 
                                    className="menuProfile_form_select_options" 
                                    // defaultValue="MALE"
                                    value={selectValue}
                                    onChange={e => handleSelectValue(e)}
                                >
                                    <option value="NEUTRAL">Giới tính trung lập</option>
                                    <option value="MALE">Nam</option>
                                    <option value="FEMALE">Nữ</option>
                                </select>
                                <svg viewBox="0 0 1024 1024">
                                    <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"/>
                                </svg>
                            </div>
                        </div>
                    </section>
                    <div className="menuProfile_form_btn">
                        <a className="menuProfile_form_btn_cancel" href="/account/overview">Hủy</a>
                        <button className="menuProfile_form_submit" type="submit">
                            <div className="menuProfile_form_submit_text">Lưu hồ sơ</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MenuProfile
