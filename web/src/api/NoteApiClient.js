import supabase from "../db/connection";

// auth
import { getUser } from "../utils/auth";

export class NoteApiClient {
  async get() {
    return await supabase
      .from("notes")
      .select("*")
      .eq("user", getUser().user.id);
  }

  async create(note) {
    return await supabase.from("notes").insert({ ...note });
  }

  async remove(noteId) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
    return error;
  }

  async update(note) {
    const { error } = await supabase
      .from("notes")
      .update({ ...note })
      .eq("id", note.id);
    return error;
  }
}
