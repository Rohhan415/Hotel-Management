import { useQuery } from "@tanstack/react-query";
import { getBooking, getBookingGuests } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
// import { getBookingGuests as getBookingGuestsApi } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // do not retry after not finding the path
  });

  const { data: bookingGuests } = useQuery({
    queryKey: ["reservation_guests", bookingId],
    queryFn: () => getBookingGuests(bookingId),
    retry: false, // do not retry after not finding the path
  });

  return { isLoading, error, booking, bookingGuests };
}
