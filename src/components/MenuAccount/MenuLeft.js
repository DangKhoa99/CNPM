import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import {Avatar} from "@material-ui/core"
import {Link} from 'react-router-dom'
import * as myConstClass from "../../constants/constantsLanguage"

function MenuLeft({
    markPage,
    fullName,
    nameUser,
    username,
    imageUser,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const data = [
        {
            id: "overview",
            to: "/account/overview/",
            name: " " + content.accountOverview,
            icon: <i className="fas fa-user-circle"></i>,
            active: ""
        },
        {
            id: "profile",
            to: "/account/profile/",
            name: content.editProfile,
            icon: <i className="fas fa-user-edit"></i>,
            active: ""
        },
        {
            id: "favorite",
            to: "/account/favorite/",
            name: " " + content.favorite,
            icon: <i className="fab fa-gratipay"></i>,
            active: ""
        },
        {
            id: "history_booking",
            to: "/account/history-booking/",
            name: " " + content.hotelBookingHistory,
            icon: <i className="fas fa-history"></i>,
            active: ""
        },
        {
            id: "password",
            to: "/account/password/",
            name: content.changePassword,
            icon: <i className="fas fa-key"></i>,
            active: ""
        },
    ]

    const [selectedFile, setSelectedFile] = useState(imageUser);

    useEffect(() => {
        setSelectedFile(imageUser);
    }, [imageUser])

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
                        alt={nameUser} 
                        // src="/images/Khoa.jpg"
                        src={selectedFile}
                    />               
                
                    {/* <div className="account_avatar_edit">
                        <button className="account_avatar_edit_btn">
                            <div className="account_avatar_icon_edit">
                                <label htmlFor="upload_image">
                                    <i className="fas fa-upload" style={{fontSize: "50px", marginBottom: "10px"}}/>
                                    <span>{content.selectImage}</span>
                                </label>
                                <input type="file" name="image" id="upload_image" onChange={onFileChange}/>
                            </div>
                        </button>
                    </div> */}
                </div>

                {selectedFile != imageUser ? 
                    <div className="btn_upload_image"><button>Lưu</button></div> 
                    : 
                    ""
                }

                <div className="account_username">{username}</div>

                <ul className="menuLeft_list">
                    {data.map((item, index) => {
                        if(item.id === markPage) 
                            item.active = "menu_active"
                        return  <li key={index + item} id={item.id} className={"menuLeft_menuItem " + item.active}>
                                    <Link className="menuLeft_menuLink" to={item.to}>
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MenuLeft
