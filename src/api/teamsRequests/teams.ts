import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Team } from "@/models/teams";
import { user } from "@/models/User";
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

  const createTeam = async (data: Team): Promise<Team | undefined> => {
    try {
      const response: AxiosResponse<Team, Error> = await axiosInstance.post(
        "/team",
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTeamMembers = async (
    idTeam: string
  ): Promise<user[] | undefined> => {
    try {
      const response: AxiosResponse<user[], Error> = await axiosInstance.get(
        `/team?id=${idTeam}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getUserTeams,
    createTeam,
    getTeamMembers,
  };
};
