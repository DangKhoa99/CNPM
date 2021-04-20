import React, {useState, useEffect, useCallback} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

import useToken from '../../hooks/useToken'

function HotelInvoiceDetail() {
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

    let type = "Nhỏ";
    const priceSmallRoom = dataHotel.room.price;
    const priceMediumRoom = dataHotel.room.price + 50;
    const priceLargeRoom = dataHotel.room.price + 100;

    let pricePerNight = 0;
    if(dataBookingHotelOfCustomer.roomType == "small"){
        type = "Nhỏ";
        pricePerNight = priceSmallRoom;
    }
    else if(dataBookingHotelOfCustomer.roomType == "medium"){
        type = "Vừa";
        pricePerNight = priceMediumRoom;
    }
    else if(dataBookingHotelOfCustomer.roomType == "large"){
        type = "Lớn";
        pricePerNight = priceLargeRoom;
    }

    const calNight = parseInt(dataBookingHotelOfCustomer.checkOut.split("/")[1]) - parseInt(dataBookingHotelOfCustomer.checkIn.split("/")[1]);

    document.title = "Chi tiết khách sạn đặt | RoyalStay"

    const handleDeleteOrderHotel = () =>{
        console.log("CLICK")
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
                                    <svg viewBox="0 0 32 32">
                                        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"/> 
                                    </svg>
                                </button>
                            </div>

                            <div className="bookingHeader_text">
                                Chi tiết hóa đơn khách sạn đã đặt
                            </div>
                            <a className="menuBookingCard_btn_hotel" href={"/room-detail?id=" + dataBookingHotelOfCustomer.hotelId} title="Xem khách sạn">
                                <i class="fas fa-hotel" style={{fontSize: "20px"}}/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bookingBody">
                    <div className="bookingBody_container">

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
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
                                <h2>Chuyến đi của bạn</h2>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>Ngày</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {dataBookingHotelOfCustomer.checkIn} - {dataBookingHotelOfCustomer.checkOut}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>Loại phòng</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {type}
                                    </div>
                                </div>    
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>Giá tiền</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        ${pricePerNight}/đêm
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>Số ngày ở</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {calNight} đêm
                                    </div>
                                </div>
                            </div>
                        </div>     

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3><u>Tổng</u></h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        ${pricePerNight * calNight}
                                    </div>
                                </div>
                            </div>
                        </div>        

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>Hình thức thanh toán</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                    Trực tiếp tại khách sạn
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>Trạng thái</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        <p className={"hotel_booking_status " + dataBookingHotelOfCustomer.status}>{dataBookingHotelOfCustomer.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <div className="bookingBody_components_line"></div>

                        <div className="bookingBody_components">
                            <button className={"booking_btn_confirm " + dataBookingHotelOfCustomer.status} style={{marginRight: "20px"}} onClick={() => {handleConfirmationBox()}}>
                                Hủy đặt phòng
                            </button>

                            {/* ConfirmBOX DELETE */}
                            <div className="confirmBox_container">
                                <div className="confirmation-text">
                                    Bạn có chắc muốn hủy đặt phòng khách sạn ở <br></br><b>`{dataHotel.name}`</b>
                                </div>

                                <div className="button-container">
                                    <button 
                                        className="cancel-button" 
                                        onClick={() => handleConfirmationBox()}>
                                            <i class="far fa-window-close"/>
                                    </button>

                                    <button 
                                    className="confirmation-button"
                                    onClick={handleDeleteOrderHotel}>
                                        <i class="far fa-trash-alt"/>
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
