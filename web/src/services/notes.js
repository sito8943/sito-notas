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
  console.log(noteId);
  const { error } = await supabase.from("notes").delete().eq("id", noteId);
  return error;
};
