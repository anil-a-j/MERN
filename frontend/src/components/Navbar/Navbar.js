import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset, selectAuth } from "../../redux/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(selectAuth);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <div className="d-flex navbar">
      <ul>
        {!userInfo && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!userInfo && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {userInfo && (
          <li>
            <a onClick={logoutUser}>Logout</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
