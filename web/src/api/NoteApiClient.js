import supabase from "../db/connection";

export class NoteApiClient {
  async get(id) {
    const { data, error, status } = await supabase
      .from("notes")
      .select("*")
      .eq("user", id);
    return { items: data, error, status };
  }

  async getById(id) {
    const { data, error, status } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id);
    return { item: data[0], error, status };
  }

  async create(note) {
    const { error } = await supabase.from("notes").insert({ ...note });
    return error;
  }

  async remove(noteId) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
    return error;
  }

  async update(note) {
    const { error, data } = await supabase
      .from("notes")
      .update({ ...note })
      .eq("id", note.id);
    return { error, data };
  }
}
