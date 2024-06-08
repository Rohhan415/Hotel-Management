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

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const StyledFullWidthElement = styled.div`
  grid-column: 1 / -1; // This will make the element span the full width of the grid
`;

function DashboardLayout() {
  const { recentBookings, isLoading: isLoadingRecent } = useRecentBookings();
  const {
    numDays,
    confirmedStays,
    isLoading: isLoadingStays,
  } = useRecentStays();
  const { rooms, isLoading: isLoadingRooms } = useRooms();

  if (isLoadingRecent || isLoadingStays || isLoadingRooms) return <Spinner />;

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
      <StyledFullWidthElement>
        <RaportTable />
      </StyledFullWidthElement>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
