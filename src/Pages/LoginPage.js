import React, { useState } from 'react';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';
function LoginPage() {
    const [isRegisterClick, setIsRegisterClick] = useState(false);
  return (
    <div className='form__container d-flex flex-column align-items-center justify-content-center'> 
        {!isRegisterClick 
        ? <LoginForm setIsRegisterClick={setIsRegisterClick}/> 
        : <RegisterForm setIsRegisterClick={setIsRegisterClick} />}
    </div>
  )
}

export default LoginPage