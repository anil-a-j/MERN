import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, selectAuth } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { userInfo, userError } = useSelector(selectAuth);

  let navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.toLowerCase());
  };

  const validatePhone = (phone) => {
    if (Number(phone)) {
      return phone.length === 10 ? true : false;
    }
    return false;
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/.test(
      password
    );
  };

  const submitSignup = (e) => {
    e.preventDefault();
    if (!email || !phone || !password) {
      setError("All fields are required!");
      return false;
    }
    if (validateEmail(email) !== true) {
      setError("Email isn't valid!");
      return false;
    }
    if (validatePhone(phone) !== true) {
      setError("Phone number has to be 10 digit number!");
      return false;
    }
    if (validatePassword(password) !== true) {
      setError(
        "Password should be contain at least One Uppercase , One lowercase, One Numeric, One Special Character and legnth has to be minimum 8"
      );
      return false;
    }
    setError("");

    dispatch(signup({ email, phone, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (userError) {
      setError(userError);
    }
  }, [userInfo, userError]);

  return (
    <div className="credentials  shadow">
      <h2 className="text-center">Sign Up</h2>
      <form className="form" onSubmit={submitSignup}>
        <div className="form-group">
          <label>Email id</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email id"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="enter your phone number"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
          />
          <p className="text-small text-right text-blue">
            Minimum 8 Alpha Numeric
          </p>
        </div>
        {error && <p className="text-small text-danger">{error}</p>}
        <button className="submit-btn btn display-block-center">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
