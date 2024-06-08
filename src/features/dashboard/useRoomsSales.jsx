import { useRooms } from "../cabins/useRooms";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { usePaidBookings } from "./useRecentSales";

export function useRoomsSales(startDate, endDate) {
  const { rooms, isLoading: isRoomsLoading } = useRooms();
  const { isLoading: isBookingsLoading, data: bookings } = usePaidBookings(
    startDate,
    endDate
  );

  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get("sortBy") || "totalSales-desc";

  const sortFunctions = {
    "totalSales-desc": (a, b) => b.totalSales - a.totalSales,
    "totalSales-asc": (a, b) => a.totalSales - b.totalSales,
    "extrasSales-desc": (a, b) => b.extrasSales - a.extrasSales,
    "extrasSales-asc": (a, b) => a.extrasSales - b.extrasSales,
    "maxPrice-desc": (a, b) => b.maxPrice - a.maxPrice,
    "maxPrice-asc": (a, b) => a.maxPrice - b.maxPrice,
  };

  if (isRoomsLoading || isBookingsLoading) return <Spinner />;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  console.log(sales, "sales");

  const rawData = rooms?.map((room) => {
    const paidBookingsForRoom = bookings.filter(
      (booking) => booking.cabinId == room.id && booking.isPaid
    );

    return {
      id: room.id,
      name: room.name,
      totalSales: paidBookingsForRoom.reduce(
        (acc, cur) => acc + cur.totalPrice,
        0
      ),
      extrasSales: paidBookingsForRoom.reduce(
        (acc, cur) => acc + cur.extrasPrice,
        0
      ),
      maxPrice: paidBookingsForRoom.reduce(
        (max, current) => (current.totalPrice > max ? current.totalPrice : max),
        0
      ),
    };
  });

  const data = [...rawData].sort(sortFunctions[sortParam]);
  console.log(rawData, "rawData");
  return { data, isLoading: false };
}
