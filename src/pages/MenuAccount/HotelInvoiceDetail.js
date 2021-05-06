import React, {useState, useEffect, useCallback} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"
import useToken from '../../hooks/useToken'
import {calDate} from "../../helpers/calDate"

function HotelInvoiceDetail() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const { token, setToken } = useToken();
    const searchParams = new URLSearchParams(window.location.search);
    const bookingId = searchParams.get('id');

    const [dataBookingHotelOfCustomer, setDataBookingHotelOfCustomer] = useState([]);
    const [dataHotel, setDataHotel] = useState(null);
    let history = useHistory();
    const [delTask, setDelTask] = useState(false)

    const handleConfirmationBox = () => {
        if (!delTask){
            document.querySelector(".confirm-bg").style.display = "flex"
            document.querySelector(".confirmBox_container").style.display = "flex"
            setDelTask(true)
        } 
        else {
            document.querySelector(".confirm-bg").style.display = "none"
            document.querySelector(".confirmBox_container").style.display = "none"
            setDelTask(false)
        }
    }

    const loadDetailHotelFromServer = useCallback(async () =>{
        const options = {
            method: "POST",
            data: {
                "hotelId": dataBookingHotelOfCustomer.hotelId
            },
            url: "http://localhost:5000/hotel/"
        }
        await axios(options)
            .then(response => {
                setDataHotel(response.data);
            })
    },[dataBookingHotelOfCustomer.hotelId]); // every time id changed, new data will be loaded

    useEffect(() => {
        const getDataBookingHotelOfCustomer = async () => {
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": token.customerId,
                    "bookingId": bookingId
                },
                url: "http://localhost:5000/customer/booking/view_one"
            }
            axios(options)
            .then(response => {
                console.log("BOOKING ID:", response.data)
                setDataBookingHotelOfCustomer(response.data)
            })
            .catch(error => console.log(error))
        }

        if(token){
            getDataBookingHotelOfCustomer();
        }
        loadDetailHotelFromServer();
    },[loadDetailHotelFromServer])
    
    if(!dataHotel) return null

    let type = content.smallRoom;
    const priceSmallRoom = dataHotel.room.price;
    const priceMediumRoom = dataHotel.room.price + 50;
    const priceLargeRoom = dataHotel.room.price + 100;

    let pricePerNight = 0;
    if(dataBookingHotelOfCustomer.roomType == "small"){
        type = content.smallRoom;
        pricePerNight = priceSmallRoom;
    }
    else if(dataBookingHotelOfCustomer.roomType == "medium"){
        type = content.mediumRoom;
        pricePerNight = priceMediumRoom;
    }
    else if(dataBookingHotelOfCustomer.roomType == "large"){
        type = content.largeRoom;
        pricePerNight = priceLargeRoom;
    }

    let checkIn = new Date(dataBookingHotelOfCustomer.checkIn)
    let checkOut = new Date(dataBookingHotelOfCustomer.checkOut)
    const calNight = calDate(checkIn, checkOut);

    document.title = content.detailInvoice + " | RoyalStay"

    const handleDeleteOrderHotel = () =>{
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "customerId": token.customerId,
                "bookingId": bookingId
            },
            url: "http://localhost:5000/customer/booking/cancel"
        }
        axios(options)
        .then(response => {
            console.log("DELETE ORDER HOTEL: ", response.data)
            window.location = "/account/booking"
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="hotelInvoiceDetail">
            <div className="booking_container">
                <div className="bookingHeader">
                    <div className="bookingHeader_container">
                        <div className="bookingHeader_block">
                            <div className="bookingHeader_back">
                                <button className="bookingHeader_icon" onClick={history.goBack}>
                                <i className="fas fa-chevron-left"></i>
                                </button>
                            </div>

                            <div className="bookingHeader_text">
                                {content.detailInvoice}
                            </div>
                            <a 
                                className="menuBookingCard_btn_hotel1" 
                                href={"/room-detail?id=" + dataBookingHotelOfCustomer.hotelId} 
                                title={content.detailRoom}
                            >
                                <i className="fas fa-hotel" style={{fontSize: "20px"}}/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bookingBody">
                    <div className="bookingBody_container">

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <h4 style={{marginBottom: "20px", color: "gray"}}><i className="fas fa-receipt"/> {content.idInvoice}: <i>{bookingId}</i></h4>

                                <div className="bookingBody_hotel_name">
                                        <h2>{dataHotel.name}</h2>
                                </div>

                                <div className="bookingBody_hotel">
                                    <div className="bookingBody_hotel_img">
                                        <div className="bookingBody_img">
                                            <img src={dataHotel.imageLink[0]}/>
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
                                        {dataBookingHotelOfCustomer.checkIn} - {dataBookingHotelOfCustomer.checkOut}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.typeRoom}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {type}
                                    </div>
                                </div>    
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.price}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        ${pricePerNight}/{content.night}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.numberOfDaysToStay}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {calNight} {content.night}
                                    </div>
                                </div>
                            </div>
                        </div>     

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3><u>{content.total}</u></h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        ${pricePerNight * calNight}
                                    </div>
                                </div>
                            </div>
                        </div>        

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.payments}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                    {content.atTheHotel}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.status}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        <p className={"hotel_booking_status " + dataBookingHotelOfCustomer.status}>{dataBookingHotelOfCustomer.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <div className="bookingBody_components_line"></div>



                        {/* <div className="bookingBody_components_line"></div> */}

                        <div className="bookingBody_components">
                            <button className={"booking_btn_confirm " + dataBookingHotelOfCustomer.status} style={{marginRight: "20px"}} onClick={() => {handleConfirmationBox()}}>
                                {content.cancelOrderRoom}
                            </button>

                            {/* ConfirmBOX DELETE */}
                            <div className="confirmBox_container">
                                <div className="confirmation-text">
                                    {content.confirmCancelOrderRoom}<br></br><b>`{dataHotel.name}`</b>?
                                </div>

                                <div className="button-container">
                                    <button 
                                        className="cancel-button" 
                                        onClick={() => handleConfirmationBox()}>
                                            <i className="far fa-window-close"/>
                                    </button>

                                    <button 
                                    className="confirmation-button"
                                    onClick={handleDeleteOrderHotel}>
                                        <i className="far fa-trash-alt"/>
                                    </button>
                                </div>
                            </div>

                            <div 
                                className="confirm-bg" 
                                onClick={() => handleConfirmationBox()}>
                            </div>

                            <button className="booking_btn_confirm invoiceOk" onClick={history.goBack}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default HotelInvoiceDetail
