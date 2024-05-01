import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { TeamInfo } from "@/models/teamInfo";
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

  const getTeamInfo = async (idTeam: string): Promise<TeamInfo | undefined> => {
    try {
      const response: AxiosResponse<TeamInfo, Error> = await axiosInstance.get(
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
    getTeamInfo,
  };
};
