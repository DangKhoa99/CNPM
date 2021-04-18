import React from 'react'
import "../../style/AddHotel.css"
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

function AddHotel() {
    let history = useHistory();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data)  => {
        console.log(data);
    }
    console.log(errors);
    return (
        <div className="addHotel">
            <button className="bookingHeader_icon" onClick={history.goBack} title="Quay lại">
                <svg viewBox="0 0 32 32">
                    <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"/> 
                </svg>
            </button>
            
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

                {/* <div className="input_row">
                    <input 
                        className="form_input"
                        type="text" 
                        placeholder="Ảnh" 
                        {...register("imageLink", {required: true})} 
                    />
                </div> */}

                <button className="addHotel_submit_btn" type="submit">Tạo khách sạn</button>
            </form>
             
        </div>
    )
}

export default AddHotel
