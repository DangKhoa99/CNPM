import React from 'react'
import "../../style/BookingHeader.css"
import { useHistory } from "react-router-dom";

function BookingHeader() {
    let history = useHistory();
    return (
        <div className="bookingHeader">
            <div className="bookingHeader_container">
                <div className="bookingHeader_block">
                    <div className="bookingHeader_back">
                        <button className="bookingHeader_icon" onClick={history.goBack}>
                        <i class="fas fa-chevron-left"></i>
                        </button>
                    </div>

                    <div className="bookingHeader_text">
                        Xác nhận đặt phòng và phương thức thanh toán
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingHeader
