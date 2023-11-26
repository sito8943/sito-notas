import supabase from "../db/connection";

// auth
import { getUser } from "../utils/auth";

export const fetchNotes = async () =>
  await supabase.from("notes").select("*").eq("user", getUser().user.id);

/**
 *
 * @param {object} note
 */
export const createNote = async (note) =>
  await supabase.from("notes").insert({ ...note });

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
