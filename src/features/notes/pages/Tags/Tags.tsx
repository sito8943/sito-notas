import { useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

// @sito/ui
import { Button } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// hooks
import { useGoBack } from "@/shared/hooks";
import { useTags } from "@/features/notes/hooks/useTags";
import { useTagActions } from "@/features/notes/hooks/useTagActions";

// providers
import { useCache } from "@/features/notes/providers/CacheProvider";

// components
import { PageHeader } from "@/shared/components/molecules/PageHeader";
import { ConfirmDialog } from "@/shared/components/organisms/ConfirmDialog";
import { TagRow } from "@/features/notes/components/TagRow";

// utils
import { TAG_NAME_MAX_LENGTH } from "@/features/notes/constants";
import {
  countTagUses,
  findTagByName,
  normalizeTagName,
  pickTagColor,
} from "@/features/notes/utils";

// models
import type { NoteCategory } from "@/features/notes/models";

import "./styles.css";

/** Manage tags: create, rename, recolor and delete (removed from notes) */
function Tags() {
  const { t } = useTranslation();
  const goBack = useGoBack(AppRoute.Home);

  const { tags, isLoading } = useTags();
  const { cache } = useCache();
  const { create, update, remove } = useTagActions();

  const [newName, setNewName] = useState("");
  const [toDelete, setToDelete] = useState<NoteCategory | null>(null);

  const uses = useMemo(() => countTagUses(cache ?? []), [cache]);
  const newNameTaken = Boolean(findTagByName(tags, newName));
  const busy = create.isPending || update.isPending || remove.isPending;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const name = normalizeTagName(newName);
    if (!name || newNameTaken) return;
    create.mutate(
      { name, color: pickTagColor(tags) },
      { onSuccess: () => setNewName("") },
    );
  };

  const deleteCount = toDelete ? (uses.get(toDelete.id) ?? 0) : 0;

  return (
    <main className="tags">
      <PageHeader
        crumbs={[
          { label: t("_pages:note.notes"), to: AppRoute.Home },
          { label: t("_pages:routes.tags") },
        ]}
        onBack={goBack}
        backLabel={t("_accessibility:buttons.back")}
        navLabel={t("_pages:note.breadcrumb")}
      />
      <div className="tags-content">
        <header className="tags-heading">
          <h1 className="tags-title">{t("_pages:routes.tags")}</h1>
          <p className="tags-description">{t("_pages:tags.description")}</p>
        </header>

        <form onSubmit={submit} className="tags-form">
          <input
            value={newName}
            maxLength={TAG_NAME_MAX_LENGTH}
            onChange={(event) => setNewName(event.target.value)}
            placeholder={t("_pages:tags.newPlaceholder")}
            aria-label={t("_pages:tags.newLabel")}
            aria-invalid={newNameTaken}
            className={`tags-form-input ${newNameTaken ? "invalid" : ""}`}
          />
          <Button
            type="submit"
            variant="submit"
            color="primary"
            disabled={!normalizeTagName(newName) || newNameTaken || busy}
            aria-label={t("_pages:tags.createButton")}
            className="tags-form-submit"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="tags-form-submit-label">
              {t("_pages:tags.createButton")}
            </span>
          </Button>
        </form>
        {newNameTaken ? (
          <p className="tags-form-error">{t("_pages:tags.errors.exists")}</p>
        ) : null}

        {isLoading ? (
          <div className="tags-list">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="tags-skeleton skeleton-box" />
            ))}
          </div>
        ) : tags.length === 0 ? (
          <div className="tags-empty">
            <FontAwesomeIcon icon={faTags} className="tags-empty-icon" />
            <p>{t("_pages:tags.emptyState")}</p>
          </div>
        ) : (
          <ul className="tags-list">
            {tags.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
                count={uses.get(tag.id) ?? 0}
                disabled={remove.isPending}
                isNameTaken={(name) =>
                  Boolean(findTagByName(tags, name, tag.id))
                }
                onRename={(name) =>
                  update.mutate({ id: tag.id, name, color: tag.color })
                }
                onRecolor={(color) =>
                  update.mutate({ id: tag.id, name: tag.name, color })
                }
                onDelete={() => setToDelete(tag)}
              />
            ))}
          </ul>
        )}
      </div>
      <ConfirmDialog
        open={toDelete !== null}
        title={t("_pages:tags.confirmDelete.title", { name: toDelete?.name })}
        description={t("_pages:tags.confirmDelete.description", {
          count: deleteCount,
        })}
        confirmText={t("_pages:tags.delete")}
        cancelText={t("_pages:trash.confirm.cancel")}
        closeLabel={t("_accessibility:buttons.close")}
        onConfirm={() =>
          toDelete &&
          remove.mutate([toDelete.id], { onSettled: () => setToDelete(null) })
        }
        onClose={() => setToDelete(null)}
        isLoading={remove.isPending}
        danger
      />
    </main>
  );
}

export default Tags;
