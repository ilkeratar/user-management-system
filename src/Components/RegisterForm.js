import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/authContext";

function RegisterForm({ setIsRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUpFetch, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email==="" || password===""){
      toast.error("Make sure you fill in the blanks");
      return;
    }else if(password!==confirmPassword){
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signUpFetch(email, password)
        .then((data) => {
          toast.success("Sign Up  Success",data);
          navigate("/profile");
        })
        .catch((e) => {
          toast.error("Sign Up failed:", e);
        });
    } catch (e) {
      toast.error("Error: ", e);
    }
  };

  return (
    <>
      <form>
        <h4 className="form__heading">User Management System</h4>
        <hr />
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email addres
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="exampleInputConfirmPassword1"
          />
        </div>
        <div className="form-signupLink mb-3">
          <p>
            Already have an account?
            <span
              className="text-link"
              onClick={() => setIsRegisterClick(false)}
            >
              {" "}
              Sign In!
            </span>
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="form__button"
          onClick={handleSubmit}
        >
          Register
        </button>
        
      </form>
    </>
  );
}

export default RegisterForm;
