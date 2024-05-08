import { useTeamsRequest } from "@/api/teamsRequests/teams";
import { Auth } from "@/context/auth";
import { task } from "@/models/Task";
import { TeamInfo } from "@/models/teamInfo";
import { Team } from "@/models/teams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "sonner";

const KEY = "teams";

export const useTeamTasks = (id: string) => {
  const { getTeamTasks } = useTeamsRequest();

  return useQuery<task[], AxiosError>({
    queryKey: ["tasks", id],
    queryFn: async (): Promise<task[]> => {
      const data = await getTeamTasks(id);
      if (!data) {
        throw new Error("Hubo un error al traer las tareas");
      }
      return data;
    },

    enabled: !!id,
  });
};

export const useUserTeams = () => {
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  const { getUserTeams } = useTeamsRequest();
  return useQuery<TeamInfo[], AxiosError>({
    queryKey: [KEY, id],
    queryFn: async (): Promise<TeamInfo[]> => {
      const data = await getUserTeams(id);
      if (!data) {
        throw new Error("Error al traer tus teams");
      }
      return data;
    },
    enabled: !!id,
  });
};

export const useGetTeamInfo = (id: string) => {
  const { getTeamInfo } = useTeamsRequest();
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async (): Promise<TeamInfo> => {
      const data = await getTeamInfo(id);
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
        toast.success("Team creado con exito!");
    },
    onError: (error) => {
      toast.error(`Hubo un error al crear el team: ${error.message}`);
    },
    onMutate: () => {
      toast.info("Creando team...");
    },
  });
};

interface addMemberInfo {
  emailUser: string;
  idTeam: string;
}
interface responseI {
  success: boolean;
  message: string;
}
export const useAddMemberToTeam = () => {
  const { addMemberToTeam } = useTeamsRequest();
  const queryClient = useQueryClient();

  return useMutation<responseI, Error, addMemberInfo, unknown>({
    mutationFn: async ({ idTeam, emailUser }): Promise<responseI> => {
      const data = await addMemberToTeam(idTeam, emailUser);
      return data;
    },
    onSuccess: (data) => {
      if (
        data.message === "El usuario que intentas agregar a este team no existe"
      ) {
        toast.error("Usuario no existente", { position: "top-center" });
      }
      if (data.message === "Usuario agregado") {
        queryClient.invalidateQueries({ queryKey: [KEY] }),
          toast.success(data.message);
      }
      if (data.message === "Este usuario ya se encuentra en el team") {
        toast.info("usario ya en el team");
      }
    },
  });
};

interface deleteMemberInfo {
  idUser: string;
  idTeam: string;
}

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const { deleteMember } = useTeamsRequest();
  return useMutation<Team, Error, deleteMemberInfo>({
    mutationFn: async (info) => {
      const data = await deleteMember(info.idUser, info.idTeam);
      if (!data) {
        throw new Error("Error al eliminar usuario");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }),
        toast.success("Usuario eliminado del team");
    },
    onError: () => {
      toast.error(`Hubo un error al eliminar el usuario`);
    },
    onMutate: () => {
      toast.info("Eliminando usuario..");
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  const { deleteTeam } = useTeamsRequest();
  return useMutation<responseI, Error, string>({
    mutationFn: async (idTeam) => {
      const data = await deleteTeam(idTeam);
      if (!data) {
        throw new Error("Error deleting team");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }),
        toast.success("Team eliminado");
    },

    onMutate: () => {
      toast.info("Eliminando team..");
    },
  });
};
