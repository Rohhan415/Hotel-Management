import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../services/apiRoles";

export function useRoles() {
  const {
    isLoading,
    isFetching,
    data: role,
  } = useQuery({
    queryKey: ["user_role"],
    queryFn: getRoles,
  });

  return { isLoading, role, isFetching };
}
