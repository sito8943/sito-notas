import type { ReactNode } from "react";

// shared
import {
  ApiClientProvider,
  NotificationsProvider,
  SidebarProvider,
  ThemeProvider,
} from "@/shared/providers";

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
            <NotificationsProvider>
              <SearchProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </SearchProvider>
            </NotificationsProvider>
          </CacheProvider>
        </AccountProvider>
      </ApiClientProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
