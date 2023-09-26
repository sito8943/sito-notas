import React, { useEffect, Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// contexts
import { useUser } from "../contexts/UserProvider";

function Auth() {
  const navigate = useNavigate();

  const { userState } = useUser();

  useEffect(() => {
    if (userState.user) navigate("/auth/");
  }, [userState]);

  return <Outlet />;
}

export default Auth;
