import React, {useState} from 'react'
import "../../style/MenuFavorite.css"
import * as myConstClass from "../../constants/constantsLanguage"
import NoItem from "../NoItem"

function MenuFavorite({
    favoriteHotel,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const [filterPrice, setFilterPrice] = useState(true); // false: giảm - true: tăng
    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);
    let price = content.decrease;
    if(filterPrice == true){
        price = content.increase;
    }
    return (
        <div className="menuFavorite">
            <div className="menuFavorite_container">
                <h1 className="menuFavorite_title">{content.hotelsFavorite}</h1>
                <div style={{marginBottom: "30px"}}>
                    <button className="searchPage_filter_hotel" onClick={handleClickFilterPrice}>
                    <i className="fas fa-funnel-dollar"/> {price} {filterPrice? <i className="fas fa-long-arrow-alt-up"/> : <i className="fas fa-long-arrow-alt-down"/>}
                    </button>
                </div>

                {filterPrice ? 
                    favoriteHotel.length == 0 ? <NoItem text={content.noFavoriteHotel}/>
                    :
                    favoriteHotel.sort((a, b) => (a.room.price - b.room.price))
                        .map((hotel, index) => {
                            return  <a key={index + hotel} className="menuFavorite_box" href={"/room-detail/" + hotel._id}>
                                        <img src={hotel.imageLink[0]} alt=""/>
                                        
                                        <div className="menuFavorite_info">
                                            <div className="menuFavorite_infoTop">
                                                <h3>{hotel.name}</h3>
                                                <p>{hotel.address}</p>
                                            </div>
                                            <div className="menuFavorite_infoBottom">
                                                <div className="menuFavorite_price">
                                                    <h2>${hotel.room.price}</h2><p> /{content.night}</p> 
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                        })
                    :
                    favoriteHotel.sort((a, b) => (b.room.price - a.room.price))
                        .map((hotel, index) => {
                            return  <a key={index + hotel} className="menuFavorite_box" href={"/room-detail/" + hotel._id}>
                                        <img src={hotel.imageLink[0]} alt=""/>
                                        
                                        <div className="menuFavorite_info">
                                            <div className="menuFavorite_infoTop">
                                                <h3>{hotel.name}</h3>
                                                <p>{hotel.address}</p>
                                            </div>
                                            <div className="menuFavorite_infoBottom">
                                                <div className="menuFavorite_price">
                                                    <h2>${hotel.room.price}</h2><p> /{content.night}</p> 
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
