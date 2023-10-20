import React from "react";
import { Outlet } from "react-router-dom";

// components
import Navbar from "./components/Navbar/Navbar";

function View() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default View;
