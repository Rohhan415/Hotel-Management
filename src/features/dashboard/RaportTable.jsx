/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import SortBy from "../../ui/SortBy";
import Spinner from "../../ui/Spinner";

const TableWrapper = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1.5rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;
const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
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

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh; /* Adjust to match the height of your table */
  min-width: 100%; /* Adjust to match the width of your table */
  grid-row: span 4;
`;

function RaportTable({ data }) {
  const displayData = data?.map((data) => (
    <Tr key={data.id}>
      <Td>{data.name}</Td>
      <Td>{data.totalSales}$</Td>
      <Td>{data.extrasSales}$</Td>
      <Td>{data.maxPrice}$</Td>
    </Tr>
  ));

  return (
    <TableWrapper>
      <HeadingWrapper>
        <Heading as="h2">Room sales summary</Heading>

        <SortBy
          options={[
            {
              value: "totalSales-desc",
              label: "Sort table by total sales (high first)",
            },
            {
              value: "totalSales-asc",
              label: "Sort table by total sales (low first)",
            },
            {
              value: "extrasSales-desc",
              label: "Sort table by extras sales (high first)",
            },
            {
              value: "extrasSales-asc",
              label: "Sort table by extras sales (low first)",
            },
            {
              value: "maxPrice-desc",
              label: "Sort table by max price (high first)",
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

        {data == null ? (
          <tr>
            <td colSpan="4">
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            </td>
          </tr>
        ) : (
          <tbody>{displayData}</tbody>
        )}
      </Table>
    </TableWrapper>
  );
}

export default RaportTable;
