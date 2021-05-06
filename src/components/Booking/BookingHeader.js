import React from 'react'
import "../../style/BookingHeader.css"
import { useHistory } from "react-router-dom";
import * as myConstClass from "../../constants/constantsLanguage"

function BookingHeader({language}) {
    let history = useHistory();
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    return (
        <div className="bookingHeader">
            <div className="bookingHeader_container">
                <div className="bookingHeader_block">
                    <div className="bookingHeader_back">
                        <button className="bookingHeader_icon" onClick={history.goBack}>
                        <i className="fas fa-chevron-left"></i>
                        </button>
                    </div>

                    <div className="bookingHeader_text">
                        {content.confirmOrderRoom}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingHeader
