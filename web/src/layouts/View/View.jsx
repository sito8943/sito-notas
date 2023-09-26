import React, { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// contexts
import { useUser } from "../../contexts/UserProvider";

// components
import Navbar from "./components/Navbar";

function View() {
  const navigate = useNavigate();

  const { userState } = useUser();

  useEffect(() => {
    // if (!userState.user) navigate("/auth/");
  }, [userState]);

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default View;
