import { useTeamsRequest } from "@/api/teamsRequests/teams";
import { Auth } from "@/context/auth";
import { Team } from "@/models/teams";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const KEY = "teams";

export const useUserTeams = () => {
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  const { getUserTeams } = useTeamsRequest();
  return useQuery<Team[], AxiosError>({
    queryKey: [KEY, id],
    queryFn: async (): Promise<Team[]> => {
      const data = await getUserTeams(id);
      if (!data) {
        throw new Error("Error al traer tus teams");
      }
      return data;
    },
    enabled: !!id,
  });
};
