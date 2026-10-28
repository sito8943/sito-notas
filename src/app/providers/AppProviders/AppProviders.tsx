import type { ReactNode } from "react";
import { ToastProvider } from "@sito/ui";

// shared
import { ApiClientProvider, ThemeProvider } from "@/shared/providers";

// features
import { AccountProvider } from "@/features/auth";
import { CacheProvider, SearchProvider } from "@/features/notes";

// api
import { AppApiClient } from "@/app/api";

const appApiClient = new AppApiClient();

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ApiClientProvider client={appApiClient}>
        <AccountProvider>
          <CacheProvider>
            <ToastProvider placement="bottom-right">
              <SearchProvider>{children}</SearchProvider>
            </ToastProvider>
          </CacheProvider>
        </AccountProvider>
      </ApiClientProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
