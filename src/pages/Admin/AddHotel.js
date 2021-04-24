import React, {useState} from 'react'
import "../../style/AddHotel.css"
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import useToken from '../../hooks/useToken'
import axios from 'axios'

function AddHotel() {
    const { token, setToken } = useToken();
    let history = useHistory();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data)  => {
        console.log("DATA: ", data);
        
        let type = []
        if(data.Small){
            type.push("Small")
        }
        if(data.Medium){
            type.push("Medium")
        }
        if(data.Large){
            type.push("Large")
        }

        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                name: data.name,
                address: data.address,
                bio: data.bio,
                tien_ich: [
                    data.tien_ich
                ],
                imageLink: [
                    data.imageLink,
                    data.imageLink2,
                    data.imageLink3,
                    data.imageLink4,
                    data.imageLink5
                ],
                room: {
                    roomType: type,   
                    price: data.price,
                    quantity: data.quantity
                }
            },
            url: "http://localhost:5000/hotel/add"
        }
        axios(options)
        .then(response => {
            console.log("ADD HOTEL: ", response.data)
            window.location = "/account/admin/hotel-management/"
        })
        .catch(error => console.log(error))
    }
    console.log(errors);


    const onChange = (e) => {
        console.log('change', e.target.value);
    };



    const [suggestLink, setSuggestLink] = useState(false);
    const clickSuggestLink = () => setSuggestLink(!suggestLink)


    return (
        <div className="addHotel">
            <button className="bookingHeader_icon" onClick={history.goBack} title="Quay lại">
                <i className="fas fa-chevron-left"></i>
            </button>

            <div className="btn_suggest_link" onClick={clickSuggestLink}>
                <i className="far fa-question-circle"></i>
            </div>

            <div className={suggestLink ? "link_Image_suggestion active" : "link_Image_suggestion"}>
                <h3>Link ảnh TEST</h3>
                <p><b style={{color: "black"}}>1/</b> <i>https://a0.muscache.com/im/pictures/db3ee056-746a-4fcd-8aff-7b8e70f910ec.jpg?im_w=720</i></p>
                <p><b style={{color: "black"}}>2/</b> <i>https://a0.muscache.com/im/pictures/c6701ab1-dd67-4a69-947a-a6974da79ed6.jpg?im_w=720</i></p>
                <p><b style={{color: "black"}}>3/</b> <i>https://a0.muscache.com/im/pictures/4364cb82-91f3-42d2-94f1-b9bd30d07751.jpg?im_w=720</i></p>
                <p><b style={{color: "black"}}>4/</b> <i>https://a0.muscache.com/im/pictures/7a20dd32-f4c6-4099-886b-7c6a48eea365.jpg?im_w=720</i></p>
                <p><b style={{color: "black"}}>5/</b> <i>https://a0.muscache.com/im/pictures/1d6cbb97-9609-4fa8-939a-cd03c7f51e27.jpg?im_w=720</i></p>
            </div>

            <div className="addHotel_header">
                <h1 style={{marginBottom: "20px", fontSize: "50px"}}>THÊM KHÁCH SẠN</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_row">
                    <input
                        className="form_input"
                        type="text" 
                        placeholder="Tên khách sạn" 
                        {...register("name", {
                            required: "Vui lòng nhập tên khách sạn"
                        })} 
                    />
                    {errors.name && <p>⚠ {errors.name.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Địa chỉ" 
                        {...register("address", {
                            required: "Vui lòng nhập địa chỉ khách sạn"
                        })} 
                    />
                    {errors.address && <p>⚠ {errors.address.message}</p>}
                </div>

                <div className="input_row bioHotel">
                    <textarea  
                        className="form_input bioHotel"
                        type="text"
                        rows="1" 
                        placeholder="Mô tả" 
                        {...register("bio", {
                            required: "Vui lòng nhập thông tin khách sạn"
                        })} 
                    />
                    {errors.bio && <p>⚠ {errors.bio.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Tiện ích" 
                        {...register("tien_ich", {
                            required: "Vui lòng nhập tiện ích khách sạn"
                        })} 
                    />
                    {errors.tien_ich && <p>⚠ {errors.tien_ich.message}</p>}
                </div>

                <div className="input_row">
                    <div className="group_checkbox">
                        Loại phòng:
                        <label className="container_checkbox">
                            <input
                                name="roomType"
                                type="checkbox"
                                onChange={onChange}
                                {...register("Small", {
                                    required: 'Vui lòng chọn loại phòng khách sạn' 
                                })}
                                />{' '}
                                Nhỏ
                            <span className="checkmark_checkbox"></span>
                        </label>
                        <label className="container_checkbox">
                            <input
                                name="roomType"
                                type="checkbox"
                                onChange={onChange}
                                {...register("Medium")}
                                />{' '}
                                Vừa
                            <span className="checkmark_checkbox"></span>
                        </label>
                        <label className="container_checkbox">
                            <input
                            name="roomType"
                            type="checkbox"
                            onChange={onChange}
                            {...register("Large")}
                            />{' '}
                            Lớn
                            <span className="checkmark_checkbox"></span>
                        </label>
                    </div> 
                    {errors.Small && <p>⚠ {errors.Small.message}</p>}
                </div>
                

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Giá" 
                        {...register("price", {
                            required: "Vui lòng nhập giá phòng khách sạn"
                        })} 
                    />
                    {errors.price && <p>⚠ {errors.price.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="number" 
                        placeholder="Số lượng phòng" 
                        {...register("quantity", {
                            required: "Vui lòng nhập số lượng khách sạn",
                            min: {
                                value: 1,
                                message: "Số lượng phòng ít nhất là 1"
                            }
                        })} 
                    />
                    {errors.quantity && <p>⚠ {errors.quantity.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="url" 
                        placeholder="Link ảnh 1" 
                        {...register("imageLink", {
                            required: "Vui lòng điền link ảnh khách sạn",
                            pattern: {
                                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                                message: "Định dạng yêu cầu là: `http(s)://royalstay.com`"
                            }
                        })}
                    />
                    {errors.imageLink && <p>⚠ {errors.imageLink.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Link ảnh 2" 
                        {...register("imageLink2")} 
                    />
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Link ảnh 3" 
                        {...register("imageLink3")} 
                    />
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Link ảnh 4" 
                        {...register("imageLink4")} 
                    />
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Link ảnh 5" 
                        {...register("imageLink5")} 
                    />
                </div>

                <button className="addHotel_submit_btn" type="submit">Tạo khách sạn</button>
            </form>
             
        </div>
    )
}

export default AddHotel
