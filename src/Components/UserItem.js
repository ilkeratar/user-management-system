import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import { useUsersStore } from "../context/usersContext";
function UserItem() {
  const profilePicDefault =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";

  const {usersFetch,usersDB,error}=useUsersStore();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData=async ()=>{
    try {
      await usersFetch()
      .then((data) => {
          console.log("Fetchsuccess");
          toast.success("Fetch success",data);
        })
        .catch((e) => {
          console.log("Fetcherror"+e);
          toast.error(`${e}`);
        });
    } catch (e) {
      console.log("normal Error");
      toast.error(`${e}`);
    }
  }
  if(usersDB){
    return usersDB.map((user) => {
      return (
        <div className="row" key={user.id}>
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
              <img
                src={user.img}
                alt="profile_pic"
                className="img-thumbnail"
                height={200}
                width={200}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="ms-4">
              <h4>Name: {user.name}</h4>
              <h4>Email: {user.email}</h4>
              <h4>Gender: {user.gender}</h4>
              <p>Accepted Terms And Conditions : {user.checked ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      );
    });
  }
  
}

export default UserItem;
