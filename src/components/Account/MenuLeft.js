import React, {useState} from 'react'
import "../../style/Account.css"
import {Avatar} from "@material-ui/core"
import {ReactComponent as IconHome} from "../../icons/iconHome.svg"
import {ReactComponent as IconEdit} from "../../icons/iconEdit.svg"
import {ReactComponent as IconFavorite} from "../../icons/iconFavorite.svg"
import {ReactComponent as IconBooking} from "../../icons/iconBooking.svg"
import {ReactComponent as IconHistoryBooking} from "../../icons/iconHistoryBooking.svg"

function MenuLeft({markPage}) {
    const [data, setData] = useState([
        {
            id: "overview",
            to: "/account/overview/",
            name: "Tổng quan về Tài khoản",
            icon: <IconHome/>,
            active: ""
        },
        {
            id: "profile",
            to: "/account/profile/",
            name: "Sửa hồ sơ",
            icon: <IconEdit/>,
            active: ""
        },
        {
            id: "favorite",
            to: "/account/favorite/",
            name: "Yêu thích",
            icon: <IconFavorite/>,
            active: ""
        },
        {
            id: "booking",
            to: "/account/booking/",
            name: "Khách sạn đang đặt",
            icon: <IconBooking/>,
            active: ""
        },
        {
            id: "history_booking",
            to: "/account/history-booking/",
            name: "Khách sạn đã đặt trước đây",
            icon: <IconHistoryBooking/>,
            active: ""
        },
    ])

    return (
        <div className="menuLeft">
            <div className="menuLeft_container">
                <Avatar className="account_avatar" alt="dangkhoa99" src="/images/Khoa.jpg"/>
                <ul className="menuLeft_list">
                    {data.map(item => {
                        if(item.id === markPage) 
                            item.active = "menu_active"
                        return <li id={item.id} className={"menuLeft_menuItem " + item.active}>
                                    <a className="menuLeft_menuLink" href={item.to}>
                                        {item.icon}
                                        {item.name}
                                    </a>
                                </li>
                    })}
                </ul>
            </div>

        </div>
    )
}

export default MenuLeft
