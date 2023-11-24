/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const value = { searchValue, setSearchValue };
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error("searchContext must be used within a Provider");
  return context;
};

export { SearchProvider, useSearch };
