import React from 'react'
import "../../style/RoomReview.css"
import StarIcon from "@material-ui/icons/Star"
import {Avatar} from "@material-ui/core"

function RoomReview() {
    return (
        <div className="roomReview">
            <div className="roomBody_line"></div>
            <div className="roomReview_container">
                <div className="roomReview_star">
                    <h2>
                        <span className="roomHeader_heading_stars">
                            <StarIcon className="roomHeader_heading_star"/>
                            <strong>4.9 (41 đánh giá)</strong>
                        </span>
                    </h2>
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

                <div className="add_comment">
                    <button className="btn_add_cmt">Thêm nhận xét</button>
                </div>


            </div>
        </div>
    )
}

export default RoomReview
