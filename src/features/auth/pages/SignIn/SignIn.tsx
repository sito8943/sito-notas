import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// components
import { Logo } from "@/shared/components/atoms/Logo";
import { PasswordInput } from "@/shared/components/molecules/PasswordInput";
import { TextInput } from "@/shared/components/molecules/TextInput";
import { AuthScreen } from "@/shared/components/organisms/AuthScreen";

// providers
import { useAccount } from "@/features/auth/providers/AccountProvider";
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { getErrorMessage } from "@/shared/lib/errors";
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
  } = useForm<SignInForm>({ defaultValues: { email: "", password: "" } });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const response = await appApiClient.User.login(email, password);
      const data = await response.json();

      if (data.status === 404) {
        setError("email", {
          type: "server",
          message: t("_accessibility:errors.userNotFound"),
        });
        return;
      }
      if (data.status === 400 || data.status === 401) {
        setError("password", {
          type: "server",
          message: t("_accessibility:errors.invalidLoginCredentials"),
        });
        return;
      }
      if (data.user) {
        const request = await appApiClient.User.fetchUserSettings(data.user.id);
        const settings = await request.json();
        logUser(settings ? { ...data, settings } : { ...data });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast({
        message: getErrorMessage(error, t("_accessibility:errors.unknown")),
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
    </AuthScreen>
  );
}

export default SignIn;
