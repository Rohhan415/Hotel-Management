import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout(){
  const {bookings, isLoading: isLoading1} = useRecentBookings();
  
  const {isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  
  const {cabins, isLoading: isLoading3} = useCabins();
  
  if(isLoading1 || isLoading2 || isLoading3) return <Spinner/>
  
    return(
      <StyledDashboardLayout>
       <Stats 
         bookings={bookings} 
         confirmedStays={confirmedStays}
         numDays={numDays} 
         cabinCount={cabins.length}/>
         <div>Today Activity</div>
         <DurationChart confirmedStays={confirmedStays}/>
         <SalesChart 
           bookings={bookings} 
           numDays={numDays} 
           />
      </StyledDashboardLayout>
    );
  }
  
  export default DashboardLayout;