import React, {useState, useEffect}  from 'react'
import "../../style/MenuAdmin.css"
import {Avatar} from "@material-ui/core"
import {Link} from 'react-router-dom'
import * as myConstClass from "../../constants/constantsLanguage"

function MenuAdmin({
    markPage,
    fullName,
    nameUser,
    username,
    imageUser,
    language,
    token
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const data = [
        {
            id: "userManagement",
            to: "/account/admin/user-management/",
            name: content.userManagement,
            icon: <i className="fas fa-user-cog"></i>,
            active: ""
        },
        {
            id: "hotelManagement",
            to: "/account/admin/hotel-management/",
            name: content.hotelManagement,
            icon: <i className="fas fa-hotel"></i>,
            active: ""
        },
    ];

    return (
        <div className="menuAdmin">
            <input type="checkbox" id="check"/>
            <label htmlFor="check">
                <i className="fas fa-bars" id="sidebar_btn"></i>
            </label>

            <div className="sidebar">
                <Avatar 
                    className="menuAdmin_avatar" 
                    alt={nameUser} 
                    // src="/images/Khoa.jpg"
                    src={nameUser}
                />
                <div className="menuAdmin_username">{username} {token.isAdmin ? <i style={{color: "green", fontSize: "14px"}} className="fas fa-check-circle"/> : ""}</div>
                {data.map((item, index) => {
                if(item.id === markPage) 
                    item.active = "menu_active"
                return  <div key={index + index} id={item.id} className={"menuAdmin_menuItem " + item.active}>
                            <Link className={"menuAdmin_menuLink " + item.active} to={item.to}>
                                {item.icon}
                                <span style={{fontSize: "16px"}}>{item.name}</span>
                            </Link>
                        </div>
                })}
            </div>
            <div className="content"></div>
        </div>
    )
}

export default MenuAdmin
