import React, {useState, useEffect, useRef,  useCallback} from 'react'
import "../../style/RoomReview.css"
import StarIcon from "@material-ui/icons/Star"
import {Avatar} from "@material-ui/core"
import StarRatings from "react-star-ratings"
import axios from 'axios'
import { store } from 'react-notifications-component'
import useGetDataCustomer from '../../hooks/useDataCustomer'

import useToken from '../../hooks/useToken'

function RoomReview({
    reference,
    idHotel
}) {
    const { token, setToken } = useToken();
    const {dataCustomer, isLoading} = useGetDataCustomer();
    const [dataReview, setDataReview] = useState([]);
    const [rating, setRating] = useState(0);

    const _id = {"hotelId": idHotel};

    const loadReviewHotelFromServer = useCallback(async () => {
        await axios.post("http://localhost:5000/hotel/review", _id)
            .then(response => {
                // console.log("Review: ", response.data);
                setDataReview(response.data);
            })
            .catch(error => console.log("Error: ", error))
    },[idHotel]);

    useEffect(() => {
        loadReviewHotelFromServer();
    },[loadReviewHotelFromServer])

    let avgReview = 0;

    if(dataReview.length > 0){
        for(var key in dataReview){
            var obj = dataReview[key];
            avgReview = avgReview + obj.score;

            console.log("DATA REVIEW: ", dataReview[key])
        }
        avgReview = (avgReview / dataReview.length).toFixed(1);
    }

    
    
    function changeRating(newRating){
        setRating(newRating);
    }

    function textStar(rating){
        if(rating == 0){
            return "Đánh giá...";
        }
        else if(rating == 1){
            return "Cực kỳ không thích";
        }
        else if(rating == 2){
            return "Không thích";
        }
        else if(rating == 3){
            return "Tạm được";
        }
        else if(rating == 4){
            return "Thích";
        }
        else if(rating == 5){
            return "Rất thích";
        }
    }

    const [commentTxt, setCommentTxt] = useState("");

    const handleChangeCommentTxt = (e) => {
        let value = e.target.value;
        setCommentTxt(value);
    }

    const removeReviewInput = () => {
        setRating(0);
        setCommentTxt("");
    }

    // Chưa sử dụng khách sạn bao giờ
    const notification_notYetUsed = {
        title: ' RoyalStay - Thông báo',
        message: "Bạn chỉ có thể đánh giá khách sạn khi đã từng sử dụng dịch vụ",
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const submitComment = (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "customerId": token.customerId,
                "hotelId": idHotel,
                "score": rating,
                "content": commentTxt,
            },
            url: "http://localhost:5000/hotel/review/add"
        }
        axios(options)
        .then(response => {
            console.log("Data cmt: ", response.data)
            if(response.data == "Chỉ có thể đánh giá khách sạn đã ở"){
                store.addNotification(notification_notYetUsed);
                removeReviewInput();
            }
            
        })
        .catch(error => console.log("Error11: ", error))

        window.location.reload();
    }

    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');

    return (
        <div className="roomReview">
            <div className="roomBody_line" ref={reference}></div>
            <div className="roomReview_container">
                <div className="roomReview_star">
                    <h2>
                        <span className="roomHeader_heading_stars">
                            <StarIcon className="roomHeader_heading_star"/>
                            <strong>{avgReview} ({dataReview.length} đánh giá)</strong>
                        </span>
                    </h2>
                </div>

                {!token ? 
                <p style={{marginBottom: "50px", textAlign: "center"}}>Bạn cần <a href="/sign-in">đăng nhập</a> và sử dụng dịch vụ của khách sạn để có thể đánh giá khách sạn</p>
                : 
                <div className="roomReview_review_input"> 
                    <div className="commentator">
                        <div className="commentator_avatar">
                            <Avatar 
                                className="commentator_img" 
                                alt={userName} 
                                src={userName}
                            />
                        </div>

                        <div className="commentator_info">
                            {(dataCustomer.username)}
                            {/* - <i style={{fontWeight: '400', fontSize: '14px'}}>tháng {(new Date().getMonth() + 1)} năm {(new Date().getFullYear())}</i> */}

                            <div className="comment_stars">
                                <StarRatings
                                    rating={rating}
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                    starRatedColor="#f1c40f"
                                    starHoverColor="#f1c40f"
                                    starEmptyColor="gray"
                                    starDimension="20px"
                                    svgIconPath="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    svgIconViewBox="0 0 576 512"
                                /> 

                                <p className="comment_stars_text">{textStar(rating)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="comment_input">
                        <form onSubmit={submitComment}>
                            <textarea 
                                name="my_comment" 
                                rows="1" 
                                placeholder="Nhập nhận xét của bạn" 
                                className="message"
                                value={commentTxt}
                                onChange={handleChangeCommentTxt}
                            />

                            <div className="comment_input_btn">
                                <button className="comment_btn_cancel" onClick={removeReviewInput}>Hủy</button>

                                <button className="comment_btn_submit" type="submit">Gửi</button>
                            </div>
                        </form>                        
                    </div>
                </div>
                }

            
                <div className="aaa">
                    {/* comment_section - phần bình luận */}
                    <div className="bbb"> 
                        {dataReview.map(reviews => {
                            return <div className="box_comment">
                                        <div className="commentator">
                                            <div className="commentator_avatar">
                                                <Avatar 
                                                    className="commentator_img" 
                                                    alt={reviews.customerID} 
                                                    src={reviews.customerID}
                                                />
                                            </div>

                                            <div className="commentator_info">
                                                {reviews.customerID}
                                                <div className="comment_time">
                                                    {/* <div>time - tháng 2 năm 2021</div> */}

                                                    <div className="comment_stars" 
                                                    // style={{marginLeft: "10px"}}
                                                    >
                                                        <StarRatings
                                                            rating={reviews.score}
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starRatedColor="#f1c40f"
                                                            starEmptyColor="gray"
                                                            starDimension="14px"
                                                            svgIconPath="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                            svgIconViewBox="0 0 576 512"
                                                        /> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <span>
                                                <div className="comment_text">
                                                    <span>{reviews.content}</span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomReview
