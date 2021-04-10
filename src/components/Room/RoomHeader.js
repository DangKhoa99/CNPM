import React, {useState} from 'react'
import "../../style/RoomHeader.css"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"
import {ReactComponent as RedHeart} from "../../icons/iconRedHeart.svg"

import Gallery from 'react-grid-gallery';


import { store } from 'react-notifications-component'

function RoomHeader({
    name,
    img,
    address,
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
        type: 'success',// 'default', 'success', 'info', 'warning'
        container: 'bottom-left',// where to position the notifications
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

    // const img1 = img[0];

    const IMAGES =
    [
        {
            src: img[0],
            thumbnail: img[0],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 1"
        },
        {
            src: img[1],
            thumbnail: img[1],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 2"
        },
        {
            src: img[2],
            thumbnail: img[2],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 3"
        },
        {
            src: img[3],
            thumbnail: img[3],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 4"
        },
        {
            src: img[4],
            thumbnail: img[4],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 5"
        },
    ];
    
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
                                <span className="roomHeader_heading_place">{address}</span>
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
                    <div 
                        style={{
                            display: "block",
                            minHeight: "1px",
                            width: "100%",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            overflow: "auto",
                            textAlign: "center",
                            background: "white"
                        }}
                    >
                        <Gallery 
                            images={IMAGES}
                            enableImageSelection={false}
                            backdropClosesModal={true}
                            showLightboxThumbnails={true}
                            maxRows="1"
                            rowHeight={300}
                        />
                    </div>
                    {/* <div className="roomHeader_gallery">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default RoomHeader
