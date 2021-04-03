import React, {useState} from 'react'
import "../../style/RoomReview.css"
import StarIcon from "@material-ui/icons/Star"
import {Avatar, styled} from "@material-ui/core"
import StarRatings from "react-star-ratings"

function RoomReview({reference}) {
    const [rating, setRating] = useState(0);

    function changeRating(newRating){
        setRating(newRating);
    }

    function removeReviewInput(){
        setRating(0);
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

    const submitComment = (e) => {
        e.preventDefault();
    }

    return (
        <div className="roomReview">
            <div className="roomBody_line" ref={reference}></div>
            <div className="roomReview_container">
                <div className="roomReview_star">
                    <h2>
                        <span className="roomHeader_heading_stars">
                            <StarIcon className="roomHeader_heading_star"/>
                            <strong>4.9 (41 đánh giá)</strong>
                        </span>
                    </h2>
                </div>

                <div className="roomReview_review_input"> 
                    <div className="commentator">
                        <div className="commentator_avatar">
                            <Avatar className="commentator_img" alt="dangkhoa99" src="/images/Khoa.jpg"/>
                        </div>

                        <div className="commentator_info">
                            dangkhoa99

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
                        <form onSubmit = {submitComment}>
                            <textarea 
                                name="my_comment" 
                                rows="1" 
                                placeholder="Nhập nhận xét của bạn" 
                                className="message"
                                // value={}
                                // onChange={}
                            />

                            <div className="comment_input_btn">
                                <button className="comment_btn_cancel" onClick={removeReviewInput}>Hủy</button>

                                <button className="comment_btn_submit" type="submit">Gửi</button>
                            </div>
                        </form>                        
                    </div>
                </div>







                <div className="aaa">
                    {/* comment_section - phần bình luận */}
                    <div className="bbb"> 

                        <div className="box_comment">
                            <div className="commentator">
                                <div className="commentator_avatar">
                                    <Avatar className="commentator_img" alt="dangkhoa99" src="/images/Khoa.jpg"/>
                                </div>

                                <div className="commentator_info">
                                    dangkhoa99 (username)
                                    <div className="comment_time">
                                        <div>tháng 3 năm 2021</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span>
                                    <div className="comment_text">
                                        <span>Tôi sẽ quay lại . Quá tuyệt vời . Thích nhất cái phòng tắm </span>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="box_comment">
                            <div className="commentator">
                                <div className="commentator_avatar">
                                    <Avatar className="commentator_img">D</Avatar>
                                </div>

                                <div className="commentator_info">
                                    thanhdo (username)
                                    <div className="comment_time">
                                        <div>tháng 2 năm 2021</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span>
                                    <div className="comment_text">
                                        <span>Nơi ở khá gần phố cổ, đạp xe 1 tí là tới nơi. Nhân viên thân thiện, không gian mát mẻ và đem lại sự thoáng đãng. Phòng ốc rất sạch sẽ và tiện nghi. Nếu có cơ hội mình sẽ chọn ở đây tiếp </span>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="box_comment">
                            <div className="commentator">
                                <div className="commentator_avatar">
                                    <Avatar className="commentator_img">T</Avatar>
                                </div>

                                <div className="commentator_info">
                                    ductai (username)
                                    <div className="comment_time">
                                        <div>tháng 3 năm 2021</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span>
                                    <div className="comment_text">
                                        <span>Chỗ ở cực sạch sẽ, phòng rộng thoáng, ban công to. Các dịch vụ đều rất tốt, mọi người rất tận tình, dễ thương. Thiết kế nhà mang lại cảm giác ấm cúng, không gian hồ bơi đẹp. Cũng không quá xa so với phố cổ, đi bộ tầm 10-15 phút là đến. Có thể bắt taxi vừa tiện vừa nhanh. Buổi sáng còn được chọn món ăn sáng, buổi tối thì không giới hạn giờ giấc đi về. Highly recommend </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomReview
