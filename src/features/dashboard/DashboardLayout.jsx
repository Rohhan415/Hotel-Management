import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useRooms } from "../cabins/useRooms";

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
    recentStays,
    confirmedStays,
    isLoading: isLoadingStays,
  } = useRecentStays();
  const { rooms, isLoading: isLoadingRooms } = useRooms();

  if (isLoadingRecent || isLoadingStays || isLoadingRooms) return <Spinner />;

  console.log(recentBookings, recentStays, confirmedStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        roomCount={rooms.length}
      />
      <div>Today&apos;s activity</div>
      <div>Chart stay durations</div> <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
