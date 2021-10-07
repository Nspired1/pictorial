import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ImageState from "./context/image/ImageState";

import WithPrivacy from "./components/routing/WithPrivacy";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UploadImage from "./components/images/UploadImage";
import EditImage from "./components/images/EditImage";
import UserProfile from "./components/pages/UserProfile";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ImageState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <WithPrivacy exact path="/upload" component={UploadImage} />
                  <WithPrivacy exact path="/edit" component={EditImage} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <WithPrivacy exact path="/profile" component={UserProfile} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ImageState>
    </AuthState>
  );
}

export default App;
