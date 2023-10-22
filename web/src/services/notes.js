import supabase from "../db/connection";

export const fetchNotes = async () => {
  const userData = await supabase.auth.getUser();
  const { user } = userData.data;
  return await supabase.from("notes").select("*").eq("user", user.id);
};

/**
 *
 * @param {object} note
 */
export const createNote = async (note) => {
  const { error } = await supabase.from("notes").insert({ ...note });
  return error;
};

/**
 *
 * @param {string} noteId
 */
export const removeNote = async (noteId) => {
  const { error } = await supabase.from("notes").delete().eq("id", noteId);
  return error;
};

/**
 *
 * @param {object} note
 */
export const updateNote = async (note) => {
  const { error } = await supabase
    .from("notes")
    .update({ content: note.content, last_update: new Date().getTime() })
    .eq("id", note.id);
  return error;
};
