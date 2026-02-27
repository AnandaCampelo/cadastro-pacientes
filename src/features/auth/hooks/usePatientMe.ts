import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { getPatientMe } from "@/services/coreApi";

export function usePatientMe() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: ["patients", "me"],
    queryFn: getPatientMe,
    enabled: isAuthenticated,
    staleTime: 1000 * 60,
  });
}
