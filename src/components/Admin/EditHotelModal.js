import React from 'react'
import "../../style/EditHotelModal.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"

function EditHotelModal({
    idHotel,
    img,
    address,
    name,
    description,
    price,
    quantity,
    tien_ich,
    roomType,
    token,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    // console.log(tien_ich)

    let tienIch = ""
    if(tien_ich.length > 0){
        for(let i in tien_ich){
            tien_ich[i] = tien_ich[i].replace("·", "")
            tien_ich[i] = tien_ich[i].replace("   ", "")
            tienIch += tien_ich[i]
            // console.log("aa", typeof(tienIch))
        }
    }

    let Small = false
    let Medium = false
    let Large = false
    if(roomType.length > 0){
        for(let i in roomType){
            if(roomType[i] == "Small"){
                Small = true
            }
            if(roomType[i] == "Medium"){
                Medium = true
            }
            if(roomType[i] == "Large"){
                Large = true
            }
        }
    }

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            "name": name,
            "address": address,
            "bio": description,
            "tien_ich": tienIch,
            "Small": Small,
            "Medium": Medium,
            "Large": Large,
            "price": price,
            "quantity": quantity,
            "imageLink": img[0],
            "imageLink2": img[1],
            "imageLink3": img[2],
            "imageLink4": img[3],
            "imageLink5": img[4],
        }
    });

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
                hotelId: idHotel,
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
            url: "http://localhost:5000/hotel/edit"
        }
        axios(options)
        .then(response => {
            // console.log("EDIT HOTEL: ", response.data)
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    // const onChange = (e) => {
    //     console.log('change', e.target.value);
    // };

    return (
        <div className="customDialog">
            <div className="Content-module_content__1e-91">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input_row">
                        {content.hotelName}
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
                        {content.hotelAddress}
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
                        {content.hotelInformation}
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
                        {content.utilities}
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
                                    // onChange={onChange}
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
                                    // onChange={onChange}
                                    {...register("Medium")}
                                    />{' '}
                                    {content.mediumRoom}
                                <span className="checkmark_checkbox"></span>
                            </label>
                            <label className="container_checkbox">
                                <input
                                name="roomType"
                                type="checkbox"
                                // onChange={onChange}
                                {...register("Large")}
                                />{' '}
                                {content.largeRoom}
                                <span className="checkmark_checkbox"></span>
                            </label>
                        </div> 
                        {errors.Small && <p>⚠ {errors.Small.message}</p>}
                    </div>
                    
                    <div className="input_row">
                        {content.price}
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
                    {content.quantityHotel}
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
                        {content.linkImage1}
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

                    <button className="addHotel_submit_btn" type="submit">{content.confirmEditHotel}</button>
                </form>
            </div>
        </div>
    )
}

export default EditHotelModal
