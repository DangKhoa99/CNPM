import React, {useState} from 'react'
import "../../style/RoomHeader.css"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"
import {ReactComponent as RedHeart} from "../../icons/iconRedHeart.svg"


import { store } from 'react-notifications-component'

function RoomHeader({
    name,
    img1,
    img2,
    img3,
    img4,
    img5,
    reference,
    click
}) {
    const [clickFavorite, setClickFavorite] = useState(false);

    const handleClickFavorite = () => setClickFavorite(!clickFavorite);

    let saveFavorite = "Lưu";
    if(clickFavorite == true){
        saveFavorite = "Đã lưu";
    }

    const notification_saveFavorite = {
        title: ' RoyalStay - Thông báo',
        message: 'Đã lưu khách sạn `' + name + '`',
        type: 'success',                         // 'default', 'success', 'info', 'warning'
        container: 'bottom-left',                // where to position the notifications
        dismiss: {
            duration: 2000
        }
    };

    const notification_notSaveFavorite = {
        title: 'RoyalStay - Thông báo',
        message: 'Bỏ lưu khách sạn `' + name + '`',
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };
    
    return (
        <div className="roomHeader" ref={reference}>
            <div className="roomHeader_container">
                
                <div className="roomHeader_heading">
                    <section>
                        <div className="roomHeader_heading_name">
                            <h1>Khách sạn {name}</h1>
                        </div>
                        <div className="roomHeader_heading_description">
                            <div className="roomHeader_heading_description_left">
                                <span className="roomHeader_heading_stars" onClick={click}>
                                    <StarIcon className="roomHeader_heading_star"/>
                                    <strong>4.9 (41)</strong>
                                </span>
                                <span className="roomHeader_heading_dot">·</span>
                                <span className="roomHeader_heading_place">Thành phố Hội An, Quảng Nam, Việt Nam</span>
                            </div>
                            
                            <div className="roomHeader_heading_description_right">
                                <button 
                                    className="roomHeader_heading_btn" 
                                    onClick={() => {
                                        handleClickFavorite(); 
                                        clickFavorite ? store.addNotification(notification_notSaveFavorite) : store.addNotification(notification_saveFavorite)
                                    }}
                                >
                                    <span className="roomHeader_heading_heart">
                                        {clickFavorite ? <RedHeart className="roomHeader_heading_redHeart_svg" /> : <Heart className="roomHeader_heading_heart_svg" />}
                                    </span>
                                    {saveFavorite}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="roomHeader_images">
                    <div className="roomHeader_gallery">
                        <figure className="gallery_item gallery_item--1">
                            <img src={img1} className="gallery_img" alt="Image 1" style={{borderBottomLeftRadius: 12 + 'px', borderTopLeftRadius: 12 + 'px'}}/>
                        </figure>

                        <figure className="gallery_item gallery_item--2">
                            <img src={img2} className="gallery_img" alt="Image 2"/>
                        </figure>

                        <figure className="gallery_item gallery_item--3">
                            <img src={img3} className="gallery_img" alt="Image 3"/>
                        </figure>

                        <figure className="gallery_item gallery_item--4">
                            <img src={img4} className="gallery_img" alt="Image 4" style={{borderTopRightRadius: 12 + 'px'}}/>
                        </figure>

                        <figure className="gallery_item gallery_item--5">
                            <img src={img5} className="gallery_img" alt="Image 5" style={{borderBottomRightRadius: 12 + 'px'}}/>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomHeader
