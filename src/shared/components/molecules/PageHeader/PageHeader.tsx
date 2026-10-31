import { Fragment } from "react";
import { Link } from "react-router-dom";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import type { PageHeaderProps } from "./types";
import "./styles.css";

/** Top bar of inner pages: back, breadcrumb and page actions */
function PageHeader(props: PageHeaderProps) {
  const { crumbs, onBack, backLabel, navLabel, actions } = props;

  return (
    <header className="page-header">
      <Tooltip label={backLabel} align="start">
        <IconButton
          size={ICON_BUTTON_SIZES.SM}
          aria-label={backLabel}
          onClick={onBack}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          className="page-header-back"
        />
      </Tooltip>
      <nav aria-label={navLabel} className="page-header-nav">
        <ol className="page-header-crumbs">
          {crumbs.map((crumb, index) => (
            <Fragment key={`${index}-${crumb.label}`}>
              {index > 0 ? (
                <li aria-hidden="true" className="page-header-separator">
                  <FontAwesomeIcon icon={faChevronRight} />
                </li>
              ) : null}
              {crumb.to ? (
                <li className="page-header-crumb">
                  <Link to={crumb.to} className="page-header-crumb-link">
                    {crumb.label}
                  </Link>
                </li>
              ) : (
                <li aria-current="page" className="page-header-crumb current">
                  {crumb.label}
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </nav>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </header>
  );
}

export default PageHeader;
