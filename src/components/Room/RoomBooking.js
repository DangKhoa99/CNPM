import React, {useState, useEffect} from 'react'
import "../../style/RoomBooking.css"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

import { store } from 'react-notifications-component'

import useToken from '../../hooks/useToken'
import SignIn from '../../pages/SignIn/SignIn'

function RoomBooking({
    priceSmallRoom,
    priceMediumRoom,
    priceLargeRoom,
    roomType,
    quantity,
    price,
    idHotel,
}) {
    const { token, setToken } = useToken();
    
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

    function calDate(startDate, endDate){
        return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    }

    const [room, setRoom] = useState(roomType[0]);

    const onRoomChanged = (e) => {
        setRoom(e.currentTarget.value);
    }

    // Chưa điền đầy đủ
    const notification_notFilled = {
        title: ' RoyalStay - Thông báo',
        message: "Vui lòng điền đủ thông tin để đặt phòng",
        type: 'warning',
        container: 'top-right',
        dismiss: {
            duration: 2000
        }
    };

    // Check EndDate
    const notification_checkEndDate = {
        title: ' RoyalStay - Thông báo',
        message: "Số đêm tối thiểu là 1",
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
        title: ' RoyalStay - Thông báo',
        message: "Khách sạn đã hết phòng - Quý khách vui lòng quay lại sau",
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
                            <span className="roomBooking_night">/đêm</span>
                        </div>

                        <button className="roomBooking_btn_remove" title="Xóa ngày đã chọn" onClick={removeOptional}>
                            Xóa chọn
                        </button>
                    </div>

                    <form className="form_booking" action="/booking">
                        <div className="roomBooking_box_layout_body">
                            <div className="roomBooking_box_layout_body_row">
                                <div className="roomBooking_box_layout_body_row_a">
                                    <input style={{display: "none"}} name="id" value={idHotel}/>
                                    <h2>{startDate && endDate ? 'Số đêm: ' + calDate(startDate, endDate) : startDate ? 'Chọn ngày trả phòng' : 'Chọn ngày nhận phòng'}</h2>

                                    <p>{startDate && endDate ? format(startDate, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDate, 'dd MMM yyyy', { locale: vi }) : 'Thêm ngày đi để biết giá chính xác'}</p>

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
                                                <label><i class="far fa-calendar-check"/> NHẬN PHÒNG</label>
                                                {allowOrder ? 
                                                    <input
                                                        readOnly
                                                        className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                                        {...startDateInputProps}
                                                        placeholder='Chọn ngày'
                                                        name="checkin" 
                                                    />
                                                :
                                                    <input
                                                        style={{cursor: "not-allowed"}}
                                                        readOnly
                                                        disabled
                                                        className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                                        {...startDateInputProps}
                                                        placeholder='Chọn ngày'
                                                        name="checkin" 
                                                    />
                                                }
                                                
                                            </div>
                                            <span class="date-range_arrow"></span>
                                            <div className="check_out">
                                                <label><i class="far fa-calendar-check"/> TRẢ PHÒNG</label>
                                                {startDate ? 
                                                    <input
                                                        readOnly
                                                        className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                                        {...endDateInputProps}
                                                        placeholder='Chọn ngày'
                                                        name="checkout" 
                                                    />
                                                :
                                                    <input
                                                        style={{cursor: "not-allowed"}}
                                                        readOnly
                                                        disabled
                                                        className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                                        {...endDateInputProps}
                                                        placeholder='Chọn ngày'
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
                                    <p>Số lượng phòng trống: <i style={{fontWeight: "500"}}>{quantity}</i></p> 
                                </div>
                            </div>

                            <div className="roomBooking_box_layout_body_row">
                                <div className="roomBooking_box_layout_body_b">
                                    <p>Chọn loại phòng:</p>

                                    {roomType.map(type => {
                                        let t = "Nhỏ";
                                        if(type == "Small"){
                                            t = "Nhỏ";
                                        }
                                        else if(type == "Medium"){
                                            t = "Vừa"
                                        }
                                        else if(type == "Large"){
                                            t = "Lớn"
                                        }
                                        if(allowOrder){
                                        return  <label class="room_type">
                                                    <input 
                                                        type="radio" 
                                                        id={type} 
                                                        name="roomType" 
                                                        value={type}
                                                        checked={room === type}
                                                        onChange={onRoomChanged}
                                                    />
                                                    <span class="check_mark"></span>
                                                    {t}
                                                </label>
                                        }
                                        else{
                                            return <label class="room_type">
                                                        <input 
                                                            type="radio" 
                                                            id={type}
                                                            disabled
                                                            name="roomType" 
                                                            value={type}
                                                            checked=""
                                                        />
                                                        <span class="check_mark"></span>
                                                        {t}
                                                    </label>
                                        }
                                    })}
                                </div>
                            </div>

                            <div className="roomBooking_box_layout_body_row">
                                <button className={allowOrder ?'form_booking_btn' : 'form_booking_btn disable'} type='submit' onClick={allowOrder ? handleOrderRoom : notAllowOrderRoom}>{allowOrder ? "Đặt phòng" : "Hết phòng"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RoomBooking
