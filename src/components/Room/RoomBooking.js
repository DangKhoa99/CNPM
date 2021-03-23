import React, {useState} from 'react'
import "../../style/RoomBooking.css"
import StarIcon from "@material-ui/icons/Star"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'


function RoomBooking() {
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

    function removeDays(){
        setStartDate(null);
        setEndDate(null);
    }

    function calDate(startDate, endDate){
        return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    }

    return (
        <div className="roomBooking">
            <div className="roomBooking_box">
                <div className="roomBooking_box_layout">
                    <div className="roomBooking_box_layout_header">
                        {/* <div className="roomBooking_box_layout_header_left"> */}
                        <div className="roomBooking_box_layout_header_defaultPrice">
                            <span className="roomBooking_defaultPrice">$10</span>
                            <span className="roomBooking_night">/đêm</span>
                        </div>
                        {/* </div> */}

                        
                            {/* <span className="roomBooking_stars">
                                <StarIcon className="roomFirst_star"/>
                                <strong>4.9 (41)</strong>
                            </span> */}
                        <button className="roomBooking_btn_remove" title="Xóa ngày đã chọn" onClick={removeDays}>Xóa ngày</button>
                        
                    </div>

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
                                <p>Chọn loại phòng:</p>
                                
                                <label class="room_type">
                                    <input type="radio" id="small" name="room_type" value="small"/>
                                    <span class="check_mark"></span>
                                    Nhỏ
                                </label>
                                
                                <label class="room_type">
                                    <input type="radio" id="medium" name="room_type" value="medium"/>
                                    <span class="check_mark"></span>
                                    Vừa
                                </label>
                                
                                <label class="room_type">
                                    <input type="radio" id="big" name="room_type" value="big"/>
                                    <span class="check_mark"></span>
                                    Lớn
                                </label>
                            </div>
                        </div>

                        

                        <div className="roomBooking_box_layout_body_row">
                            <form className="form_booking" action="/"> {/* method="POST"> */}
                                {/* Check in , check out, room type, check log in, ... */}
                                <button className='form_booking_btn' type='submit'>Đặt phòng</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomBooking
