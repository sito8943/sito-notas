export class NoteTypeApiClient {
  async get() {
    return await supabase.from("noteTypes").select();
  }
}
