import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

// @sito/ui
import { DIALOG_INITIAL_FOCUS, Dialog, DialogActions } from "@sito/ui";

// components
import { TextInput } from "@/shared/components/molecules/TextInput";

import type { LinkDialogProps } from "./types";
import { isSafeLinkUrl, normalizeLinkUrl } from "./utils";
import "./styles.css";

/**
 * Adds, edits or removes the link at the cursor. With no selection the URL
 * is inserted as the link text.
 */
function LinkDialog(props: LinkDialogProps) {
  const { editor, open, initialUrl, onClose } = props;

  const { t } = useTranslation();
  const [url, setUrl] = useState(initialUrl);
  const [invalid, setInvalid] = useState(false);

  // Each opening starts from the link at the cursor
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setUrl(initialUrl);
      setInvalid(false);
    }
  }

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const href = normalizeLinkUrl(url);
    if (!href) {
      removeLink();
      return;
    }
    if (!isSafeLinkUrl(href)) {
      setInvalid(true);
      return;
    }
    const chain = editor.chain().focus().extendMarkRange("link");
    if (editor.state.selection.empty && !initialUrl)
      chain
        .insertContent({
          type: "text",
          text: href,
          marks: [{ type: "link", attrs: { href } }],
        })
        .run();
    else chain.setLink({ href }).run();
    onClose();
  };

  return (
    <Dialog
      open={open}
      title={t("_pages:note.link.title")}
      onClose={onClose}
      onSubmit={submit}
      initialFocus={DIALOG_INITIAL_FOCUS.FIRST_INPUT}
      closeLabel={t("_accessibility:buttons.close")}
    >
      <TextInput
        label={t("_pages:note.link.url")}
        type="url"
        inputMode="url"
        value={url}
        onChange={(event) => {
          setUrl(event.target.value);
          setInvalid(false);
        }}
        placeholder="https://"
        error={invalid}
        helperText={invalid ? t("_pages:note.link.invalid") : undefined}
        containerClassName="link-dialog-field"
      />
      <DialogActions
        alignEnd
        primaryType="submit"
        primaryText={t("_pages:note.link.apply")}
        cancelText={t("_pages:note.link.cancel")}
        onCancel={onClose}
        primaryProps={{ color: "primary", variant: "submit" }}
        extraActions={
          initialUrl
            ? [
                {
                  id: "remove-link",
                  children: t("_pages:note.link.remove"),
                  color: "error",
                  onClick: removeLink,
                },
              ]
            : undefined
        }
      />
    </Dialog>
  );
}

export default LinkDialog;
