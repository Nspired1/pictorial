import React, { Fragment } from "react";
import spinner from "../../gif/spinner.gif";

// eslint-disable-next-line
export default () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);
