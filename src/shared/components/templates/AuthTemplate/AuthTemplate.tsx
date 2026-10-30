import type { AuthTemplateProps } from "./types";
import "./styles.css";

/** Full-screen shell that centers an auth card, with an optional top bar */
function AuthTemplate({ brand, actions, children }: AuthTemplateProps) {
  return (
    <main className="auth-template viewport">
      {brand || actions ? (
        <header className="auth-template-header">
          <div>{brand}</div>
          {actions ? (
            <div className="auth-template-actions">{actions}</div>
          ) : null}
        </header>
      ) : null}
      {children}
    </main>
  );
}

export default AuthTemplate;
