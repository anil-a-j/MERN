import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { userInfo, userError } = useSelector(selectAuth);

  let navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.toLowerCase());
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required!");
      return false;
    }
    if (validateEmail(email) !== true) {
      setError("Email isn't valid!");
      return false;
    }
    setError("");
    dispatch(login({ email, password }));
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
    <div className="credentials shadow">
      <h2 className="text-center">Login</h2>
      <form className="form" onSubmit={submitLogin}>
        <div className="form-group">
          <label>Email id</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email id"
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
        <button className="submit-btn btn display-block-center">Login</button>
      </form>
    </div>
  );
};

export default Login;
