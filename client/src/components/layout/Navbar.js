import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faImage,
  faUser,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className="nav-link">Hello {user && user.name} </li>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          <FontAwesomeIcon icon={faUser} />
          Profile Page
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/upload" className="nav-link">
          <FontAwesomeIcon icon={faImage} />
          Upload Image
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign In
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FontAwesomeIcon icon={faCameraRetro} /> Pictorial
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
