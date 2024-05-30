/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useRoles } from "../features/authentication/useRoles";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ManagerRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const {
    role: { role },
  } = useRoles();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (role.user_role !== "manager" && role.user_role !== "admin") {
        navigate("/login");
      }
    },
    [navigate, isAuthenticated, isLoading, role.user_role]
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (
    (isAuthenticated && role.user_role === "admin") ||
    role.user_role === "manager"
  ) {
    return children;
  }
}
export default ManagerRoute;
