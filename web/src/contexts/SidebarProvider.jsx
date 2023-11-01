/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [sidebarState, setSidebarState] = useState(false);

  function toggleSidebarState() {
    setSidebarState(!sidebarState);
  }

  const value = { sidebarState, setSidebarState, toggleSidebarState };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("sidebarContext must be used within a Provider");
  return context;
};

export { SidebarProvider, useSidebar };
