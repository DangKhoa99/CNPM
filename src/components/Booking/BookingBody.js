import React, {useState} from 'react'
import "../../style/BookingBody.css"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

function BookingBody() {
    // DATE RANGE PICKER
    const [startDate, setStartDate] = useState(new Date(2021, 3, 24)) // 24-04-2021
    const [endDate, setEndDate] = useState(new Date(2021, 3, 25)) // 25-04-2021

    const modifiers = {
      // disabled: date => getDay(date) === 6, // Disables T7
      highlight: date => getDay(date) === 0 // Highlights CN
    }
    
    const modifiersClassNames = {
      highlight: '-highlight'
    }

    function calDate(startDate, endDate){
        return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    }


    const [clickEditTypeRoom, setClickEditTypeRoom] = useState(false);
    const [clickEditDate, setClickEditDate] = useState(false);

    const handleClickEditTypeRoom = () => setClickEditTypeRoom(!clickEditTypeRoom);
    const handleClickEditDate = () => setClickEditDate(!clickEditDate);
    
    let editTypeRoom = "Chỉnh sửa";
    let editDate = "Chỉnh sửa";
    if(clickEditTypeRoom === true){
        editTypeRoom = "Hủy";
    }

    if(clickEditDate === true){
        editDate = "Hủy";
    }


    return (
        <div className="bookingBody">
            <div className="bookingBody_container">

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_hotel_name">
                                <h2>Khách sạn King Fisher</h2>
                        </div>

                        <div className="bookingBody_hotel">
                            <div className="bookingBody_hotel_img">
                                <div className="bookingBody_img">
                                    <img src="https://a0.muscache.com/im/pictures/miso/Hosting-39655954/original/12817cae-5fd8-4820-8711-291f6b297c3c.jpeg?aki_policy=large"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <h2>Chuyến đi của bạn</h2>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3>Ngày</h3>
                            <div className="bookingBody_component_day_block_subText">
                            {format(startDate, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDate, 'dd MMM yyyy', { locale: vi })}
                            </div>
                            <button className="bookingBody_component_btn_edit" onClick={handleClickEditDate}>
                                {editDate}
                            </button>
                        </div>

                        <div className={clickEditDate ? "bookingBody_component_edit_date active" : "bookingBody_component_edit_date"}>
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

                            <button className="booking_btn_confirm_edit" onClick={handleClickEditDate} type="submit">
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3>Loại phòng</h3>
                            <div className="bookingBody_component_day_block_subText">
                                Lớn
                            </div>
                            <button className="bookingBody_component_btn_edit" onClick={handleClickEditTypeRoom}>
                                {editTypeRoom}
                            </button>
                        </div>
                        
                        {/* Edit type Room */}
                        <div className={clickEditTypeRoom ? "bookingBody_component_edit_typeRoom active" : "bookingBody_component_edit_typeRoom"}>
                            <p>Chọn loại phòng:</p>
                            
                            <form>
                                <label class="bookingBody_component_edit_room_type">
                                    <input type="radio" id="small" name="bookingBody_component_edit_room_type" value="small"/>
                                    <span class="check_mark_typeRoom"></span>
                                    Nhỏ
                                </label>
                                
                                <label class="bookingBody_component_edit_room_type">
                                    <input type="radio" id="medium" name="bookingBody_component_edit_room_type" value="medium"/>
                                    <span class="check_mark_typeRoom"></span>
                                    Vừa
                                </label>
                                
                                <label class="bookingBody_component_edit_room_type">
                                    <input type="radio" id="big" name="bookingBody_component_edit_room_type" value="big"/>
                                    <span class="check_mark_typeRoom"></span>
                                    Lớn
                                </label>

                                <button className="booking_btn_confirm_edit" onClick={handleClickEditTypeRoom} type="submit">
                                    Lưu
                                </button>
                            </form>
                        </div>     
                    </div>
                </div>

                <div className="bookingBody_components_line"></div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <h2>Chi tiết giá</h2>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h4>Giá tiền</h4>
                            <div className="bookingBody_component_day_block_subText">
                                10$ / đêm
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h4>Số ngày ở</h4>
                            <div className="bookingBody_component_day_block_subText">
                                8 đêm
                            </div>
                        </div>
                    </div>
                </div>     

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3><u>Tổng</u></h3>
                            <div className="bookingBody_component_day_block_subText">
                                80$
                            </div>
                        </div>
                    </div>
                </div>                      

                <div className="bookingBody_components_line"></div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <h2>Thanh toán bằng</h2>
                    </div>

                    <div className="bookingBody_hotel">
                        <div className="bookingBody_hotel_pay">
                            <label class="pay_type">
                                <input type="radio" id="small" name="pay_type" value="small" checked/>
                                <span class="check_mark_pay"></span>
                                Trực tiếp tại khách sạn
                            </label>
                            
                            <label class="pay_type disable_radio">
                                <input type="radio" id="medium" name="pay_type" value="medium" disabled/>
                                <span class="check_mark_pay"></span>
                                Thẻ ngân hàng
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components_line"></div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <div className="bookingBody_component_privacy">
                                Bằng việc chọn nút bên dưới, tôi đồng ý với <i style={{color:"red"}}>Nội quy khách sạn, Tiết lộ thông tin an toàn, Hướng dẫn về giãn cách xã hội và các hướng dẫn khác liên quan đến COVID-19 của RoyalStay</i>. Tôi cũng đồng ý thanh toán tổng số tiền được hiển thị.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <button className="booking_btn_confirm">
                        Xác nhận đặt phòng và phương thức thanh toán
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingBody
