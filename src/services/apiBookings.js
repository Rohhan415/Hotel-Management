import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  // SELECT id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, rooms.name, guests.fullName, guests.email
  // FROM bookings;
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, rooms(name), guests!bookings_guestId_fkey(fullName, email), userID",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  //SELECT *, rooms.*, guests.*
  // FROM bookings
  // WHERE id = ...
  // LIMIT 1;

  const { data, error } = await supabase
    .from("bookings")
    .select("*, rooms(*), guests!bookings_guestId_fkey(*) ")
    .eq("id", id)
    .single();

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingGuests(id) {
  const { data, error } = await supabase
    .from("reservation_guests")
    .select("*, guests(*)")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function updateBooking(id, obj) {
  //UPDATE bookings
  // SET ...
  // WHERE id = ...
  // RETURNING *;
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  //DELETE FROM bookings WHERE id = ...;

  // Delete referenced records in reservation_guests
  const { error: deleteGuestError } = await supabase
    .from("reservation_guests")
    .delete()
    .eq("id", id); // Assuming 'booking_id' is the foreign key in reservation_guests

  if (deleteGuestError) {
    console.error(
      "Error deleting referenced reservation_guests records:",
      deleteGuestError
    );
    throw new Error("Could not delete referenced reservation_guests records");
  }

  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, guests!bookings_guestId_fkey(fullName, nationality, countryFlag)"
    )
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .select(`*, guests!bookings_guestId_fkey(fullName)`)
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice, cabinId")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
