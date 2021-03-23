import React from 'react'
import "../../style/RoomHeader.css"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"

function RoomHeader({
    name,
    img1,
    img2,
    img3,
    img4,
    img5,
}) {
    return (
        <div className="roomHeader">
            <div className="roomHeader_container">
                <div className="roomHeader_heading">
                    <section>
                        <div className="roomHeader_heading_name">
                            <h1>{name}</h1>
                        </div>
                        <div className="roomHeader_heading_description">
                            <div className="roomHeader_heading_description_left">
                                <span className="roomHeader_heading_stars">
                                    <StarIcon className="roomHeader_heading_star"/>
                                    <strong>4.9 (41)</strong>
                                </span>
                                <span className="roomHeader_heading_dot">·</span>
                                <span className="roomHeader_heading_place">Thành phố Hội An, Quảng Nam, Việt Nam</span>
                            </div>
                            
                            <div className="roomHeader_heading_description_right">
                                <button className="roomHeader_heading_btn">
                                    <span className="roomHeader_heading_heart">
                                        <Heart className="roomHeader_heading_heart_svg"/>
                                    </span>
                                    Lưu
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
