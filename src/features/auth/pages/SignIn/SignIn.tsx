import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// components
import { Checkbox } from "@/shared/components/atoms/Checkbox";
import { Logo } from "@/shared/components/atoms/Logo";
import { PasswordInput } from "@/shared/components/molecules/PasswordInput";
import { TextInput } from "@/shared/components/molecules/TextInput";
import { AuthScreen } from "@/shared/components/organisms/AuthScreen";

// providers
import { useAccount } from "@/features/auth/providers/AccountProvider";
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { getErrorMessage } from "@/shared/lib/errors";
import { isHttpError, NETWORK_ERROR_STATUS } from "@/shared/lib/http";
import { AppRoute } from "@/shared/routes";

import type { SignInForm } from "./types";

function SignIn() {
  const { t } = useTranslation();
  const toast = useToast();

  const { logUser } = useAccount();
  const appApiClient = useAppApiClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = handleSubmit(async ({ email, password, rememberMe }) => {
    try {
      logUser(await appApiClient.User.signIn(email, password, rememberMe));
    } catch (error) {
      if (isHttpError(error, 401)) {
        setError("password", {
          type: "server",
          message: t("_accessibility:errors.invalidLoginCredentials"),
        });
        return;
      }
      if (isHttpError(error, 404)) {
        setError("email", {
          type: "server",
          message: t("_accessibility:errors.userNotFound"),
        });
        return;
      }
      console.error(error);
      toast({
        message: isHttpError(error, NETWORK_ERROR_STATUS)
          ? t("_accessibility:errors.failedToFetch")
          : getErrorMessage(error, t("_accessibility:errors.unknown")),
        color: "error",
      });
    }
  });

  return (
    <AuthScreen
      title={t("_pages:auth.signIn.title")}
      logo={<Logo />}
      onSubmit={(event) => void onSubmit(event)}
      helperLinks={
        <p className="auth-screen-helper-text">
          {t("_pages:auth.signIn.recovery.question")}
          <Link to={AppRoute.Recovery} className="auth-screen-helper-link">
            {t("_pages:auth.signIn.recovery.link")}
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
          {t("_pages:auth.signIn.submit")}
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
      <PasswordInput
        autoComplete="current-password"
        label={t("_accessibility:inputs.password.label")}
        required
        disabled={isSubmitting}
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password", {
          required: t("_accessibility:errors.passwordRequired"),
        })}
      />
      <Checkbox
        label={t("_accessibility:inputs.remember.label")}
        disabled={isSubmitting}
        {...register("rememberMe")}
      />
    </AuthScreen>
  );
}

export default SignIn;
