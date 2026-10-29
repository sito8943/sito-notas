import { Link } from "react-router-dom";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

import type { AuthScreenProps } from "./types";

import "./styles.css";

/**
 * Auth form card: logo, title with optional back arrow, fields, helper
 * links and actions, revealed with a staggered entrance.
 */
function AuthScreen(props: AuthScreenProps) {
  const {
    title,
    logo,
    backTo,
    backLabel,
    children,
    helperLinks,
    actions,
    onSubmit,
  } = props;

  return (
    <form noValidate onSubmit={onSubmit} className="auth-screen">
      <div className="auth-screen-header auth-screen-block">
        {logo}
        <div className="auth-screen-heading">
          {backTo ? (
            <IconButton
              as={Link}
              to={backTo}
              size="sm"
              aria-label={backLabel ?? ""}
              icon={<FontAwesomeIcon icon={faArrowLeft} />}
              className="auth-screen-back"
            />
          ) : null}
          <h1 className="auth-screen-title">{title}</h1>
        </div>
      </div>

      <div className="auth-screen-content auth-screen-block">
        <div className="auth-screen-fields">{children}</div>
        {helperLinks ? (
          <div className="auth-screen-helper-links">{helperLinks}</div>
        ) : null}
      </div>

      <div className="auth-screen-actions auth-screen-block">{actions}</div>
    </form>
  );
}

export default AuthScreen;
