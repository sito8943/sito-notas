/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import stringSimilarity from "string-similarity";
import { createContext, useState, useContext, useCallback } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const searchFunction = useCallback(
    (text) => {
      const toSearch = searchValue.toLowerCase();
      return searchValue && searchValue.length
        ? stringSimilarity.compareTwoStrings(
            text?.title?.toLowerCase() ?? "",
            toSearch ?? ""
          ) > 0.30 || text?.title?.toLowerCase().indexOf(toSearch) >= 0
        : true;
    },
    [searchValue]
  );

  const value = { searchFunction, searchValue, setSearchValue };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
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

// eslint-disable-next-line react-refresh/only-export-components
export { SearchProvider, useSearch };
