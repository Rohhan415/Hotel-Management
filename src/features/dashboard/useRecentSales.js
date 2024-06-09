import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getPaidBookingsAfterDate } from "../../services/apiBookings";

export function usePaidBookings(startDate, endDate) {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const queryStartDate = new Date(startDate).toISOString();
  const queryEndDate = new Date(endDate).toISOString();

  const { isLoading, data } = useQuery({
    queryFn: () =>
      getPaidBookingsAfterDate(
        startDate && endDate ? { queryStartDate, queryEndDate } : queryDate
      ),
    queryKey:
      startDate && endDate
        ? ["isPaid", startDate, endDate]
        : ["isPaid", `last-${numDays}`],
  });

  return { isLoading, data, numDays };
}
