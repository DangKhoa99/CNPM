import React from 'react'
import "../../style/MenuOverView.css"

function menuOverview({
    id,
    fullName,
    email,
    username,
    phone,
    sex,
    address,
}) {
    if(!sex){
        sex = "Chưa cập nhật";
    }
    if(!phone){
        phone = "Chưa cập nhật";
    }
    if(!address){
        address = "Chưa cập nhật";
    }
    if(!email){
        email = "Chưa cập nhật";
    }

    return (
        <div className="menuOverview">
            <div className="menuOverview_container">
                <h1 className="menuOverview_title">Tổng quan về tài khoản</h1>
                <h3 className="menuOverview_subTitle">Hồ sơ</h3>
                <section>
                    <table className="account_info_table">
                        <colgroup>
                            <col className="account_info_col"></col>
                            <col className="account_info_col"></col>
                        </colgroup>
                        <tbody>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Id tài khoản</td>
                                <td className="account_info_col_right">{id}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Tên tài khoản</td>
                                <td className="account_info_col_right">{username}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Họ và tên</td>
                                <td className="account_info_col_right">{fullName}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Email</td>
                                <td className="account_info_col_right">{email}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Giới tính</td>
                                <td className="account_info_col_right">{sex}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Số điện thoại</td>
                                <td className="account_info_col_right">{phone}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Địa chỉ</td>
                                <td className="account_info_col_right">{address}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <div>
                    <a className="edit_profile" href="/account/profile/">Chỉnh sửa hồ sơ</a>
                </div>
            </div>
        </div>
    )
}

export default menuOverview
