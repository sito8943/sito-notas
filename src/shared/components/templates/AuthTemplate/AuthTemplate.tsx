import type { AuthTemplateProps } from "./types";

/** Full-screen shell that centers an auth card under a top bar */
function AuthTemplate({ brand, actions, children }: AuthTemplateProps) {
  return (
    <main className="relative w-full viewport flex items-center justify-center overflow-hidden">
      <header className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-3">
        {brand}
        {actions ? <div className="flex items-center">{actions}</div> : null}
      </header>
      {children}
    </main>
  );
}

export default AuthTemplate;
