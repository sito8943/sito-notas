import supabase from "./connection";

export async function select(collection, attributes, query) {
  const { data, error } = await supabase
    .from(collection)
    .select(attributes)
    .and(query);
  return { data, error };
}
