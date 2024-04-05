import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const UseTasksReqs = () => {
  const axiosInstance = useAxiosPrivate();

  const getTasks = async () => {
    try {
      const response = await axiosInstance.get("/tarea");
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getTasks,
  };
};

export default UseTasksReqs;
