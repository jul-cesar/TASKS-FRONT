import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { task } from "@/models/Task";
import { TeamInfo } from "@/models/teamInfo";
import { Team } from "@/models/teams";
import { AxiosResponse } from "axios";

export const useTeamsRequest = () => {
  const axiosInstance = useAxiosPrivate();

  const getUserTeams = async (
    idUser: string
  ): Promise<TeamInfo[] | undefined> => {
    try {
      const response: AxiosResponse<TeamInfo[], Error> =
        await axiosInstance.get(`/team/${idUser}`);
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

  const getTeamTasks = async (id: string): Promise<task[] | undefined> => {
    try {
      const response: AxiosResponse<task[]> = await axiosInstance.get(
        `/team/tasks/${id}`
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
  interface responseI {
    success: boolean;
    message: string;
  }
  const addMemberToTeam = async (
    idTeam: string,
    emailUser: string
  ): Promise<responseI> => {
    try {
      const response = await axiosInstance.put(
        `/team/addmember/${emailUser}/${idTeam}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    addMemberToTeam,
    getUserTeams,
    createTeam,
    getTeamInfo,
    getTeamTasks,
  };
};
