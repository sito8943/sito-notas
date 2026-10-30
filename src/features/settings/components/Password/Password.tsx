import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// components
import { PasswordInput } from "@/shared/components/molecules/PasswordInput";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { getErrorMessage } from "@/shared/lib/errors";
import { isHttpError } from "@/shared/lib/http";
import { AppRoute } from "@/shared/routes";

// features
import { MIN_PASSWORD_LENGTH } from "@/features/auth";

import { CHANGE_PASSWORD_DEFAULTS, SIGN_OUT_DELAY_MS } from "./constants";
import type { ChangePasswordForm } from "./types";

import "./styles.css";

/**
 * Security section: changes the password. sito-auth revokes every session
 * afterwards, so the user signs in again.
 */
function Password() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const appApiClient = useAppApiClient();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>({ defaultValues: CHANGE_PASSWORD_DEFAULTS });

  const onSubmit = handleSubmit(async ({ currentPassword, password }) => {
    try {
      await appApiClient.User.changePassword(currentPassword, password);
      reset();
      toast({
        message: t("_pages:settings.sections.security.updated"),
        color: "success",
      });
      setTimeout(() => navigate(AppRoute.SignOut), SIGN_OUT_DELAY_MS);
    } catch (err) {
      if (isHttpError(err, 401)) {
        setError("currentPassword", {
          type: "server",
          message: t("_accessibility:errors.wrongCurrentPassword"),
        });
        return;
      }
      console.error(err);
      toast({
        message: getErrorMessage(err, t("_accessibility:errors.unknown")),
        color: "error",
      });
    }
  });

  return (
    <section className="password">
      <form
        onSubmit={(event) => void onSubmit(event)}
        className="password-form"
      >
        <h3 className="password-title">
          {t("_pages:settings.sections.security.title")}
        </h3>
        <PasswordInput
          autoComplete="current-password"
          label={t("_accessibility:inputs.currentPassword.label")}
          required
          disabled={isSubmitting}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          {...register("currentPassword", {
            required: t("_accessibility:errors.passwordRequired"),
          })}
        />
        <PasswordInput
          autoComplete="new-password"
          label={t("_accessibility:inputs.password.label")}
          required
          disabled={isSubmitting}
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: t("_accessibility:errors.passwordRequired"),
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: t("_accessibility:errors.passwordTooShort"),
            },
          })}
        />
        <PasswordInput
          autoComplete="new-password"
          label={t("_accessibility:inputs.rPassword")}
          required
          disabled={isSubmitting}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: t("_accessibility:errors.passwordRequired"),
            validate: (value, values) =>
              value === values.password ||
              t("_accessibility:errors.passwordsDoNotMatch"),
          })}
        />
        <Button
          type="submit"
          variant="submit"
          color="primary"
          loading={isSubmitting}
        >
          {t("_accessibility:buttons.save")}
        </Button>
      </form>
    </section>
  );
}

export default Password;
