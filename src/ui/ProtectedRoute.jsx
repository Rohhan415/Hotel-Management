/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../features/authentication/useRoles";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const { isLoading: isVerifyingRole } = useRoles();

  //3. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
        queryClient.removeQueries({ queryKey: ["user_role"] });
      }
    },
    [navigate, isAuthenticated, isLoading, queryClient]
  );

  //2. While loading, show a spinner
  if (isLoading || isVerifyingRole) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4.If there IS a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
