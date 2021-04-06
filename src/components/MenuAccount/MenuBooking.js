import React from 'react'
import "../../style/MenuBooking.css"

function MenuBooking() {
    return (
        <div className="menuBooking">
            <div className="menuBooking_container">
                <h1 className="menuBooking_title">Khách sạn đang đặt</h1>

                <a className="menuBooking_box" href="#">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU" alt=""/>
                    <div className="menuBooking_info">
                        <div className="menuBooking_infoTop">
                            <h3>Holo BaNa Hill - Serviced HomeStay</h3>
                            <p>26 tháng 03 2021 - 29 tháng 3 2021 · TP. Đà Nẵng</p>
                            <p className="hotel_booking_status wait">Chờ thanh toán</p>
                        </div>
                        <div className="menuBooking_infoBottom">
                            <div className="menuBooking_price">
                                <h2>500.000 VND</h2> 
                                <p> /đêm</p>
                            </div>
                        </div>
                    </div>
                </a>
                

            </div>

        </div>
    )
}

export default MenuBooking
