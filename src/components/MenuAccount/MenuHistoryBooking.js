import React from 'react'
import "../../style/MenuHistoryBooking.css"

function MenuHistoryBooking() {
    return (
        <div className="menuHistoryBooking">
            <div className="menuHistoryBooking_container">
                <h1 className="menuHistoryBooking_title">Lịch sử đặt khách sạn</h1>
                
                <a className="menuHistoryBooking_box" href="#">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU" alt=""/>
                    <div className="menuHistoryBooking_info">
                        <div className="menuHistoryBooking_infoTop">
                            <h3>Holo Ben Thanh SaiGon - Serviced HomeStay</h3>
                            <p>6 tháng 8 2020 - 7 tháng 8 2020 · TP. Hồ Chí Minh</p>
                            <p className="hotel_booking_status success">Đã thanh toán</p>
                        </div>
                        <div className="menuHistoryBooking_infoBottom">
                            <div className="menuHistoryBooking_price">
                                <p>Tổng: </p>
                                <h2>1.520.000 VND</h2> 
                            </div>
                        </div>
                    </div>
                </a>

                <a className="menuHistoryBooking_box" href="#">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU" alt=""/>
                    <div className="menuHistoryBooking_info">
                        <div className="menuHistoryBooking_infoTop">
                            <h3>Holo Ben Thanh SaiGon - Serviced HomeStay</h3>
                            <p>6 tháng 8 2020 - 7 tháng 8 2020 · TP. Hồ Chí Minh</p>
                            <p className="hotel_booking_status error">Hủy</p>
                        </div>
                        <div className="menuHistoryBooking_infoBottom">
                            <div className="menuHistoryBooking_price">
                                <p>Tổng: </p>
                                <h2>1.520.000 VND</h2> 
                            </div>
                        </div>
                    </div>
                </a>

            </div>

        </div>
    )
}

export default MenuHistoryBooking
