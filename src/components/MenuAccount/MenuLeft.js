import React, {useState} from 'react'
import "../../style/MenuAccount.css"
import {Avatar} from "@material-ui/core"
import {ReactComponent as IconHome} from "../../icons/iconHome.svg"
import {ReactComponent as IconEdit} from "../../icons/iconEdit.svg"
import {ReactComponent as IconFavorite} from "../../icons/iconFavorite.svg"
import {ReactComponent as IconBooking} from "../../icons/iconBooking.svg"
import {ReactComponent as IconHistoryBooking} from "../../icons/iconHistoryBooking.svg"




function MenuLeft({
    markPage,
}) {


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
    ]);

    const [selectedFile, setSelectedFile] = useState("/images/Khoa.jpg");

    // Select file (from the pop up)
    const onFileChange = (e) => {
        // setSelectedFile({selectedFile: e.target.files[0]});
        setSelectedFile(URL.createObjectURL(e.target.files[0]))
    }

    // On file upload (click the upload button)
    // const onFileUpload = () => {
    //     // Create an object of formData
    //     const formData = new FormData();

    //     // Update the formData object
    //     formData.append(
    //         "myFile",
    //         selectedFile,
    //         selectedFile.name
    //     );

    //     // Details of the uploaded file
    //     console.log(selectedFile);

    //     // Request mad to the backend api
    //     // Send formData object
    //     // axios.post("api/uploadFile", formData);
    // };

    //

    return (
        <div className="menuLeft">
            <div className="menuLeft_container">
                <div className="account_avatar_container">
                    <Avatar 
                        className="account_avatar" 
                        alt="dangkhoa99" 
                        // src="/images/Khoa.jpg"
                        src={selectedFile}
                    />               
                
                    <div className="account_avatar_edit">
                        <button className="account_avatar_edit_btn">
                            <div className="account_avatar_icon_edit">
                                <label for="upload_image">
                                    <svg viewBox="0 0 48 48">
                                        <path d="M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z"/>
                                    </svg>
                                    <span>Chọn ảnh</span>
                                </label>
                                <input type="file" name="image" id="upload_image" onChange={onFileChange}/>
                            </div>
                        </button>
                        
                    </div>

                    
                </div>

                {selectedFile!="/images/Khoa.jpg"?<div className="btn_upload_image"><button>Lưu</button></div>:""}

                <div className="account_username">dangkhoa99</div>

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
