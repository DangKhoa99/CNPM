import React, {useRef, useState} from 'react'
import "../../style/AddUser.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import useToken from '../../hooks/useToken'
import axios from 'axios'

function AddUser() {
    const { token, setToken } = useToken();

    let history = useHistory();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data)  => {
        console.log(data);

        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                name: data.fullName,
                username: data.username,
                email: data.email,
                password: data.password   
            },
            url: "http://localhost:5000/customer/add"
        }
        axios(options)
        .then(response => {
            console.log("ADD USER: ", response.data)
            window.location = "/account/admin/user-management/"
        })
        .catch(error => console.log(error))
    }
    console.log(errors);

    const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
    const EyeSlash = <FontAwesomeIcon className="iconEye" icon={faEyeSlash}/>;
    const [showPassword, setShowPassword] = useState(false);

    const password = useRef();
  
    const { ref, ...rest } = register("password", {
        required: "Vui lòng nhập mật khẩu", 
        minLength: {
            value: 6,
            message: "Mật khẩu phải chứa hơn 6 kí tự"
        }
    })

    const changeTypePassword = () => {
        setShowPassword(!showPassword)
        password.current.type = showPassword ? "password" : "text";
    }

    return (
        <div className="addUser">
            <button className="bookingHeader_icon" onClick={history.goBack} title="Quay lại">
            <i class="fas fa-chevron-left"></i>
            </button>

            <div className="addUser_header">
                <h1 style={{marginBottom: "20px", fontSize: "50px"}}>THÊM NGƯỜI DÙNG</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_row">
                    <input 
                        className="form_input"
                        autoComplete="off"
                        type="text" 
                        placeholder="Nhập họ tên" 
                        {...register("fullName", {
                            required: "Vui lòng nhập họ tên", 
                            maxLength: {
                                value: 100,
                                message: "Không được vượt quá 100 kí tự"
                            }
                        })} 
                    />
                    {errors.fullName && <p>⚠ {errors.fullName.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        autoComplete="off"
                        type="text" 
                        placeholder="Nhập email" 
                        {...register("email", {
                            required: "Vui lòng nhập email", 
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Địa chỉ Email không hợp lệ"
                            }
                        })} 
                    />
                    {errors.email && <p>⚠ {errors.email.message}</p>}
                </div>

                <div className="input_row">
                    <input 
                        className="form_input"
                        autoComplete="off"
                        type="text" 
                        placeholder="Nhập tài khoản" 
                        {...register("username", {
                            required: "Vui lòng nhập tài khoản", 
                            pattern: {
                                value: /^([a-z\d]+-)*[a-z\d]+$/i,
                                message: "Tên tài khoản không hợp lệ"
                            }
                        })} 
                    />
                    {errors.username && <p>⚠ {errors.username.message}</p>}
                </div>

                <div className="input_row">
                    <div className="eye">
                        <input 
                            className="form_input"
                            autoComplete="off"
                            type="password" 
                            placeholder="Nhập mật khẩu"
                            {...rest}
                            ref={(e) => {
                                ref(e)
                                password.current = e
                            }}
                        />
                        {showPassword ? <i onClick={changeTypePassword}>{Eye}</i> : <i onClick={changeTypePassword}>{EyeSlash}</i>}
                    </div>
                    {errors.password && <p>⚠ {errors.password.message}</p>}
                </div>

                <button className="addUser_submit_btn" type="submit">Tạo người dùng</button>
            </form>
            
        </div>
    )
}

export default AddUser
