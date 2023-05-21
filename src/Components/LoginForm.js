import React, { useState } from 'react'
import {toast} from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { useAuthStore } from "../context/authContext";

function LoginForm({setIsRegisterClick}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginFetch,user,isLoading}=useAuthStore();
    const navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(email==="" || password===""){
            toast.error("Make sure you fill in the blanks");
            return;
        }

        try {
            await loginFetch(email, password)
            .then((data) => {
                console.log("Login success");
                toast.success("Login Success",data);
                navigate("/profile");
              })
              .catch((e) => {
                console.log("Login error");
                toast.error(`Wrong username or password`);
              });
          } catch (e) {
            console.log("normalError");
            toast.error("Error:", e);
          }
    }
  return (
    <>
    <form>
            <h4  className='form__heading'>User Management System</h4>
            <hr />
            <div className='mb-3'>
                <label htmlFor="exampleInputEmail1" className='form-label'>
                    Email address
                </label>
                <input type="email"
                className='form-control'
                value={email}
                onChange={e =>setEmail(e.target.value)}
                id='exampleInputEmail1'
                aria-describedby='emailHelp' />
            </div>
            <div className='mb-3'>
                <label htmlFor="exampleInputPassword1" className='form-label'>
                    Password
                </label>
                <input type="password" 
                className='form-control'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                id='exampleInputPassword1'/>
            </div>
            <div className='form-signupLink mb-3'>
                <p>
                    Don't have an account? 
                    <span className='text-link' onClick={()=>setIsRegisterClick(true)}> Sign up !</span>
                </p>
            </div>
            <button type='submit' disabled={isLoading} className='form__button' onClick={handleSubmit}>
                Login
            </button>
        </form>
    </>
  )
}

export default LoginForm