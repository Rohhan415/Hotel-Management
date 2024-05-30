import supabase from "./supabase";

export async function getRoles() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  const { data: roleData, error: roleError } = await supabase
    .from("user_role")
    .select("*")
    .eq("id", data.user.id);

  const role = roleData?.[0];

  if (roleError) {
    console.error(error);
    throw new Error("Roles could not be loaded");
  }

  if (error) {
    throw new Error(error.message);
  }
  return { role };
}
