import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li>
      <li>
        <Link to="/profile">Profile Page</Link>
      </li>
      <li>
        <Link to="/upload">Upload Image</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <h1>This is the main App</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

export default Navbar;
