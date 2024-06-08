import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getPaidBookingsAfterDate } from "../../services/apiBookings";

export function usePaidBookings(startDate, endDate) {
  const [searchParams] = useSearchParams();

  console.log(startDate, endDate, "startEnd");

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data } = useQuery({
    queryFn: () => getPaidBookingsAfterDate(queryDate),
    queryKey: ["isPaid", `last-${numDays}`],
  });

  console.log(data, "paiddddBookings");

  return { isLoading, data, numDays };
}
