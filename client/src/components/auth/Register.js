import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { name, email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists.") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className="form-area">
      <div className="form-wrapper">
        <h1>Accout Register</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={onChange}
            />
            <div className="form-text">
              Password must be 6 characters or more
            </div>
          </div>
          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
