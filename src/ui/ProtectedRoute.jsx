/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../features/authentication/useRoles";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const { isLoading: isVerifyingRole } = useRoles();

  //3. If there is NOauthenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [navigate, isAuthenticated, isLoading]
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
