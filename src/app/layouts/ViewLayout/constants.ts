import { AppRoute } from "@/shared/routes";

/** Routes whose page renders its own PageHeader instead of the app header */
export const PAGE_HEADER_ROUTES: AppRoute[] = [AppRoute.Note, AppRoute.Trash];
