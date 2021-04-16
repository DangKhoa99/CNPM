import React, {useState} from 'react'
import "../../style/RoomBooking.css"
import StarIcon from "@material-ui/icons/Star"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

import useToken from '../../useToken'
import SignIn from '../../pages/SignIn/SignIn'

function RoomBooking({
    priceSmallRoom,
    priceMediumRoom,
    priceLargeRoom,
    roomType,
    quantity,
    price,
}) {
    const { token, setToken } = useToken();
    // DATE RANGE PICKER
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

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

    const handleOrderRoom = (e) => {
        e.preventDefault();
    }

    // console.log(typeof(roomType[0]))

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
                        {/* <div className="roomBooking_box_layout_header_left"> */}
                        <div className="roomBooking_box_layout_header_defaultPrice">
                            <span className="roomBooking_defaultPrice">${pricePerNight}</span>
                            <span className="roomBooking_night">/đêm</span>
                        </div>
                        {/* </div> */}

                        
                            {/* <span className="roomBooking_stars">
                                <StarIcon className="roomFirst_star"/>
                                <strong>4.9 (41)</strong>
                            </span> */}
                        <button className="roomBooking_btn_remove" title="Xóa ngày đã chọn" onClick={removeOptional}>Xóa chọn</button>
                        
                    </div>

                    <form className="form_booking" action="/booking"> {/* method="POST"> */}
                        {/* Check in , check out, room type, check log in, ... */}
                        <div className="roomBooking_box_layout_body">
                            <div className="roomBooking_box_layout_body_row">
                                <div className="roomBooking_box_layout_body_row_a">
                                    <h2>{startDate, endDate ? 'Số đêm: ' + calDate(startDate, endDate) : startDate ? 'Chọn ngày trả phòng' : 'Chọn ngày nhận phòng'}</h2>
                                    <p>{startDate, endDate ? format(startDate, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDate, 'dd MMM yyyy', { locale: vi }) : 'Thêm ngày đi để biết giá chính xác'}</p>
                                    <DateRangePicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        onStartDateChange={setStartDate}
                                        onEndDateChange={setEndDate}
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
                                                <label>NHẬN PHÒNG</label>
                                                <input
                                                    readOnly
                                                    className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                                    {...startDateInputProps}
                                                    placeholder='Chọn ngày'
                                                />
                                            </div>
                                            <span class="date-range_arrow"></span>
                                            <div className="check_out">
                                                <label>TRẢ PHÒNG</label>
                                                <input
                                                    readOnly
                                                    className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                                    {...endDateInputProps}
                                                    placeholder='Chọn ngày'
                                                />
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
                                        return <label class="room_type">
                                                    <input 
                                                        type="radio" 
                                                        id={type} 
                                                        name="room_type" 
                                                        value={type}
                                                        checked={room === type}
                                                        onChange={onRoomChanged}
                                                    />
                                                    <span class="check_mark"></span>
                                                    {t}
                                                </label>
                                    })}
                                </div>
                            </div>

                            

                            <div className="roomBooking_box_layout_body_row">
                                <button className='form_booking_btn' type='submit' onClick={handleOrderRoom}>Đặt phòng</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RoomBooking
