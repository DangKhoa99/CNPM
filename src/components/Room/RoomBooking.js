import React, {useState, useEffect} from 'react'
import "../../style/RoomBooking.css"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { store } from 'react-notifications-component'
import * as myConstClass from "../../constants/constantsLanguage"
import {calDate} from "../../helpers/calDate"

function RoomBooking({
    priceSmallRoom,
    priceMediumRoom,
    priceLargeRoom,
    roomType,
    quantity,
    price,
    idHotel,
    language
}) {
    let content = myConstClass.LANGUAGE;

    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    
    // DATE RANGE PICKER
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const onStartDateChange = (e) => {
        setStartDate(e)
    }

    const onEndDateChange = (e) => {
        setEndDate(e)
    }

    const modifiers = {
      // disabled: date => getDay(date) === 6, // Disables T7
      highlight: date => getDay(date) === 0 // Highlights CN
    }
    
    const modifiersClassNames = {
      highlight: '-highlight'
    }

    function removeOptional(){
        setStartDate(null);
        setEndDate(null);
        setRoom(roomType[0]);
    }

    const [room, setRoom] = useState(roomType[0]);

    const onRoomChanged = (e) => {
        setRoom(e.currentTarget.value);
    }

    // Chưa điền đầy đủ
    const notification_notFilled = {
        title: ' RoyalStay - ' + content.notification,
        message: content.fillOrder,
        type: 'warning',
        container: 'top-right',
        dismiss: {
            duration: 2000
        }
    };

    // Check EndDate
    const notification_checkEndDate = {
        title: ' RoyalStay - ' + content.notification,
        message: content.minNumberOfNight,
        type: 'warning',
        container: 'top-right',
        dismiss: {
            duration: 3000
        }
    };

    const handleOrderRoom = (e) => {
        if(!startDate){
            e.preventDefault();
            store.addNotification(notification_notFilled);
        }
        else if(!endDate){
            e.preventDefault();
            store.addNotification(notification_notFilled);
        }
        else if(calDate(startDate, endDate) == 0){
            e.preventDefault();
            store.addNotification(notification_checkEndDate);
        }
    }

    // Not allow order hotel
    const notification_notAllowOrder = {
        title: ' RoyalStay - ' + content.notification,
        message: content.outOfRooms,
        type: 'info',
        container: 'top-right',
        dismiss: {
            duration: 3000
        }
    };

    const notAllowOrderRoom = (e) => {
        e.preventDefault();
        store.addNotification(notification_notAllowOrder);
    }

    const [allowOrder, setAllowOrder] = useState(true)
    useEffect(() => {
        if(quantity <= 0){
            setAllowOrder(false)
        }
    },[quantity])


    let pricePerNight = 0;
    if (room == "Small"){;
        pricePerNight = priceSmallRoom;
    }
    else if (room == "Medium"){
        pricePerNight = priceMediumRoom; 
    }
    else if (room == "Large"){
        pricePerNight = priceLargeRoom; 
    }
    
    return (
        <div className="roomBooking">
            <div className="roomBooking_box">
                <div className="roomBooking_box_layout">
                    <div className="roomBooking_box_layout_header">
                        <div className="roomBooking_box_layout_header_defaultPrice">
                            <span className="roomBooking_defaultPrice">${pricePerNight}</span>
                            <span className="roomBooking_night">/{content.night}</span>
                        </div>

                        <button className="roomBooking_btn_remove" title={content.clearDates} onClick={removeOptional}>
                            {content.clearDates}
                        </button>
                    </div>

                    <form className="form_booking" action="/booking">
                        <div className="roomBooking_box_layout_body">
                            <div className="roomBooking_box_layout_body_row">
                                <div className="roomBooking_box_layout_body_row_a">
                                    <input style={{display: "none"}} name="id" value={idHotel}/>
                                    <h2>{startDate && endDate ? content.numberOfNights + calDate(startDate, endDate) : startDate ? content.selectCheckoutDate : content.selectCheckInDate}</h2>

                                    <p>{startDate && endDate ? format(startDate, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDate, 'dd MMM yyyy', { locale: vi }) : content.exactPricing}</p>

                                    <DateRangePicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        onStartDateChange={onStartDateChange}
                                        onEndDateChange={onEndDateChange}
                                        minimumDate={new Date()}
                                        minimumLength={0}
                                        format='dd/MM/yyyy'
                                        locale={vi}
                                        modifiers={modifiers}
                                        modifiersClassNames={modifiersClassNames}
                                    >
                                        {({ startDateInputProps, endDateInputProps, focus }) => (
                                        <div className='date-range'>
                                            <div className="check_in">
                                                <label><i className="far fa-calendar-check"/>{content.checkIn}</label>
                                                {allowOrder ? 
                                                    <input
                                                        readOnly
                                                        className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                                        {...startDateInputProps}
                                                        placeholder={content.addDate}
                                                        name="checkin" 
                                                    />
                                                :
                                                    <input
                                                        style={{cursor: "not-allowed"}}
                                                        readOnly
                                                        disabled
                                                        className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                                        {...startDateInputProps}
                                                        placeholder={content.addDate}
                                                        name="checkin" 
                                                    />
                                                }
                                                
                                            </div>
                                            <span className="date-range_arrow"></span>
                                            <div className="check_out">
                                                <label><i className="far fa-calendar-check"/>{content.checkOut}</label>
                                                {startDate ? 
                                                    <input
                                                        readOnly
                                                        className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                                        {...endDateInputProps}
                                                        placeholder={content.addDate}
                                                        name="checkout" 
                                                    />
                                                :
                                                    <input
                                                        style={{cursor: "not-allowed"}}
                                                        disabled
                                                        className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                                        {...endDateInputProps}
                                                        placeholder={content.addDate}
                                                        name="checkout" 
                                                    />
                                                }
                                            </div>
                                        </div>
                                        )}
                                    </DateRangePicker>
                                </div>
                            </div>

                            <div className="roomBooking_box_layout_body_row">
                                <div className="roomBooking_box_layout_body_b">
                                    <p>{content.quantityRoom}<i style={{fontWeight: "500"}}>{quantity}</i></p> 
                                </div>
                            </div>

                            <div className="roomBooking_box_layout_body_row">
                                <div className="roomBooking_box_layout_body_b">
                                    <p>{content.selectRoomType}</p>

                                    {roomType.map((type, index) => {
                                        let t = content.smallRoom;
                                        if(type == "Small"){
                                            t = content.smallRoom;
                                        }
                                        else if(type == "Medium"){
                                            t = content.mediumRoom
                                        }
                                        else if(type == "Large"){
                                            t = content.largeRoom
                                        }
                                        if(allowOrder){
                                        return  <label key={index + type} className="room_type">
                                                    <input 
                                                        type="radio" 
                                                        id={type} 
                                                        name="roomType" 
                                                        value={type}
                                                        checked={room === type}
                                                        onChange={onRoomChanged}
                                                    />
                                                    <span className="check_mark"></span>
                                                    {t}
                                                </label>
                                        }
                                        else{
                                            return <label key={index + type} className="room_type">
                                                        <input 
                                                            type="radio" 
                                                            id={type}
                                                            disabled
                                                            name="roomType" 
                                                            value={type}
                                                            checked=""
                                                        />
                                                        <span className="check_mark"></span>
                                                        {t}
                                                    </label>
                                        }
                                    })}
                                </div>
                            </div>

                            <div className="roomBooking_box_layout_body_row">
                                <button className={allowOrder ?'form_booking_btn' : 'form_booking_btn disable'} type='submit' onClick={allowOrder ? handleOrderRoom : notAllowOrderRoom}>{allowOrder ? content.orderRoom : content.outOfRoom}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RoomBooking
