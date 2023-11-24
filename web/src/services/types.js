import supabase from "../db/connection";

export const fetchTypes = async () => await supabase.from("noteTypes").select();
