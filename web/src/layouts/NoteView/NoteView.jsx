import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// contexts
import { useUser } from "../../contexts/UserProvider";
import { SearchProvider } from "../../contexts/SearchProvider";

// components
import Navbar from "./components/Navbar";
import { SidebarProvider } from "../../contexts/SidebarProvider";

function NoteView() {
  const navigate = useNavigate();

  const { userState } = useUser();

  useEffect(() => {
    if (!userState.user) navigate("/auth/");
  }, [userState]);

  return (
    <SearchProvider>
      <SidebarProvider>
        <Navbar />
        <Outlet />
      </SidebarProvider>
    </SearchProvider>
  );
}

export default NoteView;
