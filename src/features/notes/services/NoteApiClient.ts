import type { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/shared/lib/supabase";

// models
import type { Note } from "@/features/notes/models";

export interface NoteListResult {
  items: Note[] | null;
  error: PostgrestError | null;
  status: number;
}

export interface NoteResult {
  item: Note | undefined;
  error: PostgrestError | null;
  status: number;
}

export class NoteApiClient {
  async get(id: string | undefined): Promise<NoteListResult> {
    const { data, error, status } = await supabase
      .from("notes")
      .select("*")
      .order("last_update", { ascending: false })
      .eq("user", id);
    return { items: data, error, status };
  }

  async getById(id: string): Promise<NoteResult> {
    const { data, error, status } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id);
    return { item: data?.[0], error, status };
  }

  async create(note: Note): Promise<PostgrestError | null> {
    const { error } = await supabase.from("notes").insert({ ...note });
    return error;
  }

  async remove(noteId: string): Promise<PostgrestError | null> {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
    return error;
  }

  async update(note: Note) {
    const { error, data } = await supabase
      .from("notes")
      .update({ ...note })
      .eq("id", note.id);
    return { error, data };
  }
}
