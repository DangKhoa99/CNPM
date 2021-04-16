import React, {useState, useEffect, useRef,  useCallback} from 'react'
import "../../style/MenuFavorite.css"

function MenuFavorite({
    favoriteHotel
}) {
    return (
        <div className="menuFavorite">
            <div className="menuFavorite_container">
                <h1 className="menuFavorite_title">Khách sạn yêu thích</h1>
                {/* {favoriteHotel} */}
                {favoriteHotel.map(hotel => {
                    return  <a className="menuFavorite_box" href={"/room-detail?id=" + hotel._id}>
                                <img src={hotel.imageLink[0]} alt=""/>
                                
                                <div className="menuFavorite_info">
                                    <div className="menuFavorite_infoTop">
                                        <h3>{hotel.name}</h3>
                                        <p>{hotel.address}</p>
                                    </div>
                                    <div className="menuFavorite_infoBottom">
                                        <div className="menuFavorite_price">
                                            <h2>${hotel.room.price}</h2><p> /đêm</p> 
                                        </div>
                                    </div>
                                </div>
                            </a>
                })}   
            </div>
        </div>
    )
}

export default MenuFavorite
