import React from 'react';
import Header from '../Components/Header';
import UserItem from '../Components/UserItem';
import Footer from '../Components/Footer';
function UsersList() {
  return (
    <div>
      <Header />
      <div className="container content">
        <div className="border mt-4 p-4">
          <h3 className="text-center bg-info p-2 mb-3">
            Welcome To User Management System
          </h3>
          <UserItem/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UsersList