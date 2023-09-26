/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const ModeContext = createContext();

const ModeProvider = ({ children }) => {
  function toggleModeState() {
    setModeState(!modeState);
  }

  const [modeState, setModeState] = useState(true);

  const value = { modeState, setModeState, toggleModeState };
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

ModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined)
    throw new Error("modeContext must be used within a Provider");
  return context;
};

export { ModeProvider, useMode };
