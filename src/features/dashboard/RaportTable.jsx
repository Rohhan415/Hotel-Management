import styled from "styled-components";
import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import SortBy from "../../ui/SortBy";
import { useRoomsSales } from "./useRoomsSales";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

const TableWrapper = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1.5rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;
const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  margin-top: 0.5rem;
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 2rem;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #ddd;
  }
`;

function RaportTable() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const initialEndDate = new Date().toISOString();
  const initialStartDate = subDays(new Date(), numDays).toISOString();

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const { data, isLoading: isLoadingRoomsSales } = useRoomsSales(
    startDate,
    endDate
  );
  if (isLoadingRoomsSales) return <Spinner />;

  return (
    <TableWrapper>
      <HeadingWrapper>
        <Heading as="h2">Room sales summary</Heading>
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <SortBy
          options={[
            {
              value: "totalSales-desc",
              label: "Sort table by total sales (hight first)",
            },
            {
              value: "totalSales-asc",
              label: "Sort table by total sales (low first)",
            },
            {
              value: "extrasSales-desc",
              label: "Sort table by extras sales (hight first)",
            },
            {
              value: "extrasSales-asc",
              label: "Sort table by extras sales (low first)",
            },
            {
              value: "maxPrice-desc",
              label: "Sort table by max price (hight first)",
            },
            {
              value: "maxPrice-asc",
              label: "Sort table by max price (low first)",
            },
          ]}
        />
      </HeadingWrapper>

      <Table>
        <thead>
          <tr>
            <Th>Room Name</Th>
            <Th>Total Sales</Th>
            <Th>Extras Sales</Th>
            <Th>Max Price</Th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data) => (
            <Tr key={data.id}>
              <Td>{data.name}</Td>
              <Td>{data.totalSales}$</Td>
              <Td>{data.extrasSales}$</Td>
              <Td>{data.maxPrice}$</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

RaportTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      totalSales: PropTypes.number.isRequired,
      extrasSales: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RaportTable;
