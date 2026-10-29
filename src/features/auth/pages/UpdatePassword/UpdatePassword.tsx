import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { deleteCookie } from "some-javascript-utils/browser";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// components
import { Logo } from "@/shared/components/atoms/Logo";
import { PasswordInput } from "@/shared/components/molecules/PasswordInput";
import { AuthScreen } from "@/shared/components/organisms/AuthScreen";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { RECOVERING_COOKIE } from "@/features/auth/constants";
import { getErrorMessage } from "@/shared/lib/errors";
import { AppRoute } from "@/shared/routes";

import { SIGN_OUT_DELAY_MS } from "./constants";
import type { UpdatePasswordForm } from "./types";

/**
 * UpdatePassword page: sets a new password after a recovery email
 */
function UpdatePassword() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const appApiClient = useAppApiClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(async ({ password }) => {
    try {
      const { error } = await appApiClient.User.updatePassword(password);
      if (error) throw error;

      toast({
        message: t("_pages:auth.updatePassword.sent"),
        color: "success",
      });
      deleteCookie(RECOVERING_COOKIE);
      setTimeout(() => navigate(AppRoute.SignOut), SIGN_OUT_DELAY_MS);
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
      title={t("_pages:auth.updatePassword.title")}
      logo={<Logo />}
      backTo={AppRoute.Auth}
      backLabel={t("_accessibility:buttons.back")}
      onSubmit={(event) => void onSubmit(event)}
      helperLinks={
        <p className="auth-screen-helper-text">
          {t("_pages:auth.updatePassword.toSignIn.question")}
          <Link to={AppRoute.Auth} className="auth-screen-helper-link">
            {t("_pages:auth.updatePassword.toSignIn.link")}
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
          {t("_pages:auth.updatePassword.submit")}
        </Button>
      }
    >
      <PasswordInput
        autoComplete="new-password"
        label={t("_accessibility:inputs.password.label")}
        required
        disabled={isSubmitting}
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password", {
          required: t("_accessibility:errors.passwordRequired"),
        })}
      />
      <PasswordInput
        autoComplete="new-password"
        label={t("_accessibility:inputs.confirmPassword.label")}
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
    </AuthScreen>
  );
}

export default UpdatePassword;
