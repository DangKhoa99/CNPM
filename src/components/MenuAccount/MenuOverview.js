import React from 'react'
import "../../style/MenuOverView.css"
import * as myConstClass from "../../constants/constantsLanguage"

function MenuOverview({
    id,
    fullName,
    email,
    username,
    phone,
    sex,
    address,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    if(!sex){
        sex = content.female;
    }
    else{
        sex = content.male;
    }
    if(!phone){
        phone = content.notUpdate;
    }
    if(!address){
        address = content.notUpdate;
    }
    if(!email){
        email = content.notUpdate;
    }

    return (
        <div className="menuOverview">
            <div className="menuOverview_container">
                <h1 className="menuOverview_title">{content.accountOverview}</h1>
                <h3 className="menuOverview_subTitle">{content.profile}</h3>
                <section>
                    <table className="account_info_table">
                        <colgroup>
                            <col className="account_info_col"></col>
                            <col className="account_info_col"></col>
                        </colgroup>
                        <tbody>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">{content.idAccount}</td>
                                <td className="account_info_col_right">{id}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">{content.username}</td>
                                <td className="account_info_col_right">{username}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">{content.fullName}</td>
                                <td className="account_info_col_right">{fullName}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Email</td>
                                <td className="account_info_col_right">{email}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">{content.sex}</td>
                                <td className="account_info_col_right">{sex}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">{content.phoneNumber}</td>
                                <td className="account_info_col_right">{phone}</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">{content.address}</td>
                                <td className="account_info_col_right">{address}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <div>
                    <a className="edit_profile" href="/account/profile/">{content.editProfile}</a>
                </div>
            </div>
        </div>
    )
}

export default MenuOverview
