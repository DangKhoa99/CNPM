import React, {useRef, useState, useEffect} from 'react'
import "../../style/LoginRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { store } from 'react-notifications-component'
import history from '../../history';
import useToken from '../../hooks/useToken'
import { useLocation, Link } from 'react-router-dom'

function SignIn() {

    const { token, setToken } = useToken();
    const location = useLocation();

    if(token && location.pathname == '/sign-in'){
        history.push("/")
    }

    document.title = "Đăng nhập | RoyalStay"

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const notificationLoginFail = {
        title: ' RoyalStay - Thông báo',
        message: 'Tài khoản hoặc mật khẩu không đúng',
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notificationLoginSuccess = {
        title: ' RoyalStay - Thông báo',
        message: 'Đăng nhập thành công',
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    // useEffect(() => {
    //     onSubmit();
    // },[])

    const onSubmit = async (data)  => {
        console.log(data);

        const loginAccount = {
            username: data.username,
            password: data.password   
        }

        axios.post('http://localhost:5000/auth/login', loginAccount)
        .then(response => {
            console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", response.data.authToken);
            if(response.data == "Tài khoản hoặc mật khẩu không đúng"){
                store.addNotification(notificationLoginFail);
            }
            else{
                const accessToken = response.data;

                setToken(accessToken);
               
                console.log("token 1: ",token);
            // console.log(setToken(response.data));
                // store.addNotification(notificationLoginSuccess);

                // setRedirectToReferrer(true)

                // if (redirectToReferrer == true) {
                //     <Redirect to={from} />
                // }
                // dispatch(addToken(response.data))
                // console.log("token1", token)
                if(location.pathname == "/sign-in"){
                    // history.push("/");
                    window.location = "/";
                    console.log("token path sign in: ",token)//null
                    store.addNotification(notificationLoginSuccess);
                    // window.location.reload();

                }
                else{
                    // history.push(from);
                    window.location.reload();
                    store.addNotification(notificationLoginSuccess);
                }
            }
            // console.log("token2", token)
        })
        .catch(err => {
            console.log("Error: ", err);
        })

        
    }

    

    console.log("token out Submit: ",token);


    // console.log("token3", token)

    const Eye = <FontAwesomeIcon className="iconEye" icon={faEye} />;
    const EyeSlash = <FontAwesomeIcon className="iconEye" icon ={faEyeSlash}/>;

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
        <div className="signIn">
            <div className="loginRegister">
                <div className="cardLoginRegister">
                    <div className="formLoginRegister">
                        <div className="formLoginRegister_container">
                            <header>
                                <h1>Đăng nhập vào <a href="/" style={{textDecoration: "none", color: "black"}}>RoyalStay</a></h1>
                            </header>
                            <section>

                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    

                                    <button className="loginRegister_submit_btn" type="submit">Đăng nhập</button>

                                    <div className="loginRegister_subText">
                                        Bạn chưa có tài khoản?
                                        <Link to="/sign-up"> Đăng ký</Link>
                                    </div>                           
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
// SignIn.propTypes = {
//     setToken: PropTypes.func.isRequired
// };
