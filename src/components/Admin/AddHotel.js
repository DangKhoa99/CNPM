import React, {useState} from 'react'
import "../../style/AddHotel.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"

function AddHotel({
    token,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
      ? (content = content.English)
      : (content = content.Vietnam);

    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data)  => {
        // console.log("DATA: ", data);
        
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
            // console.log("ADD HOTEL: ", response.data)
            window.location.reload()
        })
        .catch(error => console.log(error))
    }
    // console.log(errors);


    const onChange = (e) => {
        console.log('change', e.target.value);
    };

    const [suggestLink, setSuggestLink] = useState(false);
    const clickSuggestLink = () => setSuggestLink(!suggestLink)

    return (
        <div className="addHotel">
            <div className="customDialog">
                <div className="Content-module_content__1e-91">
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input_row">
                            <input
                                className="form_input"
                                type="text" 
                                placeholder={content.hotelName}
                                {...register("name", {
                                    required: content.validationHotelName
                                })} 
                            />
                            {errors.name && <p>⚠ {errors.name.message}</p>}
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.hotelAddress}
                                {...register("address", {
                                    required: content.validationHotelAddress
                                })} 
                            />
                            {errors.address && <p>⚠ {errors.address.message}</p>}
                        </div>

                        <div className="input_row bioHotel">
                            <textarea  
                                className="form_input bioHotel"
                                type="text"
                                rows="1" 
                                placeholder={content.hotelInformation}
                                {...register("bio", {
                                    required: content.validationHotelInformation
                                })} 
                            />
                            {errors.bio && <p>⚠ {errors.bio.message}</p>}
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.utilities}
                                {...register("tien_ich", {
                                    required: content.validationUtilities
                                })} 
                            />
                            {errors.tien_ich && <p>⚠ {errors.tien_ich.message}</p>}
                        </div>

                        <div className="input_row">
                            <div className="group_checkbox" style={{width: "100%"}}>
                                {content.typeRoom}:
                                <label className="container_checkbox">
                                    <input
                                        name="roomType"
                                        type="checkbox"
                                        onChange={onChange}
                                        {...register("Small", {
                                            required: content.validationRoomType
                                        })}
                                        />{' '}
                                        {content.smallRoom}
                                    <span className="checkmark_checkbox"></span>
                                </label>
                                <label className="container_checkbox">
                                    <input
                                        name="roomType"
                                        type="checkbox"
                                        onChange={onChange}
                                        {...register("Medium")}
                                        />{' '}
                                        {content.mediumRoom}
                                    <span className="checkmark_checkbox"></span>
                                </label>
                                <label className="container_checkbox">
                                    <input
                                    name="roomType"
                                    type="checkbox"
                                    onChange={onChange}
                                    {...register("Large")}
                                    />{' '}
                                    {content.largeRoom}
                                    <span className="checkmark_checkbox"></span>
                                </label>
                            </div> 
                            {errors.Small && <p>⚠ {errors.Small.message}</p>}
                        </div>
                        
                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.price}
                                {...register("price", {
                                    required: content.validationPriceHotel
                                })} 
                            />
                            {errors.price && <p>⚠ {errors.price.message}</p>}
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="number" 
                                placeholder={content.quantityHotel}
                                {...register("quantity", {
                                    required: content.validationQuantityHotel,
                                    min: {
                                        value: 1,
                                        message: content.validationQuantityHotel1
                                    }
                                })} 
                            />
                            {errors.quantity && <p>⚠ {errors.quantity.message}</p>}
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="url" 
                                placeholder={content.linkImage1}
                                {...register("imageLink", {
                                    required: content.validationLinkImage,
                                    pattern: {
                                        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                                        message: content.validationLinkImage1
                                    }
                                })}
                            />
                            {errors.imageLink && <p>⚠ {errors.imageLink.message}</p>}
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.linkImage2}
                                {...register("imageLink2")} 
                            />
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.linkImage3}
                                {...register("imageLink3")} 
                            />
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.linkImage4}
                                {...register("imageLink4")} 
                            />
                        </div>

                        <div className="input_row">
                            <input 
                                className="form_input"
                                type="text" 
                                placeholder={content.linkImage5}
                                {...register("imageLink5")} 
                            />
                        </div>

                        <button className="addHotel_submit_btn" type="submit">{content.addHotel}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddHotel
