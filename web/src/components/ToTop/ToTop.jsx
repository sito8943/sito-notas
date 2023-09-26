import React, { useState, useCallback, useEffect } from "react";

// fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// utils
import { scrollTo } from "some-javascript-utils/browser";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// styles
import "./style.css";

const ToTop = ({ parent, className }) => {
  const [visible, setVisible] = useState(false);

  const { languageState } = useLanguage();

  const onScroll = useCallback(
    (e) => {
      let top = 0;
      if (parent && parent.current !== null) top = parent.current.scrollTop;
      else top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 100) setVisible(true);
      else setVisible(false);
    },
    [setVisible, parent]
  );

  useEffect(() => {
    if (parent && parent.current && parent.current !== null)
      parent.current.addEventListener("scroll", onScroll);
    else window.addEventListener("scroll", onScroll);
    return () => {
      if (parent && parent.current && parent.current !== null)
        parent.current.removeEventListener("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll, parent]);

  const handleToTop = useCallback(() => {
    if (parent && parent.current && parent.current !== null)
      scrollTo(0, 0, parent.current);
    scrollTo(0);
  }, [parent]);

  return (
    <button
      type="button"
      name="to-top"
      aria-label={languageState.texts.ariaLabels.toTop}
      onClick={handleToTop}
      style={{
        zIndex: visible ? 10 : -1,
        transform: visible ? "scale(1)" : "scale(0)",
      }}
      className={`to-top fixed bottom-5 right-5 rounded-circle w-9 h-9 pt-1 dark:text-primary  dark:hover:bg-primary hover:bg-primary transition hover:text-white dark:hover:text-white ${className}`}
    >
      <FontAwesomeIcon className="external" icon={faArrowUp} />
    </button>
  );
};

export default ToTop;
