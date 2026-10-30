import type { AppShellTemplateProps } from "./types";

/** App frame: optional sidebar, then a column with header and content */
function AppShellTemplate(props: AppShellTemplateProps) {
  const { brand, actions, navLabel, sidebar, children } = props;

  return (
    // Spans every row of the #root grid
    <div className="row-[1/-1] flex h-full min-h-0">
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
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
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

export default AppShellTemplate;
