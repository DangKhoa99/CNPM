import React, {useState, useEffect} from 'react'
import "../../style/BookingBody.css"
import { getDay, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { store } from 'react-notifications-component'
import axios from 'axios'
import useToken from '../../hooks/useToken'
import * as myConstClass from "../../constants/constantsLanguage"
import {calDate} from "../../helpers/calDate"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import LoadingScreen from "../LoadingScreen"

function BookingBody({
    idHotel,
    nameHotel,
    imageHotel,
    priceHotelPerNight,
    checkIn,
    checkOut,
    typeRoomOrder,
    arrayRoomTypeOfHotel,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
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

    const [isLoading, setIsLoading] = useState(false);
    
    // TYPE ROOM
    const [typeRoom, setTypeRoom] = useState(typeRoomOrder);

    const priceSmallRoom = priceHotelPerNight;
    const priceMediumRoom = priceHotelPerNight + 50;
    const priceLargeRoom = priceHotelPerNight + 100;

    useEffect(() => {
        if(typeRoom == "Small"){
            setTypeRoom(content.smallRoom);
            setPricePerNight(priceSmallRoom);
        }
        else if (typeRoom == "Medium"){
            setTypeRoom(content.mediumRoom);
            setPricePerNight(priceMediumRoom);
        }
        else if (typeRoom == "Large"){
            setTypeRoom(content.largeRoom);
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

    // Edit RoomType, CheckIn, CheckOut
    const [clickEditTypeRoom, setClickEditTypeRoom] = useState(false);
    const [clickEditDate, setClickEditDate] = useState(false);

    // Click open, close edit roomType
    const handleClickEditTypeRoom = () => {
        setClickEditTypeRoom(!clickEditTypeRoom);
        if(typeRoom == content.smallRoom){
            setRoom("Small");
        }
        else if(typeRoom == content.mediumRoom){
            setRoom("Medium");
        }
        else if(typeRoom == content.largeRoom){
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
        title: ' RoyalStay - ' + content.notification,
        message: content.fillInfoToOrderRoom,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    // Check EndDate
    const notification_checkEndDate = {
        title: ' RoyalStay - ' + content.notification,
        message: content.minNumberOfNight,
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
    let editTypeRoom = content.edit;
    let editDate = content.edit;

    if(clickEditTypeRoom === true){
        editTypeRoom = content.cancel;
    }

    if(clickEditDate === true){
        editDate = content.cancel;
    }

    // console.log("STARTDATE: ", typeof(startDate))
    // console.log("ENDDATE: ", format(endDate, "MM/dd/yyyy"))

    const confirmOrderHotel = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let type = "small";
        if(typeRoom == content.smallRoom){
            type = "small";
        }
        else if(typeRoom == content.mediumRoom){
            type = "medium";
        }
        else if(typeRoom == content.largeRoom){
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
            // console.log("ĐẶT PHÒNG: ", response.data);
            setTimeout(() => {
                setIsLoading(false);
                window.location = "/account/history-booking/";
            }, 5000);
            
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
                                    <Carousel 
                                        showThumbs={false}
                                        autoPlay={false}
                                        showStatus={false}
                                        showIndicators={false}
                                    >
                                        <div>
                                            <img src={imageHotel[0]}/>
                                        </div>
                                        <div>
                                            <img src={imageHotel[1]}/>
                                        </div>
                                        <div>
                                            <img src={imageHotel[2]}/>
                                        </div>
                                        <div>
                                            <img src={imageHotel[3]}/>
                                        </div>
                                        <div>
                                            <img src={imageHotel[4]}/>
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <h2>{content.yourTrip}</h2>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3>{content.dates}</h3>
                            <div className="bookingBody_component_day_block_subText">
                            {format(startDate, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDate, 'dd MMM yyyy', { locale: vi })}
                            </div>
                            <button className="bookingBody_component_btn_edit" onClick={handleClickEditDate}>
                                {editDate}
                            </button>
                        </div>

                        <div className={clickEditDate ? "bookingBody_component_edit_date active" : "bookingBody_component_edit_date"}>
                            <h2>{startDateEdit && endDateEdit ? content.numberOfNights + calDate(startDateEdit, endDateEdit) : startDateEdit ? content.selectCheckoutDate : content.selectCheckInDate}</h2>
                            <p>{startDateEdit && endDateEdit ? format(startDateEdit, 'dd MMM yyyy', { locale: vi }) + ' - ' + format(endDateEdit, 'dd MMM yyyy', { locale: vi }) : content.exactPricing}</p>
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
                                        <label><i className="far fa-calendar-check"/>{content.checkIn}</label>
                                        <input
                                            readOnly
                                            className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                            {...startDateInputProps}
                                            placeholder={content.addDate}
                                        />
                                    </div>

                                    <span className="date-range_arrow"></span>

                                    <div className="check_out">
                                        <label><i className="far fa-calendar-check"/>{content.checkOut}</label>
                                        <input
                                            readOnly
                                            className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                            {...endDateInputProps}
                                            placeholder={content.addDate}
                                        />
                                    </div>
                                </div>
                                )}
                            </DateRangePicker>

                            <button className="booking_btn_confirm_edit" onClick={handleSaveEditDate} type="submit">
                                {content.save}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3>{content.typeRoom}</h3>
                            <div className="bookingBody_component_day_block_subText">
                                {typeRoom}
                            </div>
                            <button className="bookingBody_component_btn_edit" onClick={handleClickEditTypeRoom}>
                                {editTypeRoom}
                            </button>
                        </div>
                        
                        {/* Edit type Room */}
                        <div className={clickEditTypeRoom ? "bookingBody_component_edit_typeRoom active" : "bookingBody_component_edit_typeRoom"}>
                            <p>{content.selectRoomType}</p>

                            {arrayRoomTypeOfHotel.map((type, index) => {
                                let t = content.smallRoom;
                                if(type == "Small"){
                                    t = content.smallRoom;
                                }
                                else if(type == "Medium"){
                                    t = content.mediumRoom;
                                }
                                else if(type == "Large"){
                                    t = content.largeRoom;
                                }
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
                            })}

                            <button className="booking_btn_confirm_edit" onClick={handleSaveEditTypeRoom}>
                                {content.save}
                            </button>
                        </div>     
                    </div>
                </div>

                <div className="bookingBody_components_line"></div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <h2>{content.priceDetails}</h2>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h4>{content.price}</h4>
                            <div className="bookingBody_component_day_block_subText">
                                ${pricePerNight}/{content.night}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h4>{content.numberOfDaysToStay}</h4>
                            <div className="bookingBody_component_day_block_subText">
                                {calDate(startDate, endDate)} {content.night}
                            </div>
                        </div>
                    </div>
                </div>     

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <h3><u>{content.total}</u></h3>
                            <div className="bookingBody_component_day_block_subText">
                                ${pricePerNight * calDate(startDate, endDate)}
                            </div>
                        </div>
                    </div>
                </div>                      

                <div className="bookingBody_components_line"></div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <h2>{content.payWith}</h2>
                    </div>

                    <div className="bookingBody_hotel">
                        <div className="bookingBody_hotel_pay">
                            <label className="pay_type">
                                <input type="radio" id="small" name="pay_type" value="small" checked/>
                                <span className="check_mark_pay"></span>
                                {content.atTheHotel}
                            </label>
                            
                            <label className="pay_type disable_radio">
                                <input type="radio" id="medium" name="pay_type" value="medium" disabled/>
                                <span className="check_mark_pay"></span>
                                {content.bankCard}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bookingBody_components_line"></div>

                <div className="bookingBody_components">
                    <div className="bookingBody_component">
                        <div className="bookingBody_component_block">
                            <div className="bookingBody_component_privacy">
                                {content.textPrivacy1}<i style={{color:"red"}}>{content.textPrivacy2}</i>{content.textPrivacy3}
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? 
                    <div style={{position: "absolute", top: "60%", width: "50%", backgroundColor: "rgba(52, 52, 52, 0.3)", borderRadius: "20px",
                    marginLeft: "240px"}}>
                        <div style={{display: "flex", flexDirection: "column", marginTop: "-300px", marginBottom: "50px"}}>
                            <LoadingScreen /> 
                            <h1 style={{color: "#000", textAlign: "center", marginTop: "-300px"}}>{content.confirmOrderRoomLoading}</h1>
                        </div>
                    </div>
                : ""}

                <div className="bookingBody_components">
                    <button className="booking_btn_confirm" onClick={confirmOrderHotel}>
                        {content.confirmOrderRoom}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingBody
