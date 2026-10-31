/** Tag of a note (the API calls them categories) */
export interface NoteCategory {
  id: number;
  name: string;
  color?: string;
}

/** Note as the UI uses it. Dates are epoch milliseconds. */
export interface Note {
  id: number;
  title: string;
  content: string;
  categories: NoteCategory[];
  favorite: boolean;
  createdAt: number;
  updatedAt: number;
  /** When it was moved to the trash (only for trashed notes) */
  deletedAt?: number;
}

export interface NoteCategoryDto {
  id: number;
  name: string;
  color?: string | null;
}

/** Note as the Notes API returns it. Dates are ISO LocalDateTime (no zone). */
export interface NoteDto {
  id: number;
  title: string | null;
  content: string | null;
  categories?: NoteCategoryDto[] | null;
  favorite?: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt?: string | null;
}

export interface PageDto<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
