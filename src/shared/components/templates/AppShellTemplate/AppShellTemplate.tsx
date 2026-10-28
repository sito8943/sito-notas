import type { AppShellTemplateProps } from "./types";

/** App frame: header row (fills the `auto` row of #root) followed by content */
function AppShellTemplate(props: AppShellTemplateProps) {
  const { brand, actions, navLabel, children } = props;

  return (
    <>
      <header className="w-full px-10 sm:px-3">
        <div className="flex w-full items-center justify-between py-3">
          <div className="flex items-center gap-3">{brand}</div>
          {actions ? (
            <nav aria-label={navLabel} className="flex items-center">
              {actions}
            </nav>
          ) : null}
        </div>
      </header>
      {children}
    </>
  );
}

export default AppShellTemplate;
