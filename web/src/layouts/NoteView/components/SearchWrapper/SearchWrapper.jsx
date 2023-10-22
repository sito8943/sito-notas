import React, { useEffect, useState } from "react";
import { useDebounce } from "use-lodash-debounce";

import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// contexts
import { useSearch } from "../../../../contexts/SearchProvider";

// styles
import "./styles.css";
import IconButton from "../../../../components/IconButton/IconButton";

function SearchWrapper() {
  const [searching, setSearching] = useState("");
  const debouncedValue = useDebounce(searching, 500);

  const { setSearchState } = useSearch();

  useEffect(() => {
    setSearchState(debouncedValue);
  }, [debouncedValue]);

  const [showSearch, setShowSearch] = useState(false);

  const onSearch = (e) => {
    setShowSearch(true);
    e.preventDefault();
  };

  return (
    <div role="search" className="search">
      <form onSubmit={onSearch} className="relative w-full">
        <IconButton
          icon={faSearch}
          type="submit"
          name="search"
          aria-label="click para buscar"
          className="absolute -translate-y-[50%] top-[50%] icon-button secondary"
        />
        <input
          type="search"
          value={searching}
          className="input !pl-10 !pr-9 w-full dark:bg-dark-background dark:text-white"
          onChange={(e) => setSearching(e.target.value)}
        />
        {searching.length ? (
          <IconButton
            icon={faClose}
            name="clear-search"
            onClick={() => setSearching("")}
            aria-label="click para limpiar la búsqueda"
            className="absolute -translate-y-[50%] top-[50%] right-0 icon-button !text-sm secondary"
          />
        ) : null}
      </form>
    </div>
  );
}

export default SearchWrapper;
