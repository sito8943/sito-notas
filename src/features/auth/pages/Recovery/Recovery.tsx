import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { createCookie } from "some-javascript-utils/browser";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// components
import { TextInput } from "@/shared/components/molecules/TextInput";
import { AuthScreen } from "@/shared/components/organisms/AuthScreen";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { RECOVERING_COOKIE } from "@/features/auth/constants";
import { getErrorMessage } from "@/shared/lib/errors";
import { AppRoute } from "@/shared/routes";

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
      const response = await appApiClient.User.recovery(email);
      const data = await response.json();
      if (data.status && data.status !== 200) {
        toast({
          message: data.message ?? t("_accessibility:errors.unknown"),
          color: "error",
        });
        return;
      }
      toast({ message: t("_pages:auth.recovery.sent"), color: "success" });
      createCookie(RECOVERING_COOKIE, 1, email);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast({
        message: getErrorMessage(err, t("_accessibility:errors.unknown")),
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
