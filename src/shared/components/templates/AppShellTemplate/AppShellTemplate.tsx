import type { AppShellTemplateProps } from "./types";
import "./styles.css";

/** App frame: optional sidebar, then a column with header and content */
function AppShellTemplate(props: AppShellTemplateProps) {
  const { brand, actions, navLabel, sidebar, children } = props;

  return (
    <div className="app-shell">
      {sidebar}
      <div className="app-shell-main">
        <header className="app-shell-header">
          <div className="app-shell-brand">{brand}</div>
          {actions ? (
            <nav aria-label={navLabel} className="app-shell-actions">
              {actions}
            </nav>
          ) : null}
        </header>
        <div className="app-shell-content">{children}</div>
      </div>
    </div>
  );
}

export default AppShellTemplate;
