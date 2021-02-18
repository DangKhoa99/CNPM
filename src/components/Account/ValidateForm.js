export default function ValidateForm(values) {
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = 'Chưa nhập tài khoản';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Chưa nhập Email';
    } 
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Địa chỉ Email không hợp lệ';
    }

    if (!values.password) {
      errors.password = 'Chưa nhập mật khẩu';
    } 
    else if (values.password.length < 6) {
      errors.password = 'Mật khẩu phải chứa hơn 6 kí tự';
    }
  
    if (!values.password2) {
      errors.password2 = 'Chưa nhập mật khẩu';
    } 
    else if (values.password2 !== values.password) {
      errors.password2 = 'Các mật khẩu không khớp. Hãy thử lại';
    }

    return errors;
}