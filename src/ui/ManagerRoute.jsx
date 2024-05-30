/* eslint-disable react/prop-types */

import { useContext, useEffect } from "react";
import { useRoles } from "../features/authentication/useRoles";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { LoginContext } from "../features/authentication/LoginContext";
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
  const { logOut } = useContext(LoginContext);
  const {
    role: { role },
  } = useRoles();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (role.user_role !== "manager" && role.user_role !== "admin") {
        navigate("/login");
        logOut();
      }
    },
    [navigate, isAuthenticated, isLoading, role.user_role, logOut]
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
