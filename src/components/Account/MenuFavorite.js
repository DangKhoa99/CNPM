import React from 'react'
import "../../style/MenuFavorite.css"

function MenuFavorite() {
    return (
        <div className="menuFavorite">
            <div className="menuFavorite_container">
                <h1 className="menuFavorite_title">Khách sạn yêu thích</h1>

                <a className="menuFavorite_box" href="/room-detail?id=">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU" alt=""/>
                    
                    <div className="menuFavorite_info">
                        <div className="menuFavorite_infoTop">
                            <h3>Holo Ben Thanh SaiGon - Serviced HomeStay</h3>
                            <p>Vị trí: TP. Hồ Chí Minh</p>
                        </div>
                        <div className="menuFavorite_infoBottom">
                            <div className="menuFavorite_price">
                                <h2>520.000 VND</h2><p>/đêm</p> 
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </div>
    )
}

export default MenuFavorite
