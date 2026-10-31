import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// hooks
import { useGoBack } from "@/shared/hooks";
import { useSharedNotes } from "@/features/notes/hooks/useSharedNotes";

// components
import { PageHeader } from "@/shared/components/molecules/PageHeader";
import { SharedNote } from "@/features/notes/components/SharedNote";

import "./styles.css";

/** Notes other users shared with the user (read only) */
function Shared() {
  const { t } = useTranslation();
  const goBack = useGoBack(AppRoute.Home);
  const { notes, isLoading, isError } = useSharedNotes();

  return (
    <main className="shared">
      <PageHeader
        crumbs={[
          { label: t("_pages:note.notes"), to: AppRoute.Home },
          { label: t("_pages:routes.shared") },
        ]}
        onBack={goBack}
        backLabel={t("_accessibility:buttons.back")}
        navLabel={t("_pages:note.breadcrumb")}
      />
      <div className="shared-content">
        <header className="shared-heading">
          <h1 className="shared-title">{t("_pages:routes.shared")}</h1>
          <p className="shared-description">{t("_pages:shared.description")}</p>
        </header>

        {isLoading ? (
          <section className="shared-list">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="shared-skeleton skeleton-box" />
            ))}
          </section>
        ) : isError ? (
          <p className="shared-error">{t("_accessibility:errors.unknown")}</p>
        ) : notes.length === 0 ? (
          <div className="shared-empty">
            <FontAwesomeIcon icon={faUserGroup} className="shared-empty-icon" />
            <p>{t("_pages:shared.emptyState")}</p>
          </div>
        ) : (
          <section className="shared-list">
            {notes.map((note) => (
              <SharedNote key={note.id} note={note} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Shared;
