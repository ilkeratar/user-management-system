import React, { useEffect } from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import UsersList from './Pages/UsersList';
import { useAuthStore } from './context/authContext';



function App() {
  const {user}=useAuthStore();
  
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path='/' 
        element={user ? <Navigate to="/profile" /> : <Navigate to="/login" />}
        />
        <Route path='/login' 
        element={user ? <Navigate to="/profile" />  :<LoginPage/>}
        />
        <Route path='/profile' element={user ? <HomePage/> :
         <Navigate to="/login" />}
        />
        <Route path='/users' element={user ? <UsersList/> :
         <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
