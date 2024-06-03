/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useRoles } from "../features/authentication/useRoles";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AdminRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const {
    role: { role },
  } = useRoles();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (role.user_role !== "admin") {
        navigate("/login");
        queryClient.removeQueries({ queryKey: ["user_role"] });
      }
    },
    [navigate, isAuthenticated, isLoading, role.user_role, queryClient]
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated && role.user_role === "admin") {
    return children;
  }
}
export default AdminRoute;
