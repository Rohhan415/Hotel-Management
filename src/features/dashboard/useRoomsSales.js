import { useQuery } from "@tanstack/react-query";
import { useRooms } from "../cabins/useRooms";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";


export function useRoomsSales(){
    const {rooms, isLoading: isRoomsLoading} = useRooms();

    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

    
    const sortParam = searchParams.get("sortBy") || "totalSales-desc";

    const sortFunctions = {
      "totalSales-desc": (a, b) => b.totalSales - a.totalSales,
      "totalSales-asc": (a, b) => a.totalSales - b.totalSales,
      "extrasSales-desc": (a, b) => b.extrasSales - a.extrasSales,
      "extrasSales-asc": (a, b) => a.extrasSales - b.extrasSales,
      "maxPrice-desc": (a, b) => b.maxPrice - a.maxPrice,
      "maxPrice-asc": (a, b) => a.maxPrice - b.maxPrice,
    };
    
    const queryDate = subDays(new Date(), numDays).toISOString();
    
    const { isLoading: isBookingsLoading, data: bookings } = useQuery({
       queryFn: () => getBookingsAfterDate(queryDate),
       queryKey: ["bookings", `last-${numDays}`],
    });

    if(isRoomsLoading || isBookingsLoading) return {data: [], isLoading: true};
    
    const rawData = rooms.map((room) => {
        return {
          id: room.id,
          name: room.name,
          totalSales: bookings
            .filter((booking) => {return booking.cabinId == room.id})
            .reduce((acc, cur) => acc + cur.totalPrice, 0),
          extrasSales: bookings
            .filter((booking) => {return booking.cabinId == room.id})
            .reduce((acc, cur) => acc + cur.extrasPrice, 0),
          maxPrice: bookings
          .filter((booking) => {return booking.cabinId == room.id})
          .reduce((max, current) => (current.totalPrice > max ? current.totalPrice : max), 0),
        };
      });

      const data = [...rawData].sort(sortFunctions[sortParam]);

      return {data, isLoading: false};
}