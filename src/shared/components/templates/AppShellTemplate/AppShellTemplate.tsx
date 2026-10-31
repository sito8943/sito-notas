import type { AppShellTemplateProps } from "./types";
import "./styles.css";

/** App frame: optional sidebar, a column with header and content, and an optional bottom navigation */
function AppShellTemplate(props: AppShellTemplateProps) {
  const {
    brand,
    actions,
    hideHeader = false,
    navLabel,
    sidebar,
    bottomNavigation,
    children,
  } = props;

  return (
    <div className="app-shell">
      {sidebar}
      <div className="app-shell-main">
        {hideHeader ? null : (
          <header className="app-shell-header">
            <div className="app-shell-brand">{brand}</div>
            {actions ? (
              <nav aria-label={navLabel} className="app-shell-actions">
                {actions}
              </nav>
            ) : null}
          </header>
        )}
        <div className="app-shell-content">{children}</div>
      </div>
      {bottomNavigation}
    </div>
  );
}

export default AppShellTemplate;
