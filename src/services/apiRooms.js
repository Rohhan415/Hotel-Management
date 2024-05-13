import supabase, { supabaseUrl } from "./supabase";

export async function createEditRoom(newRoom, id) {
  const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newRoom.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1.Create/Edit a new cabin
  let query = supabase.from("rooms");

  // a) Create a new cabin
  if (!id) query = query.insert([{ ...newRoom, image: imagePath }]);

  if (id) query = query.update({ ...newRoom, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Room could not be created");
  }

  //2. Upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoom.image);

  // 3.Delete the room IF there was an error uploading the image

  if (storageError) {
    await supabase.from("rooms").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Room could not be uploaded and the room was not created");
  }

  return data;
}

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  return data;
}

export async function deleteRoom(id) {
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Rooms could not be deleted");
  }
}
