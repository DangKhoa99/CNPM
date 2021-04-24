import React, {useState, useEffect} from 'react'
import "../../style/BookingBody.css"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { store } from 'react-notifications-component'
import axios from 'axios'
import useToken from '../../hooks/useToken'

function BookingBody({
    idHotel,
    nameHotel,
    imageHotel,
    priceHotelPerNight,
    checkIn,
    checkOut,
    typeRoomOrder,
    arrayRoomTypeOfHotel,
}) {
    const { token, setToken } = useToken();
    const startDateOrder = checkIn.split("/");
    const endDateOrder = checkOut.split("/");

    // DATE ORDER - CHECKIN, CHECKOUT
    const [startDate, setStartDate] = useState(new Date(startDateOrder[2], startDateOrder[1] - 1, startDateOrder[0]));
    const [endDate, setEndDate] = useState(new Date(endDateOrder[2], endDateOrder[1] - 1, endDateOrder[0]));

    // DATE RANGE PICKER
    const [startDateEdit, setStartDateEdit] = useState(startDate)
    const [endDateEdit, setEndDateEdit] = useState(endDate)

    const onStartDateChange = (e) => {
        setStartDateEdit(e)
    }

    const onEndDateChange = (e) => {
        setEndDateEdit(e)
    }

    // PRICE Per Night
    const [pricePerNight, setPricePerNight] = useState();

    // Show Room Type when EDIT in a hotel
    const [room, setRoom] = useState(typeRoomOrder);

    const onRoomChanged = (e) => {
        setRoom(e.currentTarget.value);
    }
    
    // TYPE ROOM
    const [typeRoom, setTypeRoom] = useState(typeRoomOrder);

    const priceSmallRoom = priceHotelPerNight;
    const priceMediumRoom = priceHotelPerNight + 50;
    const priceLargeRoom = priceHotelPerNight + 100;

    useEffect(() => {
        if(typeRoom == "Small"){
            setTypeRoom("Nhỏ");
            setPricePerNight(priceSmallRoom);
        }
        else if (typeRoom == "Medium"){
            setTypeRoom("Vừa");
            setPricePerNight(priceMediumRoom);
        }
        else if (typeRoom == "Large"){
            setTypeRoom("Lớn");
            setPricePerNight(priceLargeRoom);
        }
    },[typeRoom])

    // modifier Date Picker
    const modifiers = {
      // disabled: date => getDay(date) === 6, // Disables T7
      highlight: date => getDay(date) === 0 // Highlights CN
    }
    
    const modifiersClassNames = {
      highlight: '-highlight'
    }

    // Cal night
    function calDate(startDate, endDate){
        return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    }

    // Edit RoomType, CheckIn, CheckOut
    const [clickEditTypeRoom, setClickEditTypeRoom] = useState(false);
    const [clickEditDate, setClickEditDate] = useState(false);

    // Click open, close edit roomType
    const handleClickEditTypeRoom = () => {
        setClickEditTypeRoom(!clickEditTypeRoom);
        if(typeRoom == "Nhỏ"){
            setRoom("Small");
        }
        else if(typeRoom == "Vừa"){
            setRoom("Medium");
        }
        else if(typeRoom == "Lớn"){
            setRoom("Large");
        }
    }

    // Save Edit RoomType
    const handleSaveEditTypeRoom = () => {
        setTypeRoom(room);
        setClickEditTypeRoom(!clickEditTypeRoom);
    }

    // Chưa điền đầy đủ
    const notification_notFilled = {
        title: ' RoyalStay - Thông báo',
        message: "Vui lòng điền đủ thông tin để đặt phòng",
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    // Check EndDate
    const notification_checkEndDate = {
        title: ' RoyalStay - Thông báo',
        message: "Số đêm tối thiểu là 1",
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 3000
        }
    };

    // Click open, close edit checkIn, checkOut
    const handleClickEditDate = () => {
        setClickEditDate(!clickEditDate);
        setStartDateEdit(startDate);
        setEndDateEdit(endDate);
    }

    // Save edit checkIn, checkOut
    const handleSaveEditDate = () => {
        if(!startDateEdit){
            store.addNotification(notification_notFilled);
        }
        else if(!endDateEdit){
            store.addNotification(notification_notFilled);
        }
        else if(calDate(startDateEdit, endDateEdit) == 0){
            store.addNotification(notification_checkEndDate);
        }
        else{
            setStartDate(startDateEdit);
            setEndDate(endDateEdit);
            setClickEditDate(!clickEditDate);
        }
    }
    
    // change string display
    let editTypeRoom = "Chỉnh sửa";
    let editDate = "Chỉnh sửa";

    if(clickEditTypeRoom === true){
        editTypeRoom = "Hủy";
    }

    if(clickEditDate === true){
        editDate = "Hủy";
    }

    // console.log("STARTDATE: ", typeof(startDate))
    // console.log("ENDDATE: ", format(endDate, "MM/dd/yyyy"))

    const confirmOrderHotel = (e) => {
        e.preventDefault();
        let type = "small";
        if(typeRoom == "Nhỏ"){
            type = "small";
        }
        else if(typeRoom == "Vừa"){
            type = "medium";
        }
        else if(typeRoom == "Lớn"){
            type = "large";
        }
        let checkIn = format(startDate, "MM/dd/yyyy")
        let checkOut = format(endDate, "MM/dd/yyyy")

        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "customerId": token.customerId,
                "hotelId": idHotel,
                "checkIn": checkIn,
                "checkOut": checkOut,
                "roomType": type,
            },
            url: "http://localhost:5000/customer/booking/add"
        }

        axios(options)
        .then(response => {
            console.log("ĐẶT PHÒNG: ", response.data);
            window.location = "/account/booking/"
        })
        .catch(error => console.log(error))
    }


    return (
        <div className="bookingBody">
            <div className="bookingBody_container">

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_hotel_name">
                                <h2>{nameHotel}</h2>
                        </div>

                        <div className="bookingBody_hotel">
                            <div className="bookingBody_hotel_img">
                                <div className="bookingBody_img">
                                    <img src={imageHotel}/>
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
                            <h2>{startDateEdit && endDateEdit ? 'Số đêm: ' + calDate(startDateEdit, endDateEdit) : startDateEdit ? 'Chọn ngày trả phòng' : 'Chọn ngày nhận phòng'}</h2>
                            <p>{startDateEdit && endDateEdit ? format(startDateEdit, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDateEdit, 'dd MMM yyyy', { locale: vi }) : 'Thêm ngày đi để biết giá chính xác'}</p>
                            <DateRangePicker
                                startDate={startDateEdit}
                                endDate={endDateEdit}
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
                                        <label>NHẬN PHÒNG</label>
                                        <input
                                            readOnly
                                            className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                            {...startDateInputProps}
                                            placeholder='Chọn ngày'
                                        />
                                    </div>

                                    <span className="date-range_arrow"></span>

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

                            <button className="booking_btn_confirm_edit" onClick={handleSaveEditDate} type="submit">
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
                                {typeRoom}
                            </div>
                            <button className="bookingBody_component_btn_edit" onClick={handleClickEditTypeRoom}>
                                {editTypeRoom}
                            </button>
                        </div>
                        
                        {/* Edit type Room */}
                        <div className={clickEditTypeRoom ? "bookingBody_component_edit_typeRoom active" : "bookingBody_component_edit_typeRoom"}>
                            <p>Chọn loại phòng:</p>

                            {arrayRoomTypeOfHotel.map(type => {
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
                                return  <label className="room_type">
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
                            })}

                            <button className="booking_btn_confirm_edit" onClick={handleSaveEditTypeRoom}>
                                Lưu
                            </button>
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
                                ${pricePerNight}/ đêm
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h4>Số ngày ở</h4>
                            <div className="bookingBody_component_day_block_subText">
                                {calDate(startDate, endDate)} đêm
                            </div>
                        </div>
                    </div>
                </div>     

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3><u>Tổng</u></h3>
                            <div className="bookingBody_component_day_block_subText">
                                ${pricePerNight * calDate(startDate, endDate)}
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
                            <label className="pay_type">
                                <input type="radio" id="small" name="pay_type" value="small" checked/>
                                <span className="check_mark_pay"></span>
                                Trực tiếp tại khách sạn
                            </label>
                            
                            <label className="pay_type disable_radio">
                                <input type="radio" id="medium" name="pay_type" value="medium" disabled/>
                                <span className="check_mark_pay"></span>
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
                    <button className="booking_btn_confirm" onClick={confirmOrderHotel}>
                        Xác nhận đặt phòng và phương thức thanh toán
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingBody
