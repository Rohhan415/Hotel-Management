import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import RaportTable from "./RaportTable";
import { useRoomsSales } from "./useRoomsSales";
import { isValid, parseISO, subDays } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TotalSales from "./TotalSales";
import { useState } from "react";
import Button from "../../ui/Button";
import { useQueryClient } from "@tanstack/react-query";

const StyledFullWidthElement = styled.div`
  grid-column: 1 / -1; // This will make the element span the full width of the grid
`;

const StyledDates = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: flex-end;
`;

const StyledInput = styled.input`
  font-size: 1.4rem;
  padding: 0.2rem 1.2rem;
  margin-left: 0.4rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
`;

const StyledSelect = styled.label`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
`;
const Disclaimer = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;

function SalesLayout() {
  const { isLoading: isLoadingRecent } = useRecentBookings();
  const { numDays, isLoading: isLoadingStays } = useRecentStays();
  const queryClient = useQueryClient();

  const initialEndDate = new Date().toISOString().split("T")[0];
  const initialStartDate = subDays(new Date(), numDays)
    .toISOString()
    .split("T")[0];

  const { control, watch, setError, clearErrors } = useForm({
    defaultValues: {
      startDate: initialStartDate,
      endDate: initialEndDate,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // State to keep track of confirmed dates
  const [confirmedStartDate, setConfirmedStartDate] =
    useState(initialStartDate);
  const [confirmedEndDate, setConfirmedEndDate] = useState(initialEndDate);

  const { data: RoomSales, isRoomsLoading } = useRoomsSales(
    confirmedStartDate,
    confirmedEndDate
  );

  const handleConfirmDates = () => {
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
      toast.error("Please select valid dates.");
      return;
    }

    if (parsedStartDate > parsedEndDate) {
      setError("startDate", {
        type: "manual",
        message: "Start date cannot be after end date",
      });
      toast.error("Start date cannot be after end date");
    } else {
      queryClient.invalidateQueries(["isPaid", startDate, endDate]);
      clearErrors("startDate");
      setConfirmedStartDate(startDate);
      setConfirmedEndDate(endDate);
      toast.success("Dates confirmed!");
    }
  };

  if (isLoadingRecent || isLoadingStays || isRoomsLoading) return <Spinner />;

  return (
    <>
      <StyledDates>
        <div>
          <StyledSelect>
            Start Date:
            <Controller
              name="startDate"
              control={control}
              rules={{
                validate: (value) =>
                  new Date(value) <= new Date(endDate) ||
                  "Start date cannot be after end date",
              }}
              render={({ field }) => (
                <StyledInput
                  type="date"
                  {...field}
                  onChange={(e) => {
                    if (new Date(e.target.value) > new Date(endDate)) {
                      setError("startDate", {
                        type: "manual",
                        message: "Start date cannot be after end date",
                      });
                    } else {
                      clearErrors("startDate");
                    }
                    field.onChange(e);
                  }}
                />
              )}
            />
          </StyledSelect>
          <StyledSelect>
            End Date:
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <StyledInput
                  type="date"
                  {...field}
                  onChange={(e) => {
                    if (new Date(startDate) > new Date(e.target.value)) {
                      setError("startDate", {
                        type: "manual",
                        message: "Start date cannot be after end date",
                      });
                    } else {
                      clearErrors("startDate");
                    }
                    field.onChange(e);
                  }}
                />
              )}
            />
          </StyledSelect>
        </div>
        <Button onClick={handleConfirmDates}>Confirm Dates</Button>
      </StyledDates>

      <Disclaimer>
        Please note that the sales data in this summary is based on transactions
        recorded from 00:00:00 to 00:00:00 of the specified dates. Searches for
        dates must span from midnight to midnight to ensure accurate results.
      </Disclaimer>
      <StyledFullWidthElement>
        <TotalSales RoomSales={RoomSales} />
        <RaportTable data={RoomSales} />
      </StyledFullWidthElement>
    </>
  );
}

export default SalesLayout;
