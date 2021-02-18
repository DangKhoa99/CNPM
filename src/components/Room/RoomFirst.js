import React from 'react'
import "./RoomFirst.css"
import StarIcon from "@material-ui/icons/Star"

function RoomFirst({
    name,
    img1,
    img2,
    img3,
    img4,
    img5,
}) {
    return (
        <div className="roomFirst">
            <div className="roomFirst__container">
                <div className="roomFirst__heading">
                    <section>
                        <div className="roomFirst__heading__name">
                            <h1>{name}</h1>
                        </div>
                        <div className="roomFirst__heading__description">
                            <span className="roomFirst__heading__stars">
                                <StarIcon className="roomFirst__heading__star"/>
                                <strong>4.9 (41)</strong>
                            </span>
                            <span className="roomFirst__heading__dot">·</span>
                            <span className="roomFirst__heading__place">Thành phố Hội An, Quảng Nam, Việt Nam</span>
                        </div>
                    </section>
                </div>

                <div className="roomFirst__images">
                    <div className="roomFirst__gallery">
                        <figure className="gallery__item gallery__item--1">
                            <img src={img1} className="gallery__img" alt="Image 1" style={{borderBottomLeftRadius: 12 + 'px', borderTopLeftRadius: 12 + 'px'}}/>
                        </figure>

                        <figure className="gallery__item gallery__item--2">
                            <img src={img2} className="gallery__img" alt="Image 2"/>
                        </figure>

                        <figure className="gallery__item gallery__item--3">
                            <img src={img3} className="gallery__img" alt="Image 3"/>
                        </figure>

                        <figure className="gallery__item gallery__item--4">
                            <img src={img4} className="gallery__img" alt="Image 4" style={{borderTopRightRadius: 12 + 'px'}}/>
                        </figure>

                        <figure className="gallery__item gallery__item--5">
                            <img src={img5} className="gallery__img" alt="Image 5" style={{borderBottomRightRadius: 12 + 'px'}}/>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomFirst
