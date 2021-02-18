import React from 'react'
import "./RoomInfo.css"
import {Avatar} from "@material-ui/core"
import StarIcon from "@material-ui/icons/Star"

function RoomInfo({
    name,
    people,
    bedroom,
    bed,
    bathroom,

}) {
    return (
        <div className="roomInfo">
            <div className="roomInfo__container__left">
                <div className="roomInfo__block">
                    <div className="roomInfo__block__first">
                        <div className="roomInfo__block__first_left">
                            <h1>{name}</h1>
                            <div>
                                <span>{people} khách </span>
                                <span>· </span>
                                <span>{bedroom} phòng ngủ </span>
                                <span>· </span>
                                <span>{bed} giường </span>
                                <span>· </span>
                                <span>{bathroom} phòng tắm</span>
                            </div>
                        </div>

                        <div className="roomInfo__block__first_right">
                            <div className="roomInfo__circle">
                                <Avatar className="avatar">B</Avatar>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="roomInfo__block">
                    <div className="roomInfo_line"></div>
                    <div className="roomInfo__block__second">
                        <div className="roomInfo__block__second__row"> 
                            <div className="roomInfo__block__second__row__left">
                                <svg>
                                    <path d="M17.954 2.781l.175.164 13.072 12.842-1.402 1.426-1.8-1.768L28 29a2 2 0 0 1-1.85 1.994L26 31H6a2 2 0 0 1-1.995-1.85L4 29V15.446l-1.8 1.767-1.4-1.426L13.856 2.958a3 3 0 0 1 4.097-.177zm-2.586 1.503l-.096.088L6 13.48 6 29l5-.001V19a2 2 0 0 1 1.85-1.995L13 17h6a2 2 0 0 1 1.995 1.85L21 19v9.999h5V13.48l-9.3-9.135a1.001 1.001 0 0 0-1.332-.06zM19 19h-6v9.999h6z"/>
                                </svg>
                            </div>
                            <div className="roomInfo__block__second__row__right">
                                <div className="roomInfo__block__second__row__right__title">Toàn bộ nhà</div>
                                <div className="roomInfo__block__second__row__right__subTitle">Bạn sẽ có nơi ở cho riêng mình.</div>
                            </div>
                        </div>

                        <div className="roomInfo__block__second__row">
                            <div className="roomInfo__block__second__row__left">
                                <svg>
                                    <path d="M15.032 1.747c.263-1.004 1.692-.993 1.94.015.876 3.577 2.415 6.454 4.614 8.652 2.198 2.199 5.075 3.738 8.652 4.615 1.016.249 1.016 1.693 0 1.942-3.577.877-6.454 2.416-8.652 4.615-2.199 2.198-3.738 5.075-4.615 8.652-.249 1.016-1.693 1.016-1.942 0-.877-3.577-2.416-6.454-4.615-8.652-2.198-2.199-5.075-3.738-8.652-4.615-1.008-.247-1.019-1.676-.015-1.939 3.535-.923 6.394-2.487 8.597-4.69 2.202-2.202 3.765-5.06 4.688-8.595zm.945 3.518l-.133.325c-.88 2.085-2.025 3.914-3.438 5.484l-.33.357-.318.326c-1.6 1.6-3.5 2.893-5.693 3.88l-.475.206-.325.133.352.14c2.108.859 3.952 1.995 5.527 3.407l.358.33.326.319c1.603 1.602 2.887 3.515 3.854 5.732l.203.48.115.291.115-.292c.86-2.108 1.996-3.952 3.408-5.527l.33-.358.319-.326c1.602-1.603 3.515-2.887 5.732-3.854l.48-.203.292-.115-.293-.115c-2.421-.988-4.494-2.34-6.211-4.057-1.603-1.602-2.887-3.515-3.854-5.732l-.203-.48-.138-.351zm11.04-3.891c.13-.502.845-.497.969.007.176.718.48 1.287.913 1.72.433.433 1.002.737 1.72.913.508.125.508.847 0 .972-.718.176-1.287.48-1.72.913-.433.433-.737 1.002-.913 1.72-.125.508-.847.508-.972 0-.176-.718-.48-1.287-.913-1.72-.433-.433-1.002-.737-1.72-.913-.504-.124-.51-.839-.007-.97.71-.185 1.277-.496 1.712-.93.434-.435.745-1.002.93-1.712z"/>
                                </svg>
                            </div>
                            <div className="roomInfo__block__second__row__right">
                                <div className="roomInfo__block__second__row__right__title">Vệ sinh tăng cường</div>
                                <div className="roomInfo__block__second__row__right__subTitle">Chủ nhà này đã cam kết thực hiện quy trình về sinh tăng cường 5 bước của Airbnb.</div>
                            </div>
                        </div>

                        <div className="roomInfo__block__second__row">
                            <div className="roomInfo__block__second__row__left">
                                <svg>
                                    <path d="M25 1a2 2 0 0 1 1.995 1.85L27 3l-.001 26H29v2H3v-2h1.999L5 3a2 2 0 0 1 1.85-1.995L7 1zm-4 2H7l-.001 26H21zm4 0h-2v26h1.999zm-7 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </div>
                            <div className="roomInfo__block__second__row__right">
                                <div className="roomInfo__block__second__row__right__title">Tự nhận phòng</div>
                                <div className="roomInfo__block__second__row__right__subTitle">Bạn có thể gặp nhân viên trực cửa để nhận phòng.</div>
                            </div>
                        </div>

                        <div className="roomInfo__block__second__row">
                            <div className="roomInfo__block__second__row__left">
                                <svg>
                                    <path d="M12 0v2h8V0h2v2h6a2 2 0 0 1 1.995 1.85L30 4v15.586a2 2 0 0 1-.467 1.284l-.119.13L21 29.414a2 2 0 0 1-1.238.578l-.176.008H7a5 5 0 0 1-4.995-4.783L2 25V4a2 2 0 0 1 1.85-1.995L4 2h6V0zM4 12v13a3 3 0 0 0 2.824 2.995L7 28h11v-5a5 5 0 0 1 4.783-4.995L23 18h5v-6zm23.585 8H23a3 3 0 0 0-2.995 2.824L20 23v4.585zM4 10h24V4h-6v2h-2V4h-8v2h-2V4H4z"/>
                                </svg>
                            </div>
                            <div className="roomInfo__block__second__row__right">
                                <div className="roomInfo__block__second__row__right__title">Chính sách hủy</div>
                                <div className="roomInfo__block__second__row__right__subTitle">Thêm ngày cho chuyến đi của bạn để nhận thông tin về chính sách hủy cho đặt phòng này.</div>
                            </div>
                        </div>

                        <div className="roomInfo__block__second__row">
                            <div className="roomInfo__block__second__row__left">
                                <svg>
                                    <path d="M28.477 1.07a2 2 0 0 1 2.515 1.754L31 3v23.04a2 2 0 0 1-1.34 1.888l-.153.047-13 3.41a2 2 0 0 1-.813.041l-.201-.041-13-3.41a2 2 0 0 1-1.487-1.776L1 26.04V3a2 2 0 0 1 2.35-1.969l.173.039L16 4.448zM29 3L16.523 6.378a2 2 0 0 1-.873.039l-.173-.039L3 3v23.04l13 3.41 13-3.41zm-2 17.984v2l-9 2.5v-2zm0-7v2l-9 2.5v-2zm0-7v2l-9 2.5v-2z"/>
                                </svg>
                            </div>
                            <div className="roomInfo__block__second__row__right">
                                <div className="roomInfo__block__second__row__right__title">Nội quy nhà</div>
                                <div className="roomInfo__block__second__row__right__subTitle">Địa điểm này không phù hợp với trẻ em dưới 12 tuổi và chủ nhà không cho phép mang theo thú cưng, tổ chức tiệc tùng hoặc hút thuốc.</div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="roomInfo__block">
                    <div className="roomInfo_line"></div>
                    <div className="roomInfo__block__third">
                        <h2>Mô tả</h2>
                        <div className="roomInfo__block__third__paragraph">
                            <div className="roomInfo__block__third__description">
                                <span>Đây là BIỆT THỰ RIÊNG TƯ của bạn có diện tích 150m2 bao gồm hồ bơi, sân vườn có tường rào bao quanh tạo không gian riêng tư và lãng mạn tuyệt đối, không thể nhìn thấy từ bên ngoài.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="roomInfo__block">
                <div className="roomInfo_line"></div>
                    <div className="roomInfo__block__fourth">
                        <h2>Tiện nghi</h2>
                        <div className="roomInfo__block__fourth__cells">
                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Wifi</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M16 20a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-7a9 9 0 0 1 8.043 4.958L22.53 21.47a7.003 7.003 0 0 0-13.058 0l-1.514-1.514A9 9 0 0 1 16 15zm0-5c4.89 0 9.193 2.506 11.697 6.304l-1.45 1.45A11.993 11.993 0 0 0 16 12c-4.339 0-8.14 2.302-10.247 5.752l-1.45-1.449A13.987 13.987 0 0 1 16 10zm0-5c6.267 0 11.826 3.034 15.286 7.714l-1.432 1.432C26.773 9.821 21.716 7 16 7 10.285 7 5.228 9.82 2.146 14.145L.714 12.714C4.174 8.034 9.733 5 16 5z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Chỗ đỗ xe miễn phí tại nơi ở</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M16 1c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C1 7.716 7.716 1 16 1zm0 2C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm2 5a5 5 0 0 1 .217 9.995L18 18h-5v6h-2V8zm0 2h-5v6h5a3 3 0 0 0 .176-5.995z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Bể bơi</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M24 26c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 27.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 28c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 28c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 28c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 29.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 26c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 26c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 26zm0-5c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 22.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 23c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 23c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 23c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 24.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 21c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 21c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 21zM20 3a4 4 0 0 1 3.995 3.8L24 7v2h4v2h-4v5c.912 0 1.798.3 2.5.862l.171.147c.306.276.71.445 1.142.483L28 17.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 18c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 18c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 18c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 19.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 16c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492a3.956 3.956 0 0 1 2.444-1.002L16 16v-5H4V9h12V7a2 2 0 0 0-3.995-.15L12 7h-2a4 4 0 0 1 7-2.645A3.985 3.985 0 0 1 20 3zm-2 13.523c.16.091.313.194.459.307l.212.179c.35.316.826.49 1.33.491.439 0 .86-.134 1.191-.38l.137-.111c.206-.187.431-.35.67-.486V11h-4zM20 5a2 2 0 0 0-1.995 1.85L18 7v2h4V7a2 2 0 0 0-2-2z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Điều hòa nhiệt độ</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M17 1v4.03l4.026-2.324 1 1.732L17 7.339v6.928l6-3.464V5h2v4.648l3.49-2.014 1 1.732L26 11.381l4.026 2.325-1 1.732L24 12.535l-6 3.464 6 3.465 5.026-2.902 1 1.732L26 20.618l3.49 2.016-1 1.732L25 22.351V27h-2v-5.804l-6-3.465v6.929l5.026 2.902-1 1.732L17 26.97V31h-2v-4.031l-4.026 2.325-1-1.732L15 24.66v-6.929l-6 3.464V27H7v-4.65l-3.49 2.016-1-1.732 3.489-2.016-4.025-2.324 1-1.732 5.025 2.901 6-3.464-6-3.464-5.025 2.903-1-1.732L6 11.38 2.51 9.366l1-1.732L7 9.648V5h2v5.803l6 3.464V7.339L9.974 4.438l1-1.732L15 5.03V1z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Tiện nghi thiết yếu</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M11 1v7l1.898 20.819.007.174c-.025 1.069-.804 1.907-1.818 1.999a2 2 0 0 1-.181.008h-7.81l-.174-.008C1.86 30.87 1.096 30.018 1.096 29l.002-.09 1.907-21L3.001 1zm6 0l.15.005a2 2 0 0 1 1.844 1.838L19 3v7.123l-2 8V31h-2V18.123l.007-.163.02-.162.033-.16L16.719 11H13V1zm11 0a2 2 0 0 1 1.995 1.85L30 3v26a2 2 0 0 1-1.85 1.995L28 31h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7V9h7V7h-7V5h7V3h-7V1zM9.088 9h-4.18L3.096 29l.058.002L10.906 29l-.004-.058zM17 3h-2v6h2zM9.002 3H5L5 7h4.004z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Mắc áo</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M16 2a5 5 0 0 1 1.661 9.717 1.002 1.002 0 0 0-.653.816l-.008.126v.813l13.23 9.052a3 3 0 0 1 1.299 2.279l.006.197a3 3 0 0 1-3 3H3.465a3 3 0 0 1-1.694-5.476L15 13.472v-.813c0-1.211.724-2.285 1.816-2.757l.176-.07a3 3 0 1 0-3.987-3.008L13 7h-2a5 5 0 0 1 5-5zm0 13.211L2.9 24.175A1 1 0 0 0 3.465 26h25.07a1 1 0 0 0 .565-1.825z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Máy sấy tóc</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M14 27l-.005.2a4 4 0 0 1-3.789 3.795L10 31H4v-2h6l.15-.005a2 2 0 0 0 1.844-1.838L12 27zM10 1c.536 0 1.067.047 1.58.138l.38.077 17.448 3.64a2 2 0 0 1 1.585 1.792l.007.166v6.374a2 2 0 0 1-1.431 1.917l-.16.04-13.554 2.826 1.767 6.506a2 2 0 0 1-1.753 2.516l-.177.008H11.76a2 2 0 0 1-1.879-1.315l-.048-.15-1.88-6.769A9 9 0 0 1 10 1zm5.692 24l-1.799-6.621-1.806.378a8.998 8.998 0 0 1-1.663.233l-.331.008L11.76 25zM10 3a7 7 0 1 0 1.32 13.875l.331-.07L29 13.187V6.813L11.538 3.169A7.027 7.027 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Bếp</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Camera an ninh trong nhà</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M23 3a2 2 0 0 1 1.995 1.85L25 5v1.522l5-1.999v11.954l-5-2V16a2 2 0 0 1-1.85 1.995L23 18l-6.1.001a5.005 5.005 0 0 1-3.984 3.915 5.002 5.002 0 0 1-4.7 4.08L8 26H4v4H2V20h2v4h4a3.001 3.001 0 0 0 2.872-2.13A5.004 5.004 0 0 1 7.1 18.002L4 18a2 2 0 0 1-1.995-1.85L2 16V5a2 2 0 0 1 1.85-1.995L4 3zM12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm11-9H4v11h3.1a5.002 5.002 0 0 1 9.8 0H23zm5 2.476l-3 1.2v3.647l3 1.2zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Thang máy</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M30 1a1 1 0 0 1 .993.883L31 2v28a1 1 0 0 1-.883.993L30 31H2a1 1 0 0 1-.993-.883L1 30V2a1 1 0 0 1 .883-.993L2 1zM3 3v26h12V3zm7 9v6.585l1.793-1.792 1.414 1.414-3.5 3.5a1 1 0 0 1-1.32.083l-.094-.083-3.5-3.5 1.414-1.414L8 18.585V12zm12.387-1.497a1 1 0 0 1 1.226 0l.094.083 3.5 3.5-1.414 1.414L24 13.707V20h-2v-6.293L20.207 15.5l-1.414-1.414 3.5-3.5zM17 29h12V3H17z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Truyền hình cáp</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M24 1a5 5 0 0 1 4.995 4.783L29 6v20a5 5 0 0 1-4.783 4.995L24 31h-5v-2h5a3 3 0 0 0 2.995-2.824L27 26V6a3 3 0 0 0-2.824-2.995L24 3H8a3 3 0 0 0-2.995 2.824L5 6v20a3 3 0 0 0 2.824 2.995L8 29h7v-8h-2a2 2 0 0 1-1.995-1.85L11 19v-6a2 2 0 0 1 1.85-1.995L13 11h6a2 2 0 0 1 1.995 1.85L21 13v6a2 2 0 0 1-1.85 1.995L19 21h-2v8a2 2 0 0 1-1.85 1.995L15 31H8a5 5 0 0 1-4.995-4.783L3 26V6a5 5 0 0 1 4.783-4.995L8 1zm-5 12h-6v6h2v-4h2v4h2z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="roomInfo__block__fourth__cell">
                                <div className="roomInfo__block__fourth__cell__detail">
                                    <div className="roomInfo__block__fourth__cell__detail__title">Và nhiều tiện nghi khác</div>
                                    <div className="roomInfo__block__fourth__cell__detail__icon">
                                        <svg>
                                            <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="roomInfo__container__right">
                <div className="roomInfo__scroll">
                    <div className="roomInfo__block">
                        <div className="roomInfo__box">
                            <div className="roomInfo__box__layout">
                                <div className="roomInfo__box__layout__header">
                                    <div className="roomInfo__box__layout__header__left">
                                        <div className="roomInfo__box__layout__header__defaultPrice">
                                            <span className="roomInfo__defaultPrice">$43</span>
                                            <span className="roomInfo__night">/đêm</span>
                                        </div>
                                    </div>

                                    <div className="roomInfo__box__layout__header__right">
                                        <span className="roomInfo__stars">
                                            <StarIcon className="roomFirst__star"/>
                                            <strong>4.9 (41)</strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="roomInfo__box__layout__body">
                                    <div className="roomInfo__box__layout__body__row">
                                        <div className="roomInfo__box__layout__body__row__a">
                                        {/* _e296pg */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomInfo
