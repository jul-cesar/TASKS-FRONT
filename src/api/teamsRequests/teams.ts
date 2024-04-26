import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Team } from "@/models/teams";
import { AxiosResponse } from "axios";

export const useTeamsRequest = () => {
  const axiosInstance = useAxiosPrivate();

  const getUserTeams = async (idUser: string): Promise<Team[] | undefined> => {
    try {
      const response: AxiosResponse<Team[], Error> = await axiosInstance.get(
        `/team/${idUser}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getUserTeams,
  };
};
