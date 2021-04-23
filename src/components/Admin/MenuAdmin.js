import React, {useState, useEffect}  from 'react'
import "../../style/MenuAdmin.css"
import {Avatar} from "@material-ui/core"
import {Link} from 'react-router-dom'

function MenuAdmin({
    markPage,
    fullName,
    nameUser,
    username,
    imageUser
}) {
    const data = [
        {
            id: "userManagement",
            to: "/account/admin/user-management/",
            name: "Quản lý người dùng",
            icon: <i class="fas fa-user-cog"></i>,
            active: ""
        },
        {
            id: "hotelManagement",
            to: "/account/admin/hotel-management/",
            name: "Quản lý khách sạn",
            icon: <i class="fas fa-hotel"></i>,
            active: ""
        },
    ];
    return (
        <div className="menuAdmin">

            <input type="checkbox" id="check"/>
            <label for="check">
                <i class="fas fa-bars" id="sidebar_btn"></i>
            </label>

            <div class="sidebar">
                <Avatar 
                    className="menuAdmin_avatar" 
                    alt={nameUser} 
                    // src="/images/Khoa.jpg"
                    src={nameUser}
                />
                <div className="menuAdmin_username">{username}</div>
                {data.map(item => {
                if(item.id === markPage) 
                    item.active = "menu_active"
                return  <div id={item.id} className={"menuAdmin_menuItem " + item.active}>
                            <Link className="menuAdmin_menuLink" to={item.to}>
                                {item.icon}
                                <span style={{fontSize: "16px"}}>{item.name}</span>
                            </Link>
                        </div>
                })}
            </div>
            <div class="content"></div>
        </div>
    )
}

export default MenuAdmin
