/** Note as the UI uses it. Dates are epoch milliseconds. */
export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
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
