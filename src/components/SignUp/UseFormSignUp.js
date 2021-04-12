import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { store } from 'react-notifications-component'

function UseFormSignUp(callback, validate) {
    const notification_saveFavorite = {
        title: ' RoyalStay - Thông báo',
        message: 'Đăng ký thành công',
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
      };


    const [values, setValues] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();

        // Submit to backend API with Axios/fetch 
        // Implement your backend logic here. 
        const registerAccount = {
            name: values.fullName,
            username: values.username,
            email: values.email,
            password: values.password   
        }

        console.log(registerAccount);

        axios.post('http://localhost:5000/auth/register', registerAccount)
            .then(response => {
                console.log(response.data);
                if(response.data.success === true){
                    window.location.reload();
                    // store.addNotification(notification_saveFavorite)
                }
                else{
                    console.log(response.data.message);
                }
            })
            .catch(err => {
                console.log("sss: ", err);
            })

        

        
        setErrors(validate(values));
        setIsSubmitting(true);
    };
    
    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback();
            }
        },
        [errors]
    );
    
    return { handleChange, handleSubmit, values, errors };
}

export default UseFormSignUp
