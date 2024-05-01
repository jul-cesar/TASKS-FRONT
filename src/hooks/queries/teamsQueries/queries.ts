import { useTeamsRequest } from "@/api/teamsRequests/teams";
import { Auth } from "@/context/auth";
import { Team } from "@/models/teams";
import { user } from "@/models/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "sonner";

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

export const useGetTeamMembers = (id: string) => {
  const { getTeamMembers } = useTeamsRequest();
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async (): Promise<user[]> => {
      const data = await getTeamMembers(id);
      if (!data) {
        throw new Error("Error al traer los integrantes del team");
      }
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  const { createTeam } = useTeamsRequest();
  return useMutation<void, Error, Team>({
    mutationFn: async (newTeam) => {
      await createTeam(newTeam);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }),
        toast.success("Team creada con exito!");
    },
    onError: (error) => {
      toast.error(`Hubo un error al crear el team: ${error.message}`);
    },
    onMutate: () => {
      toast.info("Creando team...");
    },
  });
};
