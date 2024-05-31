import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useRooms } from "../cabins/useRooms";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import RaportTable from "./RaportTable";
import { useRoomsSales } from "./useRoomsSales";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoading: isLoadingRecent } = useRecentBookings();
  const {
    numDays,
    confirmedStays,
    isLoading: isLoadingStays,
  } = useRecentStays();
  const { rooms, isLoading: isLoadingRooms } = useRooms();
  const {data, isLoading: isLoadingRoomsSales} = useRoomsSales();

  if (isLoadingRecent || isLoadingStays || isLoadingRooms || isLoadingRoomsSales) return <Spinner />;

  return (

    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        roomCount={rooms.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
      <RaportTable data={data}/>
    </StyledDashboardLayout>


  );
}

export default DashboardLayout;
