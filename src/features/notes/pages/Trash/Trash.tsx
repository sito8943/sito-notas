import { useState } from "react";
import { useTranslation } from "react-i18next";

// @sito/ui
import { Button } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// hooks
import { useGoBack } from "@/shared/hooks";

// components
import { PageHeader } from "@/shared/components/molecules/PageHeader";
import { ConfirmDialog } from "@/shared/components/organisms/ConfirmDialog";
import { TrashNote } from "@/features/notes/components/TrashNote";

// hooks
import { useTrash } from "@/features/notes/hooks/useTrash";

// constants
import { TRASH_RETENTION_DAYS } from "@/features/notes/constants";

import "./styles.css";

/** Trashed notes: restore them or delete them for good */
function Trash() {
  const { t } = useTranslation();

  const { notes, isLoading, restore, removePermanently } = useTrash();
  const goBack = useGoBack(AppRoute.Home);

  // Notes waiting for the user to confirm the delete for good
  const [toDelete, setToDelete] = useState<number[] | null>(null);
  const emptying = toDelete !== null && toDelete.length > 1;

  const busy = restore.isPending || removePermanently.isPending;

  const confirmDelete = () => {
    if (!toDelete) return;
    removePermanently.mutate(toDelete, {
      onSettled: () => setToDelete(null),
    });
  };

  return (
    <main className="trash">
      <PageHeader
        crumbs={[
          { label: t("_pages:note.notes"), to: AppRoute.Home },
          { label: t("_pages:trash.title") },
        ]}
        onBack={goBack}
        backLabel={t("_accessibility:buttons.back")}
        navLabel={t("_pages:note.breadcrumb")}
      />
      <div className="trash-content">
        <header className="trash-header">
          <div className="trash-heading">
            <h1 className="trash-title">{t("_pages:trash.title")}</h1>
            <p className="trash-description">
              {t("_pages:trash.description", { days: TRASH_RETENTION_DAYS })}
            </p>
          </div>
          {notes.length > 1 ? (
            <Button
              variant="outlined"
              color="error"
              disabled={busy}
              onClick={() => setToDelete(notes.map((note) => note.id))}
            >
              {t("_pages:trash.empty")}
            </Button>
          ) : null}
        </header>

        {isLoading ? (
          <section className="trash-list">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="trash-skeleton skeleton-box" />
            ))}
          </section>
        ) : notes.length === 0 ? (
          <div className="trash-empty">
            <FontAwesomeIcon icon={faTrashCan} className="trash-empty-icon" />
            <p>{t("_pages:trash.emptyState")}</p>
          </div>
        ) : (
          <section className="trash-list">
            {notes.map((note) => (
              <TrashNote
                key={note.id}
                note={note}
                onRestore={(id) => restore.mutate([id])}
                onDelete={(id) => setToDelete([id])}
                disabled={busy}
              />
            ))}
          </section>
        )}
      </div>

      <ConfirmDialog
        open={toDelete !== null}
        title={
          emptying
            ? t("_pages:trash.confirmEmpty.title")
            : t("_pages:trash.confirmDelete.title")
        }
        description={
          emptying
            ? t("_pages:trash.confirmEmpty.description", {
                count: toDelete.length,
              })
            : t("_pages:trash.confirmDelete.description")
        }
        confirmText={
          emptying ? t("_pages:trash.empty") : t("_pages:trash.deleteForever")
        }
        cancelText={t("_pages:trash.confirm.cancel")}
        closeLabel={t("_accessibility:buttons.close")}
        onConfirm={confirmDelete}
        onClose={() => setToDelete(null)}
        isLoading={removePermanently.isPending}
        danger
      />
    </main>
  );
}

export default Trash;
