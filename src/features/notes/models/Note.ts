export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: number;
  last_update: number;
  user?: string;
}
