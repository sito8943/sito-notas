import React, { useEffect, useState } from "react";
import { useDebounce } from "use-lodash-debounce";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchWrapper() {
  const [searching, setSearching] = useState("");
  const debouncedValue = useDebounce(searching, 500);

  useEffect(() => {}, [debouncedValue]);

  const onSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div role="search" className="w-[400px]">
      <form onSubmit={onSearch} className="relative w-full">
        <button type="submit" className="absolute -translate-y-[50%] top-[50%] icon-button secondary">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="search"
          value={searching}
          className="input !pl-10 w-full dark:bg-dark-background dark:text-white"
          onChange={(e) => setSearching(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchWrapper;
