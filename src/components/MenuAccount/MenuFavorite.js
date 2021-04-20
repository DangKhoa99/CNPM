import React, {useState, useEffect, useRef,  useCallback} from 'react'
import "../../style/MenuFavorite.css"

function MenuFavorite({
    favoriteHotel
}) {
    const [filterPrice, setFilterPrice] = useState(true); // false: giảm - true: tăng
    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);
    let price = "Giảm dần";
    if(filterPrice == true){
        price = "Tăng dần";
    }
    return (
        <div className="menuFavorite">
            <div className="menuFavorite_container">
                <h1 className="menuFavorite_title">Khách sạn yêu thích</h1>
                <div style={{marginBottom: "30px"}}>
                    <button className="searchPage_filter_hotel" onClick={handleClickFilterPrice}>
                        Giá: {price}
                    </button>
                </div>

                {filterPrice ? 
                    favoriteHotel.sort((a, b) => (a.room.price - b.room.price))
                        .map(hotel => {
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
                        })
                    :
                    favoriteHotel.sort((a, b) => (b.room.price - a.room.price))
                        .map(hotel => {
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
                        })
                }   
            </div>
        </div>
    )
}

export default MenuFavorite
