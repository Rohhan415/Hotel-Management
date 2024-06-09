import { useState } from "react";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SalesLayout from "../features/dashboard/SalesLayout";

import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  width: auto;
  margin-left: auto;
  margin-right: 1rem;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("Dashboard");

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <StyledFilter>
          <FilterButton
            active={currentTab === "Dashboard"}
            onClick={() => setCurrentTab("Dashboard")}
          >
            Menu
          </FilterButton>
          <FilterButton
            active={currentTab === "Sales"}
            onClick={() => setCurrentTab("Sales")}
          >
            Sales
          </FilterButton>
        </StyledFilter>
        <DashboardFilter />
      </Row>
      {currentTab === "Dashboard" ? <DashboardLayout /> : <SalesLayout />}
    </>
  );
}

export default Dashboard;
