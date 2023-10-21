import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

// components
import Navbar from "./components/Navbar/Navbar";

function View() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default View;
