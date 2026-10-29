import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// components
import { TextInput } from "@/shared/components/molecules/TextInput";
import { AuthScreen } from "@/shared/components/organisms/AuthScreen";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { getErrorMessage } from "@/shared/lib/errors";
import { isHttpError, NETWORK_ERROR_STATUS } from "@/shared/lib/http";
import { AppRoute, getAbsoluteRoute } from "@/shared/routes";

import type { RecoveryForm } from "./types";

/**
 * Recovery page: sends the reset-password email
 */
function Recovery() {
  const { t } = useTranslation();
  const toast = useToast();

  const appApiClient = useAppApiClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoveryForm>({ defaultValues: { email: "" } });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await appApiClient.User.forgotPassword(
        email,
        getAbsoluteRoute(AppRoute.UpdatePassword),
      );
      toast({ message: t("_pages:auth.recovery.sent"), color: "success" });
    } catch (err) {
      console.error(err);
      toast({
        message: isHttpError(err, NETWORK_ERROR_STATUS)
          ? t("_accessibility:errors.failedToFetch")
          : getErrorMessage(err, t("_accessibility:errors.unknown")),
        color: "error",
      });
    }
  });

  return (
    <AuthScreen
      title={t("_pages:auth.recovery.title")}
      backTo={AppRoute.Auth}
      backLabel={t("_accessibility:buttons.back")}
      onSubmit={(event) => void onSubmit(event)}
      helperLinks={
        <p className="auth-screen-helper-text">
          {t("_pages:auth.recovery.toSignIn.question")}
          <Link to={AppRoute.Auth} className="auth-screen-helper-link">
            {t("_pages:auth.recovery.toSignIn.link")}
          </Link>
        </p>
      }
      actions={
        <Button
          type="submit"
          variant="submit"
          color="primary"
          loading={isSubmitting}
          className="px-8"
        >
          {t("_pages:auth.recovery.submit")}
        </Button>
      }
    >
      <TextInput
        type="email"
        autoComplete="email"
        label={t("_accessibility:inputs.email.label")}
        required
        disabled={isSubmitting}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email", {
          required: t("_accessibility:errors.emailRequired"),
        })}
      />
    </AuthScreen>
  );
}

export default Recovery;
